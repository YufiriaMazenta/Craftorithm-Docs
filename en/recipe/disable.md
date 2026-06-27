---
title: Disabling Recipes
---

# Disabling Recipes

Craftorithm supports disabling any recipe, including vanilla recipes and recipes registered by other plugins.

## Method 1: Command

```bash
/cra disable <recipe_id>
```

Examples:

```bash
# Disable the vanilla diamond sword recipe
/cra disable minecraft:diamond_sword

# Disable a Craftorithm recipe
/cra disable craftorithm:my_recipe
```

Disabled recipes are automatically recorded in `disabled_recipes.yml`.

## Method 2: Edit Config File

Edit `plugins/Craftorithm/disabled_recipes.yml`:

```yaml
recipes:
  - 'minecraft:diamond_sword'
  - 'minecraft:golden_apple'
  - 'minecraft:enchanted_golden_apple'
```

## Notes

- Disabled recipes take effect on server startup or `/cra reload`
- Disabling ≠ deleting: disabling only removes the recipe registration, it does not affect the recipe definition file
- Craftorithm-registered recipes can also be disabled
- Recipes disabled via `/cra disable` are automatically written to `disabled_recipes.yml`
