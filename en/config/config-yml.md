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
| `max_reg_recipe_per_tick` | integer | `12` | Max recipes registered per tick (anti-lag) |

### Item Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `item_plugin_hook_priority` | list | (ordered list) | External item plugin detection priority |
| `cannot_craft_items` | list | `[]` | Item IDs that cannot be used in crafting (removed in 1.13.4.0) |
| `blocked_crafting_lore_rules` | list | `[]` | Prevent items with specified lore from being used in crafting (added in 1.13.4.0) |

`blocked_crafting_lore_rules` is a new feature in 1.13.4.0. It allows you to set rules that items with a specific lore line cannot be used as recipe materials. This applies to all recipe types.

Lore matching ignores color codes, so do not include color codes in your config, or the match will fail.

Recipe keys support both regex and exact matching.

Configuration format:

```yaml
blocked_crafting_lore_rules:
  - lore: 'Cannot be used for crafting'
    blocked_recipes:
      - '.*' # Match all recipes
  - lore: 'Cannot be used for vanilla recipes'
    blocked_recipes:
      - 'minecraft:.*' # Regex match vanilla recipes
      - 'craftorithm:vanilla_shaped' # Exact match
```

### Command Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `main_command_aliases` | list | `[cra, craft, crafto]` | Main command aliases |

### Integration Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `bstats` | boolean | `true` | Enable bStats statistics |
| `reload_when_ia_reload` | boolean | `true` | Auto-reload when ItemsAdder reloads |

## Example

```yaml
# Plugin config version
config_version: 2
# Whether to check for version updates
check_update: true
# Whether to remove all vanilla recipes
remove_all_vanilla_recipe: false
# Whether to enable plugin anvil recipes
enable_anvil_recipe: true
# Whether to enable bStats usage data collection
bstats: true
# Whether to reload Craftorithm when ItemsAdder reloads
reload_when_ia_reload: true
# Whether to enable debug mode
debug: false
# Maximum number of recipes registered per tick
max_reg_recipe_per_tick: 12
# Enable experimental recipe ingredients
# When enabled, recipe material identification is not affected by NBT/component changes (except 1.21.3+ stonecutter recipes), but may cause issues in recipe book
use_experimental_recipe_ingredients: true
# Rules to prevent items with specified lore from being used in certain recipes
blocked_crafting_lore_rules:
  - lore: 'Cannot be used for crafting'
    blocked_recipes:
      - '.*' # Match all recipes
  - lore: 'Cannot be used for vanilla recipes'
    blocked_recipes:
      - 'minecraft:.*' # Match vanilla recipes
      - 'craftorithm:vanilla_shaped' # Exact match
# Hook item plugins in the order listed above for item detection priority
# Item plugins not in this list will not be hooked unless they actively hook into Craftorithm
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
