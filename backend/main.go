package main

import (
	"github.com/gin-gonic/gin"
	"interview-ai/backend/routes"
)

func main() {
	r := gin.Default()

	// Setup routes
	routes.AuthRoutes(r)

	r.Run() // listens and serve on 0.0.0.0:8080
}
