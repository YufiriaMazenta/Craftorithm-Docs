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

| 键                                            | 类型     | 默认值  | 说明                                                                                                       |
|-----------------------------------------------|----------|---------|------------------------------------------------------------------------------------------------------------|
| `remove_all_vanilla_recipe`                   | boolean  | `false` | 移除所有原版配方                                                                                           |
| `enable_anvil_recipe`                         | boolean  | `true`  | 启用自定义铁砧配方                                                                                         |
| `max_reg_recipe_per_tick`                     | integer  | `100`   | 每 tick 最大配方注册数（防卡顿）                                                                           |
| `use_experimental_recipe_ingredients`         | boolean  | `true`  | 是否启用实验性配方材料功能，会改变配方材料匹配模式                                                         |
| `ingredient_use_set_threshold`                | interger | `8`     | 在一个材料允许多少种物品的情况下，使用HashSet替代ArrayList进行材料匹配，在材料种类较多的情况下可以提升性能 |
| `recipe_discovery_sync.enable`                | boolean  | `false` | 是否开启同步已解锁配方数据，开启后，玩家的已解锁配方数据会存储到数据库中，并在玩家加入服务器时自动解锁     |
| `recipe_discovery_sync.join_sync_delay_ticks` | integer  | `20`    | 玩家加入服务器后，等待多少tick再执行同步                                                                   |
| `recipe_discovery_sync.interval_ticks` | integer  | `6000`  | 定时保存在线玩家已解锁配方到数据库的间隔（tick），默认300秒（5分钟）                                                                  |

### 物品设置

| 键                             | 类型 | 默认值 | 说明                                               |
|--------------------------------|------|--------|----------------------------------------------------|
| `item_plugin_hook_priority`    | list | (有序列表) | 外部物品插件检测优先级                             |
| `cannot_craft_items`           | list | `[]` | 禁止合成的物品 ID 列表(在1.13.4.0版本移除)         |
| `blocked_crafting_lore_rules`  | list | `[]` | 阻止包含指定lore的物品被用于合成(1.13.5.0版本移除) |
| `ingredient_restriction_rules` | list | [] | 通过设置不同规则来阻止物品被用于合成(1.13.5.0版本添加,替代上面两个功能 |

`ingredient_restriction_rules`是1.13.5.0新增的功能, 可以设定符合物品不能被用作指定配方的材料, 可以作用于所有配方类型

在1.13.5.0版本的插件启动时, 会对原`cannot_craft_items`和`blocked_crafting_lore_rules`进行自动转换, 无需手动更新

配置格式:

```yaml
ingredient_restriction_rules:
  - type: item_id
    item_id: minecraft:diamond
    recipes:
      - .*
  - type: lore
    lore: 无法用于合成
    recipes:
      - .*
  - type: lore
    lore: 无法用于原版配方
    recipes:
      - minecraft:.*
      - craftorithm:vanilla_shaped
```


### 命令设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `main_command_aliases` | list | `[cra, craft, crafto]` | 主命令别名 |

### 集成设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `bstats` | boolean | `true` | 启用 bStats 统计 |

### 兼容性设置

| 键 | 类型 | 默认值 | 说明 |
|----|------|--------|------|
| `not_convert_listener_classes` | list | (17个监听器类) | 不进行隔离的监听器类，在此列表里的监听器类可以检测到Craftorithm的配方 |

## 示例

```yaml
# 是否进行更新检测
check_update: true
# 是否卸载所有的原版配方
remove_all_vanilla_recipe: false
# 是否允许插件通过bStats收集使用信息
bstats: true
# 是否启用铁砧配方
enable_anvil_recipe: true
debug: true
# 每tick注册的配方数量，调低此数值可以减少服务器卡顿
max_reg_recipe_per_tick: 100
# 是否启用实验性配方材料功能
# 启用后，除1.21.3及以上的切石机配方外，合成材料的识别将不会受到NBT/组件变更的影响，但可能在配方书等场景下出现一些问题
use_experimental_recipe_ingredients: true
# 配方材料数量超过此阈值时使用 Set 替代 List 进行匹配，提升大量材料时的查找性能
ingredient_use_set_threshold: 8
# 依照上面的挂钩顺序挂钩插件可以挂钩的物品插件,插件自动识别物品ID时将会从上到下依次判断
# 不包含在此列表里的物品插件将不会尝试挂钩,除非该插件主动挂钩
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
# 插件主命令的别名，只在插件启动时读取一次
main_command_aliases:
  - cra
  - craft
  - crafto
# 不进行隔离的监听器类，在此列表里的监听器类可以检测到Craftorithm的配方
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
ingredient_restriction_rules:
  - type: item_id
    item_id: minecraft:diamond
    recipes:
      - .*
  - type: lore
    lore: 无法用于合成
    recipes:
      - .*
  - type: lore
    lore: 无法用于原版配方
    recipes:
      - minecraft:.*
      - craftorithm:vanilla_shaped

```
