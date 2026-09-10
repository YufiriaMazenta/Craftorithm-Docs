---
title: 物品系统
---

# 物品系统概述

Craftorithm 提供统一的物品管理接口，支持自定义物品定义和对接 13 外部物品插件。

## 物品 ID 格式

物品使用 `命名空间:ID` 格式标识：

| 来源 | 格式 | 示例                      |
|------|------|---------------------------|
| Minecraft 原版 | `minecraft:<id>` | `minecraft:diamond_sword` |
| Craftorithm 自定义 | `craftorithm:<id>` | `items:file:my_item`      |
| 物品Tag | `tag:<tag_name>` | `tag:planks`              |
| 物品组 | `item_pack:<name>` | `item_pack:ores`          |
| 外部插件 | `<plugin>:<id>` | `craft_engine:my_item`    |

## 物品文件

自定义物品定义在 `plugins/Craftorithm/items/` 目录下，每个 YAML 文件可以定义多个物品。

## 在配方中使用

物品 ID 可在配方 YAML 的 `result`、`ingredient`、`base`、`addition`、`template` 等字段中使用。

## 物品检测顺序

当使用菜单创建配方时，Craftorithm会按以下顺序查找匹配的物品：

1. 外部物品插件（按 `item_plugin_hook_priority` 配置的顺序）
2. Craftorithm 自定义物品

如果一个物品没有数据值，那么会返回它的原版id

可在 `config.yml` 中调整外部物品插件的优先级：

```yaml
item_plugin_hook_priority:
  - CustomFishing
  - CraftEngine
  - Nexo
  - AzureFlow
  - SX-Item
  - EmakiItem
  - NeigeItems
  - ItemsAdder
  - Oraxen
  - EcoItems
  - ExecutableItems
  - MMOItems
  - MythicMobs
  - Craftorithm
```
