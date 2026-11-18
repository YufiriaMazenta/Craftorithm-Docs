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

## Saving All Components of the Result Item

A book icon in the menu toggles "Save all components of the result item". The toggle is off by default.

When enabled, saving writes every component of the result item into the built-in item provider instead of reusing item IDs from other item plugins. Vanilla items without component data still use the vanilla item ID.

The toggle is not persisted and starts off every time the menu opens.

## Auto-discovering the Recipe Book

A knowledge book icon in the menu toggles "Auto-discover recipe book". The menu reads the recipe's current `auto_discover` value when it opens.

When enabled, saving writes `auto_discover: true`, so the recipe is automatically discovered for players when they join, after a plugin reload completes, and when the recipe is edited.

Unlike "Save all components of the result item", this toggle is saved with the recipe.

## Notes

- Only Craftorithm-registered recipes can be edited
- Recipes are automatically reloaded after saving
- The original recipe file is overwritten
- Deleting a recipe also removes its recipe file; the action cannot be undone
- Optionally select a recipe book category
