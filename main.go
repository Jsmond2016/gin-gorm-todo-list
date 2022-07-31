package main

import (
	"gin-gorm-todo-list/conf"

	"github.com/gin-gonic/gin"
)

func main() {
	conf.Init()
	r := gin.Default()
	r.Run(conf.HttpPort)
}
