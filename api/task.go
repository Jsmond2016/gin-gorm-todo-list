package api

import (
	util "gin-gorm-todo-list/pkg/utils"
	"gin-gorm-todo-list/service"

	"github.com/gin-gonic/gin"
)

func CreateTask(c *gin.Context) {
	createService := service.CreateTaskService{}
	chaim, _ := util.ParseToken(c.GetHeader("Authorization"))
	if err := c.ShouldBind(&createService); err == nil {
		res := createService.Create(chaim.Id)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
		// util.LogrusObj.Info(err)
	}
}

func ShowTask(c *gin.Context) {
	showTaskService := service.ShowTaskService{}
	res := showTaskService.Show(c.Param("id"))
	c.JSON(200, res)
}
