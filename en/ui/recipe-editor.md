---
title: Recipe Editor
---

# Recipe Editor

## Command

```bash
/cra edit <recipe_key>
```

### Examples

```bash
/cra edit craftorithm:my_sword
```

## Editing

1. Open GUI displaying the current recipe's ingredients and result
2. Modify ingredients or result
3. Click the save button to overwrite the original file
4. Click the delete button to delete the recipe currently being edited (requires the `craftorithm.recipe.remove` permission)

## Notes

- Only Craftorithm-registered recipes can be edited
- Recipes are automatically reloaded after saving
- The original recipe file is overwritten
- Deleting a recipe also removes its recipe file; the action cannot be undone
- Optionally select a recipe book category
