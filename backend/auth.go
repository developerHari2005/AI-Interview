package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret []byte

func init() {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found in auth package")
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Fatal("JWT_SECRET environment variable is not set")
	}
	jwtSecret = []byte(secret)
}

func signup(c *gin.Context) {
	log.Printf("=== SIGNUP ENDPOINT CALLED ===")
	
	var req SignupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("❌ Signup bind error: %v", err)
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: err.Error()})
		return
	}

	log.Printf("✅ Request parsed successfully - Email: %s, Password length: %d", req.Email, len(req.Password))

	// Check if DB is nil
	if DB == nil {
		log.Printf("❌ Database connection is nil!")
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Database connection error"})
		return
	}

	log.Printf("✅ Database connection exists")

	// Check if user already exists
	var existingID int
	err := DB.QueryRow("SELECT id FROM users WHERE email = $1", req.Email).Scan(&existingID)
	if err == nil {
		log.Printf("❌ User already exists: %s", req.Email)
		c.JSON(http.StatusConflict, ErrorResponse{Error: "User already exists"})
		return
	} else if err != sql.ErrNoRows {
		log.Printf("❌ Database error checking user: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Database error"})
		return
	}

	log.Printf("✅ User doesn't exist, proceeding with creation")

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("❌ Password hash error: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to hash password"})
		return
	}

	log.Printf("✅ Password hashed successfully")

	// Create user
	var userID int
	log.Printf("🔄 Attempting to insert user into database...")
	log.Printf("🔄 Email: %s, Password hash length: %d", req.Email, len(string(hashedPassword)))
	
	// Test database connection before insertion
	if err := DB.Ping(); err != nil {
		log.Printf("❌ Database ping failed before insertion: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Database connection lost"})
		return
	}
	log.Printf("✅ Database ping successful before insertion")
	
	err = DB.QueryRow(
		"INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
		req.Email, string(hashedPassword),
	).Scan(&userID)

	if err != nil {
		log.Printf("❌ User creation error: %v", err)
		log.Printf("❌ Error type: %T", err)
		log.Printf("❌ SQL Query: INSERT INTO users (email, password) VALUES (%s, [HASH]) RETURNING id", req.Email)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to create user"})
		return
	}

	log.Printf("✅ User created successfully: ID=%d, Email=%s", userID, req.Email)

	// Check JWT secret
	if len(jwtSecret) == 0 {
		log.Printf("❌ JWT secret is empty!")
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "JWT configuration error"})
		return
	}

	log.Printf("✅ JWT secret is configured")

	// Generate JWT token
	token, err := generateToken(userID, req.Email)
	if err != nil {
		log.Printf("❌ Token generation error: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to generate token"})
		return
	}

	log.Printf("✅ JWT token generated successfully")

	now := time.Now()
	user := User{
		ID:        userID,
		Email:     req.Email,
		CreatedAt: &now,
		UpdatedAt: &now,
	}

	log.Printf("🎉 Signup successful for user: %s", req.Email)
	c.JSON(http.StatusCreated, AuthResponse{
		User:  user,
		Token: token,
	})
}

func login(c *gin.Context) {
	log.Printf("=== LOGIN ENDPOINT CALLED ===")
	
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("❌ Login bind error: %v", err)
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: err.Error()})
		return
	}

	log.Printf("✅ Login request parsed - Email: %s, Password length: %d", req.Email, len(req.Password))

	// Check if DB is nil
	if DB == nil {
		log.Printf("❌ Database connection is nil!")
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Database connection error"})
		return
	}

	// Get user from database
	var user User
	var passwordHash string
	log.Printf("🔄 Querying database for user: %s", req.Email)
	err := DB.QueryRow(
		"SELECT id, email, password_hash, created_at, updated_at, name, avatar_url, oauth_provider, oauth_id FROM users WHERE email = $1",
		req.Email,
	).Scan(&user.ID, &user.Email, &passwordHash, &user.CreatedAt, &user.UpdatedAt, &user.Name, &user.AvatarURL, &user.OAuthProvider, &user.OAuthID)

	if err == sql.ErrNoRows {
		log.Printf("❌ User not found: %s", req.Email)
		c.JSON(http.StatusUnauthorized, ErrorResponse{Error: "Invalid credentials"})
		return
	} else if err != nil {
		log.Printf("❌ Database error getting user: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Database error"})
		return
	}

	log.Printf("✅ User found in database: ID=%d", user.ID)

	// Check password
	log.Printf("🔄 Verifying password...")
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password))
	if err != nil {
		log.Printf("❌ Invalid password for user: %s", req.Email)
		c.JSON(http.StatusUnauthorized, ErrorResponse{Error: "Invalid credentials"})
		return
	}

	log.Printf("✅ Password verified for user: %s", req.Email)

	// Generate JWT token
	log.Printf("🔄 Generating JWT token...")
	token, err := generateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("❌ Token generation error: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to generate token"})
		return
	}

	log.Printf("🎉 Login successful for user: %s", req.Email)
	c.JSON(http.StatusOK, AuthResponse{
		User:  user,
		Token: token,
	})
}

func generateToken(userID int, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}