---
title: Menu API
---

# Menu API

Since 1.15.2.0, Craftorithm exposes a menu API. Other plugins can use `MenuApi` to open, register or unregister the recipe **creator**, **editor** and **display** menus.

```java
import pers.yufiria.craftorithm.Craftorithm;
import pers.yufiria.craftorithm.api.MenuApi;

MenuApi menuApi = Craftorithm.api().menu();
```

## Menu Factories

Each of the three menu kinds maps to a "menu factory" function whose return type is `crypticlib.ui.menu.Menu`:

| Menu | Factory type | Parameters |
|------|--------------|------------|
| Creator | `TriFunction<Player, String, String, Menu>` | (player, recipeId, recipeFileName) |
| Editor | `TriFunction<Player, NamespacedKey, Recipe, Menu>` | (player, recipeKey, recipe) |
| Display | `BiFunction<Player, Recipe, Menu>` | (player, recipe) |

The recipe id and recipe file name of the creator menu may be `null`.

## Opening Menus

```java
// Open the creator menu of a recipe type (without preset recipe id / file name)
menuApi.openCreator(recipeType, player, null, null);

// Open the editor menu of a recipe type
menuApi.openEditor(recipeType, player, recipeKey, recipe);

// Open the display menu of a recipe type
menuApi.openDisplay(recipeType, player, recipe);
```

> If no factory is registered for the given recipe type, no menu is opened.

## Registering / Unregistering Menus

```java
// Register a creator menu
menuApi.registerCreator(recipeType, (player, recipeId, recipeFileName) -> {
    MyCreator creator = new MyCreator(player, recipeId, recipeFileName);
    creator.openMenu();
    return creator;
});

// Register an editor menu
menuApi.registerEditor(recipeType, (player, recipeKey, recipe) -> {
    MyEditor editor = new MyEditor(player, recipeKey, recipe);
    editor.openMenu();
    return editor;
});

// Register a display menu
menuApi.registerDisplay(recipeType, (player, recipe) -> {
    MyDisplay display = new MyDisplay(player, recipe);
    display.openMenu();
    return display;
});

// Unregister
menuApi.unregisterCreator(recipeType);
menuApi.unregisterEditor(recipeType);
menuApi.unregisterDisplay(recipeType);
```

## Notes

- The factory is invoked by Craftorithm when the menu is opened; the factory itself should call `openMenu()` to open the menu
- Registering a menu for a recipe type that already has one overwrites the existing factory

## Related Classes

| Class | Description |
|-------|-------------|
| `CraftorithmApi` | API entry point |
| `MenuApi` | Menu API |
| `RecipeCreatorManager` | Creator menu routing table |
| `RecipeEditorManager` | Editor menu routing table |
| `RecipeDisplayManager` | Display menu routing table |
