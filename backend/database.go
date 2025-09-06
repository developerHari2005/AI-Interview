package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func initDB() {
	var err error

	// Get database URL from environment
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}

	DB, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Test the connection
	if err = DB.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	fmt.Println("Database connected successfully")

	// Create users table if it doesn't exist
	createTables()
}

func createTables() {
	// First, let's check what columns exist in the users table
	rows, err := DB.Query(`
		SELECT column_name, data_type
		FROM information_schema.columns
		WHERE table_name = 'users'
		ORDER BY ordinal_position;
	`)
	if err != nil {
		log.Printf("Error checking existing table structure: %v", err)
	} else {
		fmt.Println("=== EXISTING USERS TABLE STRUCTURE ===")
		for rows.Next() {
			var columnName, dataType string
			if err := rows.Scan(&columnName, &dataType); err != nil {
				log.Printf("Error scanning column info: %v", err)
				continue
			}
			fmt.Printf("Column: %s, Type: %s\n", columnName, dataType)
		}
		rows.Close()
		fmt.Println("=== END TABLE STRUCTURE ===")
	}

	userTable := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		email VARCHAR(255) UNIQUE NOT NULL,
		password_hash VARCHAR(255) NULL,
		oauth_provider VARCHAR(50),
		oauth_id VARCHAR(255),
		name VARCHAR(255),
		avatar_url VARCHAR(500),
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		UNIQUE(oauth_provider, oauth_id)
	);`

	_, err = DB.Exec(userTable)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
	}

	// Check the table structure again after creation attempt
	rows, err = DB.Query(`
		SELECT column_name, data_type
		FROM information_schema.columns
		WHERE table_name = 'users'
		ORDER BY ordinal_position;
	`)
	if err != nil {
		log.Printf("Error checking table structure after creation: %v", err)
	} else {
		fmt.Println("=== USERS TABLE STRUCTURE AFTER CREATION ===")
		for rows.Next() {
			var columnName, dataType string
			if err := rows.Scan(&columnName, &dataType); err != nil {
				log.Printf("Error scanning column info: %v", err)
				continue
			}
			fmt.Printf("Column: %s, Type: %s\n", columnName, dataType)
		}
		rows.Close()
		fmt.Println("=== END TABLE STRUCTURE ===")
	}

	fmt.Println("Users table created/verified")

	// Add OAuth columns if they don't exist
	addOAuthColumns()
}

func addOAuthColumns() {
	// Check if oauth_provider column exists
	var exists bool
	err := DB.QueryRow(`
		SELECT EXISTS (
			SELECT 1 FROM information_schema.columns
			WHERE table_name = 'users' AND column_name = 'oauth_provider'
		)
	`).Scan(&exists)
	
	if err != nil {
		log.Printf("Error checking oauth_provider column: %v", err)
		return
	}

	if !exists {
		// Add OAuth columns
		alterQueries := []string{
			`ALTER TABLE users ADD COLUMN oauth_provider VARCHAR(50)`,
			`ALTER TABLE users ADD COLUMN oauth_id VARCHAR(255)`,
			`ALTER TABLE users ADD COLUMN name VARCHAR(255)`,
			`ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500)`,
			`ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL`,
			`CREATE UNIQUE INDEX IF NOT EXISTS idx_users_oauth ON users(oauth_provider, oauth_id) WHERE oauth_provider IS NOT NULL`,
		}

		for _, query := range alterQueries {
			_, err := DB.Exec(query)
			if err != nil {
				log.Printf("Error executing query '%s': %v", query, err)
			} else {
				log.Printf("✅ Successfully executed: %s", query)
			}
		}
		
		fmt.Println("OAuth columns added to users table")
	} else {
		fmt.Println("OAuth columns already exist in users table")
	}
}