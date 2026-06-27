---
title: 安装与依赖
---

# 安装与依赖

## 系统要求

| 项目 | 要求 |
|------|------|
| Java | 21+ |
| 服务端 | Paper / Spigot 1.19.4+ |
| Folia | 完全支持 |

## 软依赖

以下插件为可选依赖，安装后可获得额外功能：

| 插件 | 功能 |
|------|------|
| Vault | 经济系统（条件函数 `money`、动作 `take-money`/`give-money`） |
| PlayerPoints | 积分系统（条件函数 `points`、动作 `take-points`/`give-points`） |
| PlaceholderAPI | 变量解析（条件函数 `papi`） |
| ProtocolLib | 配方书假结果预览 |
| PacketEvents | 配方书假结果预览（ProtocolLib 替代方案） |

## 外部物品插件 Hook

Craftorithm 支持对接以下物品插件，在配方中直接使用它们的物品 ID：

| 插件 | 命名空间 | 物品 ID 格式 |
|------|---------|-------------|
| CraftEngine | `craftengine` | `craftengine:<id>` |
| Nexo | `nexo` | `nexo:<id>` |
| AzureFlow | `azureflow` | `azureflow:<id>` |
| NeigeItems | `neigeitems` | `neigeitems:<id>` |
| ItemsAdder | `itemsadder` | `itemsadder:<id>` |
| Oraxen | `oraxen` | `oraxen:<id>` |
| EcoItems | `ecoitems` | `ecoitems:<id>` |
| ExecutableItems | `executableitems` | `executableitems:<id>` |
| MMOItems | `mmoitems` | `mmoitems:<type>/<id>` |
| MythicMobs | `mythicmobs` | `mythicmobs:<id>` |
| SX-Item | `sx-item` | `sx-item:<id>` |

Hook 优先级可在 `config.yml` 的 `item_plugin_hook_priority` 中配置。

## 插件目录结构

安装后，插件生成以下目录：

```
plugins/Craftorithm/
├── config.yml           # 主配置
├── recipes/             # 配方文件目录
├── triggers/            # 触发器文件目录
├── items/               # 自定义物品目录
├── menus/               # 菜单配置目录
│   ├── custom/          # 自定义菜单
│   └── internal/        # 内置菜单（勿修改）
├── item_packs.yml       # 物品组定义
├── custom_fuels.yml     # 自定义燃料
├── disabled_recipes.yml # 禁用配方列表
└── lang/                # 语言文件
```

## 首次启动

1. 插件自动检测服务器语言环境，加载对应语言文件
2. 生成默认 `config.yml` 和示例文件
3. 按 `max_reg_recipe_per_tick` 配置的速率逐 tick 注册配方，避免卡顿
4. 自动检测已安装的外部物品插件并注册 Hook
