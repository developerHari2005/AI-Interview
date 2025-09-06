package main

import (
	"encoding/gob"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
)

var Store *sessions.CookieStore

func init() {
	// Register the types that will be stored in the session
	gob.Register(map[string]interface{}{})

	// Get secret key from environment or use a default
	secretKey := os.Getenv("SESSION_SECRET_KEY")
	if secretKey == "" {
		secretKey = "a-very-secret-and-secure-key-for-dev-only" // Fallback for development
	}

	Store = sessions.NewCookieStore([]byte(secretKey))

	Store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7, // 7 days
		HttpOnly: true,
		Secure:   os.Getenv("GIN_MODE") == "release", // Use secure cookies in production
		SameSite: http.SameSiteLaxMode,
	}
}