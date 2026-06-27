---
title: Stonecutting Recipes
---

# Stonecutting Recipes

Stonecutting recipes are used in the stonecutter to convert one block type into another.

## YAML Example

```yaml
type: 'vanilla_stonecutting'
result: 'minecraft:stone_brick'
ingredient: 'minecraft:stone'
group: 'stonecutting'
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `vanilla_stonecutting` |
| `result` | string | Yes | Output item ID |
| `ingredient` | string | Yes | Input item ID (single item) |
| `group` | string | No | Recipe group name |

## Multiple Outputs

To allow one material to produce multiple outputs, create separate recipe files:

```yaml
# stone_to_bricks.yml
type: 'vanilla_stonecutting'
result: 'minecraft:stone_bricks'
ingredient: 'minecraft:stone'

# stone_to_slab.yml
type: 'vanilla_stonecutting'
result: 'minecraft:stone_slab'
ingredient: 'minecraft:stone'
```
