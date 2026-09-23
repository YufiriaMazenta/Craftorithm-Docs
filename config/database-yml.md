---
title: database.yml
---

Craftorithm 支持数据库, 相关的配置在 `database.yml` 中进行设置

默认支持Sqlite、Mysql和PostgreSQL类型数据库, 其他插件也可以为Craftorithm添加额外的数据库类型支持

PostgreSQL 的 JDBC 驱动由 Paper 在运行时自动下载, 无需手动安装

要添加额外数据库类型支持, 需要实现`pers.yufiria.craftorithm.database.loader.DataSourceLoader`接口, 并通过`pers.yufiria.craftorithm.database.DataSourceManager#registerDatabaseLoader`方法注册

默认配置:

```yaml
# 使用什么类型的数据库, 支持sqlite、mysql和postgresql
type: sqlite

# SQLite专用配置
sqlite:
  # 数据库文件路径（相对或绝对）
  file: "plugins/Craftorithm/data.db"
  parameters: "foreign_keys=on&journal_mode=WAL"

# MySQL专用配置
mysql:
  host: "localhost"
  port: 3306
  database: "craftorithm"
  username: "root"
  password: "your_password"
  parameters: "useSSL=false&serverTimezone=UTC"
  pool:
    max_connections: 8
    max_idle_time_ms: 60000
    max_lifetime_ms: 1800000
    check_connections_every_ms: 5000
    test_before_get: true

# PostgreSQL专用配置
postgresql:
  host: "localhost"
  port: 5432
  database: "craftorithm"
  username: "postgres"
  password: "your_password"
  parameters: "sslmode=disable"
  pool:
    max_connections: 8
    max_idle_time_ms: 60000
    max_lifetime_ms: 1800000
    check_connections_every_ms: 5000
    test_before_get: true
```