---
title: UI 系统
---

# UI 系统概述

Craftorithm 提供图形化界面系统，包含配方创建、编辑、浏览和自定义菜单功能。

## 子系统

| 子系统 | 说明 | 入口命令 |
|--------|------|---------|
| 配方创建器 | 可视化创建配方 | `/cra create <type>` |
| 配方编辑器 | 编辑已有配方 | `/cra edit <recipe_id>` |
| 配方书 | 浏览所有配方 | `/cra recipebook` |
| 自定义菜单 | YAML 定义的自定义界面 | `/cra openmenu <name>` |

## 支持的配方类型

所有 12 种配方类型均有对应的 GUI 界面：
- 有序/无序配方：拖放材料格
- 烧炼配方：单输入+时间/经验设置
- 锻造配方：base+addition+template
- 酿造配方：input+ingredient
- 铁砧配方：base+addition+cost_level
- 切石配方：单输入

## 权限

| 功能 | 权限节点 |
|------|---------|
| 创建配方 | `craftorithm.command.create` |
| 编辑配方 | `craftorithm.edit_recipe` |
| 配方书 | `craftorithm.command.recipebook` |
| 自定义菜单 | `craftorithm.command.openmenu` |
