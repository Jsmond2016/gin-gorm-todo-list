package api

import (
	"encoding/json"
	"fmt"

	"gopkg.in/go-playground/validator.v8"

	conf "gin-gorm-todo-list/config"
	"gin-gorm-todo-list/pkg/ctl"
	"gin-gorm-todo-list/pkg/e"
)

// ErrorResponse 返回错误信息
func ErrorResponse(err error) *ctl.TrackedErrorResponse {
	if ve, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range ve {
			field := conf.T(fmt.Sprintf("Field.%s", fieldError.Field))
			tag := conf.T(fmt.Sprintf("Tag.Valid.%s", fieldError.Tag))
			return ctl.RespError(err, fmt.Sprintf("%s%s", field, tag))
		}
	}

	if _, ok := err.(*json.UnmarshalTypeError); ok {
		return ctl.RespError(err, "JSON类型不匹配")
	}

	return ctl.RespError(err, "参数错误", e.InvalidParams)
}
