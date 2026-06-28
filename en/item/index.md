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

Custom items are defined in `plugins/Craftorithm/items/` directory, with each YAML file defining items.

## Using Items in Recipes

Item IDs can be used in recipe YAML fields such as `result`, `ingredient`, `base`, `addition`, `template`, etc.

## Item Detection Order

When a recipe references an item, Craftorithm searches in the following order:

1. Craftorithm custom items
2. Minecraft vanilla items
3. External item plugins (in the order configured by `item_plugin_hook_priority`)

You can adjust the external plugin priority in `config.yml`:

```yaml
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
```
