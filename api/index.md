---
title: API 概述
---

# API 概述

Craftorithm 提供 Java API 供插件开发者进行二次开发。

## 添加依赖

### Maven

```xml
<repository>
  <id>jitpack.io</id>
  <url>https://jitpack.io</url>
</repository>

<dependency>
  <groupId>com.github.YufiriaMazenta</groupId>
  <artifactId>Craftorithm</artifactId>
  <version>Tag</version>
</dependency>
```

### Gradle

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.YufiriaMazenta:Craftorithm:Tag'
}
```

## API 入口

```java
import pers.yufiria.craftorithm.api.CraftorithmAPI;

CraftorithmAPI api = Craftorithm.api();
```

## API 模块

| 模块 | 说明 |
|------|------|
| [Item API](/api/items) | 物品管理、注册、查询 |
| [Recipe API](/api/recipes) | 配方管理、类型注册 |
| [Trigger API](/api/triggers) | 触发器管理、事件触发 |
| [Script API](/api/scripts) | 脚本执行、自定义函数注册 |
| [Hook 开发](/api/hooks) | 外部物品插件集成 |

## 线程安全

- 配方操作（读取/注册/移除）是线程安全的
- 触发器操作是线程安全的
- 脚本执行使用独立的 VM 实例，支持并发
