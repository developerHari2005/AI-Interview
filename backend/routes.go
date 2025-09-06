package main

import "github.com/gin-gonic/gin"

func setupRoutes(r *gin.Engine) {
	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Authentication routes
	auth := r.Group("/auth")
	{
		auth.POST("/signup", signup)
		auth.POST("/login", login)
		
		// OAuth routes
		auth.GET("/google", googleLogin)
		auth.GET("/github", githubLogin)
		auth.GET("/callback/google", googleCallback)
		auth.GET("/callback/github", githubCallback)
	}

	// Protected routes (would require JWT middleware)
	// r.Use(authMiddleware)
	// r.GET("/profile", getProfile)
}