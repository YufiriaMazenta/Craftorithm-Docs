---
title: Configuration
---

# Configuration Overview

## File List

| File | Location | Purpose | Hot Reload |
|------|----------|---------|------------|
| `config.yml` | Root | Main configuration | Yes |
| `recipes/*.yml` | `recipes/` | Recipe definitions | Yes |
| `triggers/*.yml` | `triggers/` | Trigger definitions | Yes |
| `items/*.yml` | `items/` | Custom items | Yes |
| `menus/custom/*.yml` | `menus/custom/` | Custom menus | Yes |
| `item_packs.yml` | Root | Item packs | Yes |
| `custom_fuels.yml` | Root | Custom fuels | Yes |
| `disabled_recipes.yml` | Root | Disabled recipes list | Yes |
| `lang/*.yml` | `lang/` | Language files | Yes |

## Hot Reload

Use `/cra reload` to reload most configurations without restarting the server.

## Directory Structure

```
plugins/Craftorithm/
├── config.yml
├── item_packs.yml
├── custom_fuels.yml
├── disabled_recipes.yml
├── recipes/
├── triggers/
├── items/
├── menus/
│   ├── custom/
│   └── internal/       # Built-in menus (do not edit manually)
└── lang/
```

## Loading Order

1. `config.yml` — Main configuration
2. `lang/` — Language files
3. `items/` — Custom items
4. `item_packs.yml` — Item packs
5. `custom_fuels.yml` — Custom fuels
6. `recipes/` — Recipe files
7. `disabled_recipes.yml` — Disabled list
8. `triggers/` — Triggers
9. `menus/` — Menu configurations
