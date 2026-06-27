---
title: config.yml
---

# config.yml 详解

主配置文件 `plugins/Craftorithm/config.yml` 控制插件的核心行为。

## 配置项

### 基础设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `config_version` | integer | `2` | 配置版本号，勿手动修改 |
| `language` | string | `en_us` | 插件语言 |
| `check_update` | boolean | `true` | 启动时检查更新 |
| `debug` | boolean | `false` | 调试模式 |

### 配方设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `remove_all_vanilla_recipe` | boolean | `false` | 移除所有原版配方 |
| `enable_anvil_recipe` | boolean | `true` | 启用自定义铁砧配方 |
| `max_reg_recipe_per_tick` | integer | `20` | 每 tick 最大配方注册数（防卡顿） |

### 物品设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `item_plugin_hook_priority` | list | (有序列表) | 外部物品插件检测优先级 |
| `cannot_craft_items` | list | `[]` | 禁止合成的物品 ID 列表 |

### 命令设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `main_command_aliases` | list | `[cra, craft, crafto]` | 主命令别名 |

### 集成设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `bstats` | boolean | `true` | 启用 bStats 统计 |
| `reload_when_ia_reload` | boolean | `true` | ItemsAdder 重载时自动重载 |

## 示例

```yaml
config_version: 2
language: zh_cn
check_update: true
debug: false
remove_all_vanilla_recipe: false
enable_anvil_recipe: true
max_reg_recipe_per_tick: 20
bstats: true
reload_when_ia_reload: true
main_command_aliases:
  - cra
  - craft
  - crafto
item_plugin_hook_priority:
  - craftengine
  - nexo
  - azureflow
  - neigeitems
  - itemsadder
  - oraxen
  - ecoitems
  - executableitems
  - mmoitems
  - mythicmobs
cannot_craft_items: []
```
