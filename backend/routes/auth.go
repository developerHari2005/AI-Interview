package routes

import (
	"github.com/gin-gonic/gin"
	"interview-ai/backend/controllers"
)

func AuthRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.POST("/signup", controllers.Signup)
		api.POST("/login", controllers.Login)
        api.GET("/ping", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "pong",
            })
        })
	}
}
