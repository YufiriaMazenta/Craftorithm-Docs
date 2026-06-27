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
- `<page>` / `<max_page>` — Pagination info

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

| Field | Type | Description |
|-------|------|-------------|
| `material` | string | Item material |
| `name` | string | Display name |
| `lore` | list\<string\> | Lore lines |
| `custom_model_data` | integer | Custom model data |
| `icon_type` | string | Icon type (see below) |
| `recipe_id` | string | Associated recipe ID |
| `recipe_type` | string | Associated recipe type |
| `ingredient_slot` | integer | Ingredient slot index |
| `view_click` | string | View click action (left/right) |
| `edit_click` | string | Edit click action (left/right) |
| `extra_lore` | list\<string\> | Dynamic appended lore lines |

## icon_type Values

| Type | Description |
|------|-------------|
| (empty) | Normal item icon |
| `recipe_display` | Recipe display icon |
| `recipe_list` | Recipe list entry |
| `sort` | Sort toggle button |
| `prev_page` | Previous page button |
| `next_page` | Next page button |
| `back` | Back button |
| `result` | Recipe result icon |

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
  N:
    icon_type: next_page
    material: 'minecraft:arrow'
    name: '&aNext Page'
open_actions:
  - 'tell("&6Welcome to the recipe list!")'
```

## Opening Custom Menus

```bash
/cra openmenu <name>
/cra openmenu <name> <player>
```
