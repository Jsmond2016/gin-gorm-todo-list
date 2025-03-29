package middleware

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"

	"gin-gorm-todo-list/pkg/ctl"
	"gin-gorm-todo-list/pkg/e"
	"gin-gorm-todo-list/pkg/util"
)

// JWT token验证中间件
func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		var code int
		code = e.SUCCESS
		tokenHeader := c.GetHeader("Authorization")

		if tokenHeader == "" {
			code = e.ErrorAuthCheckTokenFail
			c.JSON(e.InvalidParams, gin.H{
				"status": code,
				"msg":    e.GetMsg(code),
				"data":   "缺少Token",
			})
			c.Abort()
			return
		}
		// token = Bearer token
		token := tokenHeader[len("Bearer "):]
		// log token
		fmt.Println("token ==>>>>", token)
		if token == "" {
			code = e.ErrorAuthCheckTokenFail
			c.JSON(e.InvalidParams, gin.H{
				"status": code,
				"msg":    e.GetMsg(code),
				"data":   "缺少Token",
			})
			c.Abort()
			return
		}

		claims, err := util.ParseToken(token)
		if err != nil {
			code = e.ErrorAuthCheckTokenFail
		} else if time.Now().Unix() > claims.ExpiresAt {
			code = e.ErrorAuthCheckTokenTimeout
		}

		if code != e.SUCCESS {
			c.JSON(e.InvalidParams, gin.H{
				"status": code,
				"msg":    e.GetMsg(code),
				"data":   "可能是身份过期了，请重新登录",
			})
			c.Abort()
			return
		}

		c.Request = c.Request.WithContext(ctl.NewContext(c.Request.Context(), &ctl.UserInfo{Id: claims.Id}))
		c.Next()
	}
}
