---
title: database.yml
---

Since version 1.14.0.0, the plugin supports databases, configured through `database.yml`.

Sqlite, Mysql and PostgreSQL are supported out of the box. Other plugins can also add extra database type support to Craftorithm.

PostgreSQL support was added in 1.14.2.0

To add extra database type support, implement the `pers.yufiria.craftorithm.database.loader.DataSourceLoader` interface and register it through `pers.yufiria.craftorithm.database.DataSourceManager#registerDatabaseLoader`.

Default configuration:

```yaml
# Which database type to use, supports sqlite, mysql and postgresql
type: sqlite

# SQLite-specific configuration
sqlite:
  # Database file path (relative or absolute)
  file: "plugins/Craftorithm/data.db"
  parameters: "foreign_keys=on&journal_mode=WAL"

# MySQL-specific configuration
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

# PostgreSQL-specific configuration (1.14.2.0+)
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