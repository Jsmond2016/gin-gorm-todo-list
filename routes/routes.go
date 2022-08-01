package routes

import (
	"gin-gorm-todo-list/api"

	// "github.com/gin-contrib/sessions"
	// "github.com/gin-contrib/sessions/cookie"
	"gin-gorm-todo-list/middleware"

	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	r := gin.Default()
	// store := cookie.NewStore([]byte("something-very-secret"))
	// r.Use(sessions.Sessions("mysession", store))
	v1 := r.Group("api/v1")
	{
		// 用户操作
		v1.POST("user/register", api.UserRegister)
		v1.POST("user/login", api.UserLogin)
		authed := v1.Group("/")
		authed.Use(middleware.JWT())
		{
			authed.GET("tasks", api.ListTasks)
			authed.POST("task", api.CreateTask)
			authed.GET("task/:id", api.ShowTask)
			authed.PUT("task/:id", api.UpdateTask)
		}
	}
	return r
}
