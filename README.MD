# Gin Gorm todo 示例

- 主要学习 Gin, Gorm


## 安装和本地运行

```bash
go mod tidy

# go install github.com/silenceper/gowatch@latest
gowatch
```

## 数据库启动和配置

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



## API list

* `GET` : Get all todos
* `POST` : Create a todo
* `GET` : Get a todo
* `PUT` : Update a todo
* `DELETE` : Delete a todo

## JSON Post Params
```
{
	"name": "明日任务",
	"description": "洗衣、做饭、写代码"
}
```
