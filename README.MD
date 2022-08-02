# Gin Gorm todo 示例
> 本项目参考 https://github.com/CocaineCong/TodoList
- 主要学习 Gin, Gorm, MySql, Redis 操作



## 启动前配置

### 配置文件

```ini
# debug开发模式,release生产模式
[service]
AppMode = debug
HttpPort = :3000
# 运行端口号 3000端口

[redis]
RedisDb = redis
RedisAddr = 127.0.0.1:6379
# redis ip地址和端口号
RedisPw = 
# redis 密码
RedisDbName = 2
# redis 名字

[mysql]
Db = mysql
# mysql ip地址
DbHost = 127.0.0.1
# mysql 端口号
DbPort = 3306
# mysql 用户名
DbUser = root
# mysql 密码
DbPassWord = 123456
# mysql 名字
DbName = gin_todos
```
### MySql 安装和配置
- [Docker 安装 MySql](https://www.runoob.com/docker/docker-install-mysql.html)

```bash
docker pull mysql:latest

# 账号密码可自行修改
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

- 使用 [hedisql](https://www.heidisql.com/) 数据库可视化工具打开
- 创建数据库

```
CREATE DATABASE gin_todos;
use gin_todos;
```

### Redis 安装和配置

- [Docker 安装 Redis](https://www.runoob.com/docker/docker-install-redis.html)

```bash
docker pull redis:latest

docker run -itd --name redis-test -p 6379:6379 redis
```

## 安装和本地运行

```bash
go mod tidy

# go install github.com/silenceper/gowatch@latest
gowatch
```


## API list

接口地址可以在项目启动后查看 swagger 地址：http://localhost:3000/swagger/index.html

```
GET    /api/v1/ping           
POST   /api/v1/user/register  
POST   /api/v1/user/login     
GET    /api/v1/tasks          
POST   /api/v1/task           
GET    /api/v1/task/:id       
DELETE /api/v1/task/:id       
PUT    /api/v1/task/:id       
POST   /api/v1/search 
```

## 本地测试

见本地文件 `test.http` 文件，结合 `VS Code` 插件 `REST Client` 食用


        