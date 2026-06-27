---
title: Custom Items
---

# Custom Items

## Saving Items

1. Hold the item you want to save
2. Run the command:

```bash
/cra item save <file> <id>
```

Example:

```bash
/cra item save weapons epic_sword
```

The item will be saved to `plugins/Craftorithm/items/weapons.yml` with ID `craftorithm:epic_sword`.

## Giving Items

```bash
/cra item give <item> [player]
```

Example:

```bash
/cra item give craftorithm:epic_sword PlayerName
```

## Item File Format

Item definition files are located in `plugins/Craftorithm/items/`:

## Referencing in Recipes

```yaml
type: 'vanilla_shaped'
result: 'craftorithm:epic_sword'
shape:
  - ' A '
  - ' B '
  - ' A '
ingredients:
  A: 'minecraft:diamond'
  B: 'minecraft:stick'
```
