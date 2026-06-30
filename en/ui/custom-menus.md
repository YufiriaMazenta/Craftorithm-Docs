---
title: Custom Menus
---

# Custom Menus

Craftorithm supports creating custom menu interfaces through YAML configuration files.

## File Location

`plugins/Craftorithm/menus/custom/`

## YAML Structure

```yaml
title: '&aRecipe List'
layout:
  - '#########'
  - 'ABCDEFGHI'
  - '#########'
open_actions:
  - 'tell("hello world!")'
close_actions:
  - 'tell("bye bye!")'
permission: 'craftorithm.ui.recipe_list'
icons:
  '#':
    material: 'minecraft:green_stained_glass_pane'
    name: '&aFrame'
  A:
    icon_type: recipe_display
    recipe_id: 'craftorithm:my_recipe'
    view_click: left
    edit_click: right
```

## Fields

### title — Menu Title

Supports special tags:
- `<translate:lang:key>` — Multi-language translation

### layout — Grid Layout

- Each character in the layout string maps to a key in `icons`
- A space means the slot is empty
- Maximum 6 rows (54 slots)

### open_actions / close_actions — Script Actions

Actions executed when the menu opens/closes:

```yaml
open_actions:
  - 'tell("&aWelcome")'
close_actions:
  - 'tell("&7Menu closed")'
```

### permission — Permission

The permission node required to open the menu.

## Icon Configuration

Each icon supports the following fields:

| Field | Description |
|-------|-------------|
| `material` | Item material |
| `name` | Display name |
| `lore` | Lore lines list |
| `custom_model_data` | Custom model data |
| `item_model` | Custom item model (1.21.2+) |
| `icon_type` | Icon type (see below) |
| `recipe_id` | Associated recipe ID |
| `recipe_type` | Associated recipe type |
| `ingredient_slot` | Ingredient slot index |
| `view_click` | View click action (left/right) |
| `edit_click` | Edit click action (left/right) |

## icon_type Values

| Type | Description |
|------|-------------|
| (empty) | Normal item icon |
| `recipe_display` | Recipe display icon |

## Full Example

```yaml
title: '&6Custom Recipe List'
permission: 'craftorithm.ui.my_list'
layout:
  - '#########'
  - '#ABCD EF#'
  - '#GHIJ KL#'
  - '#MNOP QR#'
  - '#########'
  - '   <N>  '
icons:
  '#':
    material: 'minecraft:gold_block'
    name: '&6Frame'
  A:
    icon_type: recipe_display
    recipe_id: 'craftorithm:recipe1'
  B:
    icon_type: recipe_display
    recipe_id: 'craftorithm:recipe2'
open_actions:
  - 'tell("&6Welcome to the recipe list!")'
```

## Opening Custom Menus

```bash
/cra openmenu <name>
/cra openmenu <name> <player>
```