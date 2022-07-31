# Gin Gorm todo 示例
> 本项目参考 https://github.com/CocaineCong/TodoList
- 主要学习 Gin, Gorm



## 启动前：数据库启动和配置

- [Docker 安装 MySql](https://www.runoob.com/docker/docker-install-mysql.html)

```bash
docker pull mysql:latest

# 账号密码可自行修改
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```


- 修改数据库信息
> 进入 `config/Database.go` 文件修改

```go
func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     "127.0.0.1",
		Port:     3306,
		DBName:   "gin_todos", // 数据库名字
		User:     "root", // 数据库账号
		Password: "123456", // 数据库密码
	}
	return &dbConfig
}
```
- 使用 [hedisql](https://www.heidisql.com/) 数据库可视化工具打开
- 创建数据库

```
CREATE DATABASE gin_todos;
use gin_todos;
```

## 安装和本地运行

```bash
go mod tidy

# go install github.com/silenceper/gowatch@latest
gowatch
```


## API list

* `GET` : Get all todos
* `POST` : Create a todo
* `GET` : Get a todo
* `PUT` : Update a todo
* `DELETE` : Delete a todo

## 本地测试

见本地文件 `test.http` 文件，结合 `VS Code` 插件 `REST Client` 食用
