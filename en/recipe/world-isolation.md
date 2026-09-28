---
title: World Isolation
---

# World Isolation

Recipes can be configured to be enabled in specific worlds. All recipe types are supported, but due to differences in implementation, some recipe types may behave in unexpected ways.

## Version Differences

### Crafting table recipes (shaped, shapeless), smelting recipes (furnace, blast furnace, smoker, campfire), smithing recipes (transform, trim), and anvil recipes

When world isolation is enabled, the recipe effectively does not exist in worlds where it is disabled. Therefore it will not interfere with other recipes using the same crafting method, allowing the same ingredients to produce different results in different worlds.

### Brewing recipes

Below 26.2, brewing recipes will still start brewing in disabled worlds but cannot produce a result.

From 26.3 onward, brewing recipes behave the same as crafting table recipes and other recipe types.

### Stonecutting recipes

As a special recipe type, a stonecutting recipe is still visible and selectable in the stonecutter even if it is set to be unavailable in a world, but it cannot actually be crafted.

## Basic Syntax

```yaml
type: <recipe type>
result: '<item ID>'
# ... other recipe fields

enable_worlds: # if omitted, the recipe is available in all worlds
- world
- world_nether
- world_the_end
```