---
title: UI System
---

# UI System Overview

Craftorithm provides a graphical interface system with recipe creation, editing, browsing, and custom menu functionality.

## Subsystems

| Subsystem | Description | Command |
|-----------|-------------|---------|
| Recipe Creator | Create recipes visually | `/cra create <type>` |
| Recipe Editor | Edit existing recipes | `/cra edit <recipe_id>` |
| Recipe Book | Browse all recipes | `/cra recipebook` |
| Custom Menus | YAML-defined custom interfaces | `/cra openmenu <name>` |

## Supported Recipe Types

10 recipe types have corresponding GUI interfaces:

- Shaped / Shapeless: drag-and-drop material slots
- Smelting: single input + time/exp settings
- Smithing: base + addition + template
- Brewing: input + ingredient
- Anvil: base + addition + cost_level
- Stonecutting: single input

## Permissions

| Feature | Permission |
|---------|-----------|
| Create recipe | `craftorithm.command.create` |
| Edit recipe | `craftorithm.edit_recipe` |
| Recipe book | `craftorithm.command.recipebook` |
| Custom menu | `craftorithm.command.openmenu` |
