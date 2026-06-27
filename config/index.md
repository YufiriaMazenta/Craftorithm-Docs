---
title: 配置文件
---

# 配置文件总览

## 文件清单

| 文件 | 位置 | 用途 | 热重载 |
|------|------|------|--------|
| `config.yml` | 根目录 | 主配置 | ✅ |
| `recipes/*.yml` | `recipes/` | 配方定义 | ✅ |
| `triggers/*.yml` | `triggers/` | 触发器定义 | ✅ |
| `items/*.yml` | `items/` | 自定义物品 | ✅ |
| `menus/custom/*.yml` | `menus/custom/` | 自定义菜单 | ✅ |
| `item_packs.yml` | 根目录 | 物品组 | ✅ |
| `custom_fuels.yml` | 根目录 | 自定义燃料 | ✅ |
| `disabled_recipes.yml` | 根目录 | 禁用配方列表 | ✅ |
| `lang/*.yml` | `lang/` | 语言文件 | ✅ |

## 热重载

使用 `/cra reload` 命令可重载大部分配置，无需重启服务器。

## 目录结构

```
plugins/Craftorithm/
├── config.yml
├── item_packs.yml
├── custom_fuels.yml
├── disabled_recipes.yml
├── recipes/
├── triggers/
├── items/
├── menus/
│   ├── custom/
│   └── internal/       # 内置菜单（勿手动修改）
└── lang/
```

## 加载顺序

1. `config.yml` — 主配置
2. `lang/` — 语言文件
3. `items/` — 自定义物品
4. `item_packs.yml` — 物品组
5. `custom_fuels.yml` — 自定义燃料
6. `recipes/` — 配方文件
7. `disabled_recipes.yml` — 禁用列表
8. `triggers/` — 触发器
9. `menus/` — 菜单配置
