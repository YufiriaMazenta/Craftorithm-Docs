---
title: Smelting Recipes
---

# Smelting Recipes

Smelting recipes support 4 device types: furnace, blast furnace, smoker, and campfire.

## Types

| Type | Device | Default Time (ticks) |
|------|--------|---------------------|
| `vanilla_smelting_furnace` | Furnace | 200 |
| `vanilla_smelting_blast` | Blast Furnace | 100 |
| `vanilla_smelting_smoker` | Smoker | 100 |
| `vanilla_smelting_campfire` | Campfire | 100 |

## YAML Example

```yaml
type: 'vanilla_smelting_furnace'
result: 'minecraft:diamond'
ingredient: 'minecraft:bedrock'
exp: 1.0
time: 200
group: 'smelting'
recipe_book_category: misc
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | One of the 4 types listed above |
| `result` | string | Yes | Output item ID |
| `ingredient` | string | Yes | Input item ID (single item) |
| `exp` | number | No | Smelting experience reward, default `0` |
| `time` | integer | No | Smelting time in ticks, default depends on device type |
| `group` | string | No | Recipe group name |
| `recipe_book_category` | string | No | Recipe book category: `food`, `blocks`, `misc` |

## Experience and Time

- **Experience (`exp`)**: Experience points given to the player after smelting completes. Supports decimals.
- **Time (`time`)**: Unit is ticks (20 ticks = 1 second)
  - Furnace default: 200 ticks (10 seconds)
  - Blast furnace / Smoker / Campfire default: 100 ticks (5 seconds)

## Four Device Types

```yaml
# Furnace — most versatile, slowest
type: 'vanilla_smelting_furnace'

# Blast Furnace — ores only, 2× speed
type: 'vanilla_smelting_blast'

# Smoker — food only, 2× speed
type: 'vanilla_smelting_smoker'

# Campfire — food only, no experience
type: 'vanilla_smelting_campfire'
```
