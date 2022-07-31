package middleware

import (
	util "gin-gorm-todo-list/pkg/utils"
	"time"

	"github.com/gin-gonic/gin"
)

//JWT token验证中间件
func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		var code int
		var data interface{}
		code = 200
		token := c.GetHeader("Authorization")
		if token == "" {
			code = 404
		} else {
			claims, err := util.ParseToken(token)
			if err != nil {
				code = 403 // 无权限
			} else if time.Now().Unix() > claims.ExpiresAt {
				code = 401 // 权限过期
			}
		}
		if code != 200 {
			c.JSON(400, gin.H{
				"status": code,
				"msg":    "token 解析错误",
				"data":   data,
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
