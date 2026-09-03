---
title: config.yml
---

# config.yml Reference

The main configuration file `plugins/Craftorithm/config.yml` controls core plugin behavior.

## Configuration Keys

### Basic Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `check_update` | boolean | `true` | Check for updates on startup |
| `debug` | boolean | `false` | Debug mode |

### Recipe Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `remove_all_vanilla_recipe` | boolean | `false` | Remove all vanilla recipes |
| `enable_anvil_recipe` | boolean | `true` | Enable custom anvil recipes |
| `use_experimental_recipe_ingredients` | boolean | `true` | Enable experimental recipe ingredients (1.21.3+ stonecutter recipes unaffected by NBT/component changes) |
| `max_reg_recipe_per_tick` | integer | `100` | Max recipes registered per tick (anti-lag) |
| `ingredient_use_set_threshold` | integer | `8` | Threshold for using HashSet instead of ArrayList for ingredient matching when multiple item types are allowed, improves performance with many ingredient types |

### Item Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `item_plugin_hook_priority` | list | (ordered list) | External item plugin detection priority |
| `cannot_craft_items` | list | `[]` | Item IDs that cannot be used in crafting (removed in 1.13.4.0) |
| `blocked_crafting_lore_rules` | list | `[]` | Prevent items with specified lore from being used in crafting (removed in 1.13.5.0) |
| `ingredient_restriction_rules` | list | `[]` | Block items from being used in crafting through configurable rules (added in 1.13.5.0, replaces both features above) |

`ingredient_restriction_rules` is a new feature in 1.13.5.0. It allows you to set rules that prevent matching items from being used as materials for specified recipes. This applies to all recipe types.

When upgrading to 1.13.5.0, the plugin will automatically convert the existing `cannot_craft_items` and `blocked_crafting_lore_rules` settings — no manual migration needed.

Configuration format:

```yaml
ingredient_restriction_rules:
  - type: item_id # Block by item ID
    item_id: minecraft:diamond
    recipes:
      - .* # Match all recipes
  - type: lore # Block by lore (color codes are ignored during matching)
    lore: Cannot be used for crafting
    recipes:
      - .*
  - type: lore
    lore: Cannot be used for vanilla recipes
    recipes:
      - minecraft:.* # Match all vanilla recipes
      - craftorithm:vanilla_shaped # Exact match
```

### Command Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `main_command_aliases` | list | `[cra, craft, crafto]` | Main command aliases |

### Integration Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `bstats` | boolean | `true` | Enable bStats statistics |

### Compatibility Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `not_convert_listener_classes` | list | (17 listener classes) | Listener classes that are not isolated, can detect Craftorithm recipes |

## Example

```yaml
# Whether to check for updates
check_update: true
# Whether to remove all vanilla recipes
remove_all_vanilla_recipe: false
# Whether to allow bStats usage data collection
bstats: true
# Whether to enable anvil recipes
enable_anvil_recipe: true
debug: true
# Max recipes registered per tick, lower values reduce server lag
max_reg_recipe_per_tick: 100
# Enable experimental recipe ingredients
# When enabled, recipe material identification is not affected by NBT/component changes (except 1.21.3+ stonecutter recipes), but may cause issues in recipe book
use_experimental_recipe_ingredients: true
# Threshold for using HashSet instead of ArrayList for ingredient matching when multiple item types are allowed
ingredient_use_set_threshold: 8
# Hook item plugins in the order listed above for item detection priority
# Item plugins not in this list will not be hooked unless they actively hook into Craftorithm
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
# Plugin main command aliases, only read once on startup
main_command_aliases:
  - cra
  - craft
  - crafto
# Listener classes that are not isolated, can detect Craftorithm recipes
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
    lore: Cannot be used for crafting
    recipes:
      - .*
  - type: lore
    lore: Cannot be used for vanilla recipes
    recipes:
      - minecraft:.*
      - craftorithm:vanilla_shaped
```
