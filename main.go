package main

import (
	"gin-gorm-todo-list/conf"
	"gin-gorm-todo-list/routes"
)

func main() {
	conf.Init()
	r := routes.NewRouter()
	r.Run(conf.HttpPort)
}
