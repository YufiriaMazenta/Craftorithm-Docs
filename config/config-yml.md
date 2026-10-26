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
| `log_level` | string | `info` | 插件日志级别，可选 `debug` / `verbose` / `info` / `warn` / `error` / `off` |

> `debug` 配置项自 1.15.2.0 起由 `log_level` 替代，插件启动时会自动将旧值迁移（`debug: true` → `log_level: debug`），无需手动修改

### 配方设置

| 键                                            | 类型     | 默认值  | 说明                                                                                                       |
|-----------------------------------------------|----------|---------|------------------------------------------------------------------------------------------------------------|
| `remove_all_vanilla_recipe`                   | boolean  | `false` | 移除所有原版配方                                                                                           |
| `enable_anvil_recipe`                         | boolean  | `true`  | 启用自定义铁砧配方                                                                                         |
| `max_reg_recipe_per_tick`                     | integer  | `100`   | 每 tick 最大配方注册数（防卡顿）                                                                           |
| `ingredient.try_all_possible_item_id`         | boolean  | `false` | 材料匹配时是否尝试物品的所有可能物品 id，开启后性能开销更高。旧版本中的 `ingredient_match_mode: all` 等价于 `true` |
| `ingredient.use_set_threshold`                | integer  | `8`     | 配方材料数量超过此阈值时使用 Set 替代 List 进行匹配，提升大量材料时的查找性能 |
| `save_discovered_recipes.enable`                | boolean  | `true`  | 是否将玩家已解锁配方存储到数据库，开启后玩家的已解锁配方会写入数据库，并在玩家加入服务器、插件重载与服务器启动后从数据库恢复 |
| `save_discovered_recipes.join_discover_delay_ticks` | integer | `20` | 玩家加入服务器后，等待多少tick再从数据库读取已解锁配方                                          |
| `save_discovered_recipes.interval_ticks` | integer  | `6000`  | 定时保存在线玩家已解锁配方到数据库的间隔（tick），默认300秒（5分钟）                                                                  |

### 物品设置

| 键                             | 类型 | 默认值 | 说明                                               |
|--------------------------------|------|--------|----------------------------------------------------|
| `item_plugin_hook_priority`    | list | (有序列表) | 外部物品插件检测优先级                             |
| `cannot_craft_items`           | list | `[]` | 禁止合成的物品 ID 列表，已移除 <Badge type="danger" text="1.13.4.0" />         |
| `blocked_crafting_lore_rules`  | list | `[]` | 阻止包含指定lore的物品被用于合成，已移除 <Badge type="danger" text="1.13.5.0" /> |
| `ingredient.restriction_rules` | list | [] | 通过设置不同规则来阻止物品被用于合成，替代上面两个功能 |

`ingredient.restriction_rules`可以设定符合物品不能被用作指定配方的材料, 可以作用于所有配方类型

插件启动时会自动转换原有的 `cannot_craft_items` 和 `blocked_crafting_lore_rules`，无需手动更新

配置格式:

```yaml
ingredient:
  restriction_rules:
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
| `not_convert_listener_classes` | list | (24个监听器类) | 不进行隔离的监听器类，在此列表里的监听器类可以检测到Craftorithm的配方；以 `*` 结尾的条目按类名前缀匹配，其余按完整类名精确匹配 |

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
# 插件日志级别，可选 debug / verbose / info / warn / error / off
log_level: info
# 每tick注册的配方数量，调低此数值可以减少服务器卡顿
max_reg_recipe_per_tick: 100
# 材料相关配置
ingredient:
  # 材料匹配时是否使用所有可能的物品id
  # 开启后，合成将会消耗更多性能
  try_all_possible_item_id: false
  # 配方材料数量超过此阈值时使用 Set 替代 List 进行匹配，提升大量材料时的查找性能
  use_set_threshold: 8
  # 设定材料的合成限制规则
  # 支持的规则类型: lore(基于lore判断), item_id(基于物品id判断)
  # 第三方插件可注册自定义规则类型
  restriction_rules:
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
  - com.leonardobishop.quests.bukkit.tasktype.type.*
  - org.betonquest.betonquest.lib.bukkit.event.*
  - com.notquests.paper.events.*
  - fr.skytasul.quests.QuestsListener
  - fr.skytasul.quests.stages.StageCraft
  - fr.skytasul.quests.stages.StageMelt
  - com.ordwen.odailyquests.events.listeners.item.*
  - com.typewritermc.engine.paper.entry.*
```
