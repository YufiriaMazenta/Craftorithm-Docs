---
title: Item System
---

# Item System Overview

Craftorithm provides a unified item management interface, supporting custom item definitions and integration with 10+ external item plugins.

## Item ID Format

Items use the `namespace:id` format:

| Source | Format | Example |
|--------|--------|---------|
| Minecraft vanilla | `minecraft:<id>` | `minecraft:diamond_sword` |
| Craftorithm custom | `craftorithm:<id>` | `craftorithm:my_item` |
| Item Tag | `tag:<tag_name>` | `tag:planks` |
| Item Pack | `item_pack:<name>` | `item_pack:ores` |
| External plugins | `<plugin>:<id>` | `itemsadder:my_item` |

## Item Files

Custom items are defined in `plugins/Craftorithm/items/` directory, with each YAML file capable of defining multiple items.

## Using Items in Recipes

Item IDs can be used in recipe YAML fields such as `result`, `ingredient`, `base`, `addition`, `template`, etc.

## Item Detection Order

When creating recipes via the menu, Craftorithm searches for matching items in the following order:

1. External item plugins (in the order configured by `item_plugin_hook_priority`)
2. Craftorithm custom items

If an item has no data value, its vanilla ID is returned.

You can adjust the external plugin priority in `config.yml`:

```yaml
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
```
