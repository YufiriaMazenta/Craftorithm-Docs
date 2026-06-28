---
title: Shapeless Recipes
---

# Shapeless Recipes

Shapeless recipes do not require materials to be placed in a specific pattern. Players can put materials in any slot of the crafting table.

## YAML Example

```yaml
type: 'vanilla_shapeless'
result: 'minecraft:magenta_dye'
group: 'dye'
ingredients:
  - 'minecraft:red_dye'
  - 'minecraft:blue_dye'
recipe_book_category: misc
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `vanilla_shapeless` |
| `result` | string | Yes | Output item ID |
| `ingredients` | list | Yes | List of item IDs (order does not matter) |
| `group` | string | No | Recipe group name |
| `recipe_book_category` | string | No | Recipe book category |
| `fake_result_preview` | string | No | Fake preview item shown during crafting |

## Difference from Shaped Recipes

- No `shape` field
- `ingredients` is a list instead of a map
- Materials can be placed in any crafting table slot

## Material Limits

- Minimum 1, maximum 9 materials
- The number of items in the list equals the number of required materials

```yaml
# Requires 3 different materials
ingredients:
  - 'minecraft:iron_ingot'
  - 'minecraft:gold_ingot'
  - 'minecraft:diamond'
```
