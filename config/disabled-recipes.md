---
title: 禁用配方列表
---

# 禁用配方列表

## 配置文件

`plugins/Craftorithm/disabled_recipes.yml`

## 格式

```yaml
recipes:
  - 'minecraft:diamond_sword'
  - 'minecraft:golden_apple'
  - 'minecraft:enchanted_golden_apple'
  - 'craftorithm:some_recipe'
```

## 配方 ID 格式

- 原版配方：`minecraft:<recipe_key>`
- Craftorithm 配方：`craftorithm:<filename>`
- 其他插件配方：`<namespace>:<key>`

## 操作方式

### 命令方式（推荐）

```bash
/cra disable <recipe_id>
```

命令会自动将配方添加到此文件中。

### 手动编辑

直接编辑 `disabled_recipes.yml` 文件，然后 `/cra reload` 重载。

## 生效方式

- 服务器启动时自动加载
- `/cra reload` 时重新加载
- 禁用的配方从配方注册表中移除，但配方定义文件不受影响
