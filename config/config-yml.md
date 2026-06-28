---
title: config.yml
---

# config.yml 详解

主配置文件 `plugins/Craftorithm/config.yml` 控制插件的核心行为。

## 配置项

### 基础设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
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
#插件的配置版本
config_version: 2
#是否开启版本更新检查
check_update: true
#是否移除所有的原版配方
remove_all_vanilla_recipe: false
#是否启用插件铁砧配方
enable_anvil_recipe: true
#是否启用bstats插件使用数据统计
bstats: true
#是否在ItemsAdder重载时也重载Craftorithm
reload_when_ia_reload: true
#是否开启调试
debug: false
#单个tick最多注册几个配方
max_reg_recipe_per_tick: 20
cannot_craft_items: []
#依照上面的挂钩顺序挂钩插件可以挂钩的物品插件,插件自动识别物品ID时将会优先识别上面的插件
#不包含在此列表里的物品插件将不会尝试挂钩,除非该插件主动挂钩
item_plugin_hook_priority:
  - CraftEngine
  - Nexo
  - AzureFlow
  - NeigeItems
  - ItemsAdder
  - Oraxen
  - EcoItems
  - ExecutableItems
  - MMOItems
  - MythicMobs
main_command_aliases:
  - cra
  - craft
  - crafto
not_convert_listener_classes:
  - a4.papers.chatfilter.chatfilter.events.AnvilListener
  - com.ghostchu.quickshop.shade.tne.menu.paper.listener.PaperInventoryClickListener
  - com.earth2me.essentials.EssentialsPlayerListener
  - net.coreprotect.listener.player.InventoryChangeListener
  - net.coreprotect.listener.player.CraftItemListener
  - com.extendedclip.deluxemenus.listener.PlayerListener
  - com.dre.brewery.listeners.InventoryListener
  - com.xyrisdev.svalues.shaded.library.menu.MenuManager$InventoryListener
  - me.arcaniax.hdb.listener.InventoryListener
  - net.momirealms.craftengine.bukkit.item.listener.ItemEventListener
  - net.momirealms.customfishing.bukkit.hook.BukkitHookManager
  - net.momirealms.customfishing.bukkit.market.BukkitMarketManager
  - dev.jsinco.recipes.listeners.Events
  - fr.moribus.imageonmap.image.MapInitEvent
  - com.badbones69.crazycrates.paper.listeners.crates.types.WarCrateListener
  - com.ryderbelserion.fusion.paper.api.builders.gui.listeners.GuiListener
  - club.kid7.bannermaker.pluginutilities.gui.CustomGUIInventoryListener
```
