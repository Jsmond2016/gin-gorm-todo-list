package model

import "gorm.io/gorm"

//User 用户模型
type User struct {
	gorm.Model
	UserName       string `gorm:"unique"`
	PasswordDigest string
}

const (
	PassWordCost = 12 //密码加密难度
)
