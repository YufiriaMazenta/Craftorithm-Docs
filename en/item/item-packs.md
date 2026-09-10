---
title: Item Packs
---

# Item Packs

Item packs allow grouping multiple items into a collection. In recipes, they accept any item from the pack as an ingredient.

Their functionality is similar to item tags, but they are customizable.

## Definition File

`plugins/Craftorithm/item_packs.yml`:

```yaml
all_wood:
  - 'minecraft:oak_planks'
  - 'minecraft:spruce_planks'
  - 'minecraft:birch_planks'
  - 'minecraft:jungle_planks'
  - 'minecraft:acacia_planks'
  - 'minecraft:dark_oak_planks'
  - 'minecraft:mangrove_planks'
  - 'minecraft:cherry_planks'
  - 'minecraft:bamboo_planks'

ores:
  - 'minecraft:diamond'
  - 'minecraft:emerald'
  - 'minecraft:iron_ingot'
  - 'minecraft:gold_ingot'
```

Item packs can also include tags or other item packs defined above them:

```yaml
pack1:
  - 'minecraft:stone'
pack2:
  - 'item_pack:pack1'
  - 'tag:minecraft:leaves'
```

## Using in Recipes

Reference item packs with the `item_pack:<name>` prefix:

```yaml
type: 'vanilla_shaped'
result: 'minecraft:crafting_table'
shape:
  - 'AA'
  - 'AA'
ingredients:
  A: 'item_pack:all_wood'  # Accepts any wood type
```

## Use Cases

- **Multi-material compatibility**: One recipe accepts multiple variants of the same material (e.g., all wool colors, all wood types)
- **Simplified configuration**: Avoids creating separate recipes for each material variant
- **Easy maintenance**: Adding a new material only requires one line in the item pack

## Notes

- Item packs are only valid in input fields (`ingredient`, `base`, `addition`, etc.)
- The `result` (output) field does **not** support item packs
- Items in the pack must be valid vanilla IDs or registered external plugin items
