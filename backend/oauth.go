package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

var (
	googleOAuthConfig *oauth2.Config
	githubOAuthConfig *oauth2.Config
)

func initOAuth() {
	googleOAuthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("OAUTH_REDIRECT_URL") + "/google",
		Scopes:       []string{"openid", "profile", "email"},
		Endpoint:     google.Endpoint,
	}

	githubOAuthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("OAUTH_REDIRECT_URL") + "/github",
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}

	log.Println("OAuth configurations initialized")
}

// Google OAuth handlers
func googleLogin(c *gin.Context) {
	session, _ := Store.Get(c.Request, "session-name")
	state := generateRandomState()
	session.Values["oauth_state"] = state
	err := session.Save(c.Request, c.Writer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}

	url := googleOAuthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
	c.JSON(http.StatusOK, gin.H{
		"auth_url": url,
	})
}

func googleCallback(c *gin.Context) {
	// Verify state parameter
	session, _ := Store.Get(c.Request, "session-name")
	storedState, ok := session.Values["oauth_state"].(string)
	if !ok || storedState != c.Query("state") {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "Invalid state parameter"})
		return
	}

	// Clear the state cookie
	// Clear state from session
	delete(session.Values, "oauth_state")
	session.Save(c.Request, c.Writer)

	code := c.Query("code")
	if code == "" {
		log.Printf("❌ No authorization code received")
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "No authorization code received"})
		return
	}

	// Exchange code for token
	token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("❌ Failed to exchange code for token: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to exchange authorization code"})
		return
	}

	// Get user info from Google
	userInfo, err := getGoogleUserInfo(token.AccessToken)
	if err != nil {
		log.Printf("❌ Failed to get user info: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to get user information"})
		return
	}

	// Create or get user
	user, err := createOrGetOAuthUser(userInfo, "google")
	if err != nil {
		log.Printf("❌ Failed to create/get user: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to process user"})
		return
	}

	// Generate JWT token
	jwtToken, err := generateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("❌ Failed to generate JWT: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to generate token"})
		return
	}

	log.Printf("🎉 Google OAuth successful for user: %s", user.Email)
	c.JSON(http.StatusOK, AuthResponse{
		User:  *user,
		Token: jwtToken,
	})
}

// GitHub OAuth handlers
func githubLogin(c *gin.Context) {
	session, _ := Store.Get(c.Request, "session-name")
	state := generateRandomState()
	session.Values["oauth_state"] = state
	err := session.Save(c.Request, c.Writer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}

	url := githubOAuthConfig.AuthCodeURL(state)
	c.JSON(http.StatusOK, gin.H{
		"auth_url": url,
	})
}

func githubCallback(c *gin.Context) {
	// Verify state parameter
	session, _ := Store.Get(c.Request, "session-name")
	storedState, ok := session.Values["oauth_state"].(string)
	if !ok || storedState != c.Query("state") {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "Invalid state parameter"})
		return
	}

	// Clear the state cookie
	// Clear state from session
	delete(session.Values, "oauth_state")
	session.Save(c.Request, c.Writer)

	code := c.Query("code")
	if code == "" {
		log.Printf("❌ No authorization code received")
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "No authorization code received"})
		return
	}

	// Exchange code for token
	token, err := githubOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("❌ Failed to exchange code for token: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to exchange authorization code"})
		return
	}

	// Get user info from GitHub
	userInfo, err := getGitHubUserInfo(token.AccessToken)
	if err != nil {
		log.Printf("❌ Failed to get user info: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to get user information"})
		return
	}

	// Create or get user
	user, err := createOrGetOAuthUser(userInfo, "github")
	if err != nil {
		log.Printf("❌ Failed to create/get user: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to process user"})
		return
	}

	// Generate JWT token
	jwtToken, err := generateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("❌ Failed to generate JWT: %v", err)
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to generate token"})
		return
	}

	log.Printf("🎉 GitHub OAuth successful for user: %s", user.Email)
	c.JSON(http.StatusOK, AuthResponse{
		User:  *user,
		Token: jwtToken,
	})
}

// Helper functions
func getGoogleUserInfo(accessToken string) (*OAuthUserInfo, error) {
	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var googleUser struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
		return nil, err
	}

	return &OAuthUserInfo{
		ID:        googleUser.ID,
		Email:     googleUser.Email,
		Name:      googleUser.Name,
		AvatarURL: googleUser.Picture,
	}, nil
}

func getGitHubUserInfo(accessToken string) (*OAuthUserInfo, error) {
	// Get user profile
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "token "+accessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var githubUser struct {
		ID        int    `json:"id"`
		Login     string `json:"login"`
		Name      string `json:"name"`
		Email     string `json:"email"`
		AvatarURL string `json:"avatar_url"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&githubUser); err != nil {
		return nil, err
	}

	// If email is not public, get it from emails endpoint
	if githubUser.Email == "" {
		email, err := getGitHubUserEmail(accessToken)
		if err == nil {
			githubUser.Email = email
		}
	}

	return &OAuthUserInfo{
		ID:        fmt.Sprintf("%d", githubUser.ID),
		Email:     githubUser.Email,
		Name:      githubUser.Name,
		AvatarURL: githubUser.AvatarURL,
	}, nil
}

func getGitHubUserEmail(accessToken string) (string, error) {
	req, err := http.NewRequest("GET", "https://api.github.com/user/emails", nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "token "+accessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var emails []struct {
		Email   string `json:"email"`
		Primary bool   `json:"primary"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&emails); err != nil {
		return "", err
	}

	for _, email := range emails {
		if email.Primary {
			return email.Email, nil
		}
	}

	if len(emails) > 0 {
		return emails[0].Email, nil
	}

	return "", fmt.Errorf("no email found")
}

func createOrGetOAuthUser(userInfo *OAuthUserInfo, provider string) (*User, error) {
	// Check if user exists by OAuth provider and ID
	var user User
	err := DB.QueryRow(`
		SELECT id, email, oauth_provider, oauth_id, name, avatar_url, created_at, updated_at 
		FROM users 
		WHERE oauth_provider = $1 AND oauth_id = $2
	`, provider, userInfo.ID).Scan(
		&user.ID, &user.Email, &user.OAuthProvider, &user.OAuthID, 
		&user.Name, &user.AvatarURL, &user.CreatedAt, &user.UpdatedAt,
	)

	if err == nil {
		// User exists, update their info
		_, err = DB.Exec(`
			UPDATE users 
			SET name = $1, avatar_url = $2, updated_at = $3 
			WHERE id = $4
		`, userInfo.Name, userInfo.AvatarURL, time.Now(), user.ID)
		
		if err != nil {
			log.Printf("❌ Failed to update user: %v", err)
		}
		
		return &user, nil
	}

	if err != sql.ErrNoRows {
		return nil, err
	}

	// Check if user exists by email (for linking accounts)
	err = DB.QueryRow(`
		SELECT id, email, oauth_provider, oauth_id, name, avatar_url, created_at, updated_at 
		FROM users 
		WHERE email = $1
	`, userInfo.Email).Scan(
		&user.ID, &user.Email, &user.OAuthProvider, &user.OAuthID, 
		&user.Name, &user.AvatarURL, &user.CreatedAt, &user.UpdatedAt,
	)

	if err == nil {
		// User exists with same email, update to link OAuth account
		_, err = DB.Exec(`
			UPDATE users 
			SET oauth_provider = $1, oauth_id = $2, name = $3, avatar_url = $4, updated_at = $5 
			WHERE id = $6
		`, provider, userInfo.ID, userInfo.Name, userInfo.AvatarURL, time.Now(), user.ID)
		
		if err != nil {
			return nil, err
		}
		
		user.OAuthProvider = provider
		user.OAuthID = userInfo.ID
		user.Name = userInfo.Name
		user.AvatarURL = userInfo.AvatarURL
		
		return &user, nil
	}

	if err != sql.ErrNoRows {
		return nil, err
	}

	// Create new user
	err = DB.QueryRow(`
		INSERT INTO users (email, oauth_provider, oauth_id, name, avatar_url, created_at, updated_at) 
		VALUES ($1, $2, $3, $4, $5, $6, $7) 
		RETURNING id, created_at, updated_at
	`, userInfo.Email, provider, userInfo.ID, userInfo.Name, userInfo.AvatarURL, time.Now(), time.Now()).Scan(
		&user.ID, &user.CreatedAt, &user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	user.Email = userInfo.Email
	user.OAuthProvider = provider
	user.OAuthID = userInfo.ID
	user.Name = userInfo.Name
	user.AvatarURL = userInfo.AvatarURL

	return &user, nil
}

func generateRandomState() string {
	// Simple state generation - in production, use crypto/rand
	return fmt.Sprintf("%d", time.Now().UnixNano())
}