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

| 键                  | 类型      | 默认值     | 说明                        |
|--------------------|---------|---------|---------------------------|
| `remove_all_vanilla_recipe` | boolean | `false` | 移除所有原版配方                  |
| `enable_anvil_recipe` | boolean | `true`  | 启用自定义铁砧配方                 |
| `max_reg_recipe_per_tick` | integer | `12` | 每 tick 最大配方注册数（防卡顿）       |
| `use_experimental_recipe_ingredients` | boolean | `true`  | 是否启用实验性配方材料功能，会改变配方材料匹配模式 |

### 物品设置

| 键                            | 类型 | 默认值 | 说明                                               |
|-------------------------------|------|--------|----------------------------------------------------|
| `item_plugin_hook_priority`   | list | (有序列表) | 外部物品插件检测优先级                             |
| `cannot_craft_items`          | list | `[]` | 禁止合成的物品 ID 列表(在1.13.4.0版本移除)         |
| `blocked_crafting_lore_rules` | list | `[]` | 阻止包含指定lore的物品被用于合成(1.13.4.0版本添加) |

`blocked_crafting_lore_rules`是1.13.4.0新增的功能, 可以设定包含某条lore的物品不能被用作配方材料, 可以作用于所有配方类型

判断是否包含lore时会忽略颜色, 所以在配置时也不要设置, 否则无法匹配到

配方键支持正则或精准匹配

配置格式:

```yaml
blocked_crafting_lore_rules:
  - lore: '无法用于合成' 
    blocked_recipes:
      - '.*' #匹配所有配方
  - lore: '无法用于原版配方'
    blocked_recipes:
      - 'minecraft:.*' #匹配原版配方
      - 'craftorithm:vanilla_shaped' #精确匹配
```


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
#是否启用实验性配方材料功能
#启用后，除1.21.3及以上的切石机配方外，合成材料的识别将不会受到NBT/组件变更的影响，但可能在配方书等场景下出现一些问题
use_experimental_recipe_ingredients: true
#设定包含指定lore不能被用于某些配方的规则
blocked_crafting_lore_rules:
  - lore: '无法用于合成'
    blocked_recipes:
      - '.*' #匹配所有配方
  - lore: '无法用于原版配方'
    blocked_recipes:
      - 'minecraft:.*' #匹配原版配方
      - 'craftorithm:vanilla_shaped' #精确匹配
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
