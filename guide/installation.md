---
title: 安装与依赖
---

# 安装与依赖

## 系统要求

| 项目 | 要求                    |
|------|-----------------------|
| Java | 21+                   |
| 服务端 | Spigot 1.19.4+ 及衍生服务端 |
| Folia | 支持                    |

## 安装

将下载的Craftorithm-xx.jar丢入plugins文件夹, 然后重启服务器

### 安装建议

为了体验到完整的功能, 建议你使用paper服务端或它的fork, 且安装packetevents或ProtocolLib其中之一, 缺少数据包管理插件会无法使用虚拟配方预览功能

### 从旧版本迁移

插件内置从旧版配方格式转换的功能，在加载时自动运行，但语言文件建议删除原本的lang文件夹重新生成

## 软依赖

以下插件为可选依赖，安装后可获得额外功能：

| 插件             | 功能                                       |
|----------------|------------------------------------------|
| Vault          | 条件函数 `money`、动作 `take_money`/`give_money` |
| PlayerPoints   | 条件函数 `points`、动作 `take_points`/`give_points` |
| PlaceholderAPI | 条件函数 `papi`                              |
| ProtocolLib    | 配方书虚拟结果预览                                |
| packetevents   | 配方书虚拟结果预览                                |

## 外部物品插件

Craftorithm 支持对接以下物品插件，在配方中直接使用它们的物品 ID：

| 插件 | 命名空间 | 物品 ID 格式               |
|------|---------|------------------------|
| CraftEngine | `craftengine` | `craftengine:<id>`     |
| Nexo | `nexo` | `nexo:<id>`            |
| AzureFlow | `azureflow` | `azureflow:<id>`       |
| NeigeItems | `neigeitems` | `neigeitems:<id>`      |
| ItemsAdder | `itemsadder` | `itemsadder:<id>`      |
| Oraxen | `oraxen` | `oraxen:<id>`          |
| EcoItems | `ecoitems` | `ecoitems:<id>`        |
| ExecutableItems | `executableitems` | `executableitems:<id>` |
| MMOItems | `mmoitems` | `mmoitems:<type>:<id>` |
| MythicMobs | `mythicmobs` | `mythicmobs:<id>`      |
| SX-Item | `sx-item` | `sx-item:<id>`         |

物品插件的优先级可在 `config.yml` 的 `item_plugin_hook_priority` 中配置。

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

