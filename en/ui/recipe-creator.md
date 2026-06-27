---
title: Recipe Creator
---

# Recipe Creator

## Command

```bash
/cra create <type> [recipe_id] [filename]
```

### Parameters

| Parameter | Required | Description                                                                                       |
|-----------|----------|---------------------------------------------------------------------------------------------------|
| `type` | Yes | Recipe type (e.g., `vanilla_shaped`)                                                              |
| `recipe_id` | No | Custom recipe ID (if recipe_id is null, will use filename)                                        |
| `filename` | No | Save filename (if recipe_id is configured, the filename can be any filesystem-allowed characters) |

### Examples

```bash
# Create shaped recipe
/cra create vanilla_shaped

# Specify ID and filename
/cra create vanilla_shaped my_sword weapons.yml

# Create furnace recipe
/cra create vanilla_smelting_furnace
```

## GUI Flow

### Shaped Recipe

1. Open GUI with a 3x3 material grid and result slot
2. Place materials in the grid in the desired shape
3. Place the output item in the result slot
4. Optionally select a recipe book category (misc/building/redstone/equipment)
5. Click the confirm button to save

### Shapeless Recipe

1. Place materials in any material slots
2. Place the output item in the result slot
3. Click confirm

### Smelting Recipe

1. Place the input material
2. Place the output item
3. Set smelting time and experience (via chat input)
4. Click confirm

### Smithing Recipe

1. Place the base item
2. Place the addition material
3. Place the template
4. Place the output item
5. Click confirm

## Save Location

Recipes are automatically saved to `plugins/Craftorithm/recipes/<filename>.yml`.
