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

```yaml
# weapons.yml
epic_sword:
  material: 'minecraft:diamond_sword'
  name: '&6Epic Sword'
  lore:
    - '&7A legendary weapon'
    - '&cAttack +100'
  enchantments:
    - 'sharpness:5'
    - 'fire_aspect:2'
  unbreakable: true
  custom_model_data: 1001
  amount: 1
```

## Supported Fields

| Field | Type | Description |
|-------|------|-------------|
| `material` | string | Base item material |
| `name` | string | Display name (supports color codes) |
| `lore` | list\<string\> | Lore lines |
| `enchantments` | list\<string\> | Enchantment list (`enchantment:level`) |
| `unbreakable` | boolean | Whether unbreakable |
| `custom_model_data` | integer | Custom model data for resource packs |
| `amount` | integer | Stack size |
| `flags` | list | Item flags |

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
