---
title: Disabled Recipes
---

# Disabled Recipes

## Configuration File

`plugins/Craftorithm/disabled_recipes.yml`

## Format

```yaml
recipes:
  - 'minecraft:diamond_sword'
  - 'minecraft:golden_apple'
  - 'minecraft:enchanted_golden_apple'
  - 'craftorithm:some_recipe'
```

## Recipe ID Format

- Vanilla recipes: `minecraft:<recipe_key>`
- Craftorithm recipes: `craftorithm:<filename>`
- Other plugin recipes: `namespace:<key>`

## Methods

### Command (Recommended)

```bash
/cra disable <recipe_id>
```

The command automatically adds the recipe to this file.

### Manual Edit

Edit `disabled_recipes.yml` directly, then run `/cra reload`.

## How It Works

- Loaded automatically on server startup
- Reloaded on `/cra reload`
- Disabled recipes are removed from the recipe registry; the recipe definition files are not affected
