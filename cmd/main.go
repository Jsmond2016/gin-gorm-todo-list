package main

import (
	conf "gin-gorm-todo-list/config"
	"gin-gorm-todo-list/pkg/util"
	"gin-gorm-todo-list/repository/cache"
	"gin-gorm-todo-list/repository/db/dao"
	"gin-gorm-todo-list/routes"
)

// @title ToDoList API
// @version 0.0.1
// @description This is a sample Server pets
// @name FanOne
// @BasePath /api/v1
func main() { // http://localhost:3000/swagger/index.html
	loading()
	// 转载路由 swag init -g common.go
	r := routes.NewRouter()
	_ = r.Run(conf.HttpPort)
}

func loading() {
	// 从配置文件读入配置
	conf.Init()
	util.InitLog()
	dao.MySQLInit()
	cache.Redis()
}
