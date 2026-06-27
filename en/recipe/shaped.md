---
title: Shaped Recipes
---

# Shaped Recipes

Shaped recipes require materials to be arranged in a specific pattern in the crafting table.

## YAML Example

```yaml
type: 'vanilla_shaped'
result: 'minecraft:diamond_sword'
group: 'weapons'
shape:
  - ' A '
  - ' A '
  - ' B '
ingredients:
  A: 'minecraft:diamond'
  B: 'minecraft:stick'
recipe_book_category: equipment
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `vanilla_shaped` |
| `result` | string | Yes | Output item ID |
| `shape` | list | Yes | 1–3 strings, each 1–3 characters long |
| `ingredients` | map | Yes | Character → item ID mapping |
| `group` | string | No | Recipe group name |
| `recipe_book_category` | string | No | Recipe book category: `misc`, `building`, `redstone`, `equipment` |
| `fake_result_preview` | string | No | Preview item shown in recipe book (different from actual output) |

## Shape Rules

- Minimum 1×1, maximum 3×3
- Each character in a shape row maps to a key in `ingredients`
- A space (` `) means that slot is empty
- Characters are case-sensitive (`a` and `A` are different materials)

### Different Size Examples

```yaml
# 2×2 recipe
shape:
  - 'AB'
  - 'AB'
ingredients:
  A: 'minecraft:iron_ingot'
  B: 'minecraft:stick'

# 1×3 recipe
shape:
  - 'A'
  - 'A'
  - 'B'
ingredients:
  A: 'minecraft:stick'
  B: 'minecraft:string'
```

## Item Packs

Use the `item_pack:` prefix to reference item packs defined in `item_packs.yml`, allowing a recipe to accept multiple material variants:

```yaml
ingredients:
  A: 'item_pack:all_wood'  # Accepts any wood type
```
