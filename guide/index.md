---
title: 快速开始
---

# 快速开始

## 前置条件

- **Java**: 21 或更高版本
- **服务端**: Paper / Spigot 1.20+ (支持 Folia)

## 下载

从以下平台下载最新版本：

- [SpigotMC](https://www.spigotmc.org/resources/craftorithm-customized-crafting-management-plugin-1-13-1-20-folia-supported.108429/)
- [Modrinth](https://modrinth.com/plugin/craftorithm)
- [GitHub Releases](https://github.com/YufiriaMazenta/Craftorithm/releases)

## 安装

请查看[安装指引](/guide/installation.md)

## 创建第一份配方

登录服务器后，执行以下命令打开配方创建 GUI：

```
/cra create shaped
```

1. 在 GUI 中放入合成材料（按有序配方排列）
2. 在结果槽放入产出物品
3. 点击确认按钮保存

配方将自动保存到 `plugins/Craftorithm/recipes/` 目录下。

## 验证

在工作台中放入对应的材料，确认配方出现在合成结果中。

## PlaceholderAPI变量

从1.13.4.0开始, Craftorithm提供了一些PlaceholderAPI变量

`%craftorithm_discovered%` 返回当前玩家发现的配方数量

`%craftorithm_discovered_<recipe_key>%` 返回玩家是否发现了该配方, 例如`%craftorithm_discovered_minecraft:diamond_sword%`

## 下一步

- [配方系统](/recipe/) — 了解 11 种配方类型的详细写法
- [配置文件](/config/) — 自定义插件行为
- [触发器系统](/trigger/) — 为配方添加条件和动作
- [脚本引擎](/script/) — 编写复杂的条件逻辑
