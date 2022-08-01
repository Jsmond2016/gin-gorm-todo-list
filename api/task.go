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

func ListTasks(c *gin.Context) {
	listService := service.ListTasksService{}
	chaim, _ := util.ParseToken(c.GetHeader("Authorization"))
	if err := c.ShouldBind(&listService); err == nil {
		res := listService.List(chaim.Id)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func UpdateTask(c *gin.Context) {
	updateTaskService := service.UpdateTaskService{}
	if err := c.ShouldBind(&updateTaskService); err == nil {
		res := updateTaskService.Update(c.Param("id"))
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func SearchTasks(c *gin.Context) {
	searchTaskService := service.SearchTaskService{}
	chaim, _ := util.ParseToken(c.GetHeader("Authorization"))
	if err := c.ShouldBind(&searchTaskService); err == nil {
		res := searchTaskService.Search(chaim.Id)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}
