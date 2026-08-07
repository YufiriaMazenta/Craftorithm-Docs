---
title: Recipe System
---

# Recipe System Overview

Craftorithm supports 12 recipe types, covering all crafting methods in Minecraft.

## Supported Recipe Types

| Type | Description | Config `type` value |
|------|-------------|---------------------|
| Shaped Recipe | Crafting table with shape | `vanilla_shaped` |
| Shapeless Recipe | Crafting table without shape | `vanilla_shapeless` |
| Furnace Smelting | Furnace smelting | `vanilla_smelting_furnace` |
| Blast Furnace | Blast furnace smelting | `vanilla_smelting_blast` |
| Smoker | Smoker cooking | `vanilla_smelting_smoker` |
| Campfire | Campfire cooking | `vanilla_smelting_campfire` |
| Smithing Transform | Smithing table equipment upgrade | `vanilla_smithing_transform` |
| Smithing Trim | Smithing table trim decoration (1.20+) | `vanilla_smithing_trim` |
| Stonecutting | Stonecutter processing | `vanilla_stonecutting` |
| Brewing | Potion brewing (Paper only) | `vanilla_brewing` |
| Anvil | Anvil crafting | `anvil` |

## Recipe Files

- Location: `plugins/Craftorithm/recipes/`
- Format: YAML
- Namespace: filename becomes the recipe namespace, e.g. `my_recipe.yml` → `craftorithm:my_recipe`
- Use the `recipe_id` field to specify a recipe ID different from the filename

## Common Fields

All recipe types share these fields:

```yaml
type: 'vanilla_shaped'      # Recipe type (required)
result: 'minecraft:diamond'  # Output item (required)
group: 'example'             # Recipe group (optional)
recipe_id: 'my_recipe'       # Custom recipe ID (optional, defaults to filename)
result_processors:           # Result processors (optional, 1.13.0.0+)
  enchantments:
    type: copy_from_source
```

## Item Reference Formats

When specifying items in recipes, the following formats are supported:

| Format | Example | Description |
|--------|---------|-------------|
| Vanilla item | `minecraft:diamond` | Minecraft vanilla item ID |
| Item pack | `item_pack:ores` | References an item pack defined in `item_packs.yml` |
| Custom item | `craftorithm:my_item` | References a custom item from the `items/` directory |
| External plugin item | `itemsadder:my_item` | References an item from an external item plugin |

## Creation Methods

### GUI Creation (Recommended for Beginners)

```
/cra create <type> [recipe_id] [filename]
```

Opens a graphical interface to create recipes through click-based interaction.

### Manual YAML (Recommended for Advanced Users)

Create YAML files directly in the `recipes/` directory. Best for batch creation or precise control.

## Result Processors (result_processors)

The result processor feature was added in version 1.13.0.0 to add additional effects to recipe results during crafting. Result processors can copy, add, or remove item components.

For detailed usage, see [Result Processors](/en/recipe/result-processor.md).
