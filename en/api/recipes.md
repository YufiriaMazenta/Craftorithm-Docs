---
title: Recipe API
---

# Recipe API

## Getting Recipes

```java
// Get recipe by NamespacedKey
NamespacedKey key = new NamespacedKey("craftorithm", "my_recipe");
Recipe recipe = api.getRecipe(key);

// Check if recipe exists
boolean exists = api.containsRecipe("craftorithm:my_recipe");
```

## Getting Recipe Collections

```java
// Get all Craftorithm-registered recipes
Map<NamespacedKey, Recipe> recipes = api.getCraftorithmRecipes();

// Get all server recipes (including vanilla)
Map<NamespacedKey, Recipe> allRecipes = api.getServerRecipes();
```

## Getting Recipes by Type

```java
// Get all recipes of a specific type
List<Recipe> shapedRecipes = api.getRecipesByType("vanilla_shaped");

// Get all recipe types (sorted by typeId)
List<RecipeType> types = api.getAllRecipeTypes();
```

## Getting Recipe Type

```java
// Detect type from Recipe
RecipeType type = api.getRecipeType(recipe);

// Get type from typeKey
RecipeType type = api.getRecipeType("vanilla_shaped");
```

## Registering Recipe Type

```java
api.registerRecipeType(new MyCustomRecipeType());
```

## Disabling / Removing Recipes

```java
// Disable a recipe
api.disableRecipe(key, true);  // true = save to config

// Remove a Craftorithm recipe
api.removeCraftorithmRecipe(key, true);  // true = delete file
```

## Filename / Key Mapping

```java
String fileName = api.getRecipeFileNameByKey(key);
NamespacedKey key = api.getRecipeKeyByFileName("my_recipe");
```

## Related Classes

| Class | Description |
|-------|-------------|
| `CraftorithmAPI` | API entry point |
| `RecipeType` | Recipe type interface |
| `RecipeTypeMap` | typeId ↔ type mapping |
| `RecipeManager` | Recipe manager |
