package models

import "gorm.io/gorm"

// User represents a user in the database
type User struct {
	gorm.Model
	Email    string `gorm:"unique;not null" json:"email" binding:"required,email"`
	Password string `gorm:"not null" json:"-"` // Omit password from JSON responses
}
