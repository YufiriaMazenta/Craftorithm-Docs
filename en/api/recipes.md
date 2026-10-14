---
title: Recipe API
---

# Recipe API

## Getting Recipes

```java
// Get recipe by NamespacedKey
NamespacedKey key = new NamespacedKey("craftorithm", "my_recipe");
Recipe recipe = api.recipe().getRecipe(key);

// Check if recipe exists
boolean exists = api.recipe().containsRecipe("craftorithm:my_recipe");
```

## Getting Recipe Collections

```java
// Get all Craftorithm-registered recipes
Map<NamespacedKey, Recipe> recipes = api.recipe().getCraftorithmRecipes();

// Get all server recipe keys (including vanilla)
Set<NamespacedKey> allRecipes = api.recipe().getServerRecipeKeys();
```

## Getting Recipes by Type

```java
// Iterate all Craftorithm recipes and filter by RecipeType
List<Recipe> shapedRecipes = api.recipe().getCraftorithmRecipes().values().stream()
    .filter(recipe -> api.recipe().getRecipeType(recipe).typeKey().equals("vanilla_shaped"))
    .toList();
```

## Getting Recipe Type

```java
// Detect type from Recipe
RecipeType type = api.recipe().getRecipeType(recipe);

// Get type from typeKey
RecipeType type = api.recipe().getRecipeType("vanilla_shaped");
```

## Registering Recipe Type

```java
api.recipe().registerRecipeType(new MyCustomRecipeType());
```

## Recipe Groups

```java
// Get all recipe group IDs
Collection<String> groups = api.recipe().getRecipeGroups();

// Get a specific recipe group
RecipeGroup group = api.recipe().getRecipeGroup("my_group");
```

## Disabling / Removing Recipes

```java
// Disable a recipe
api.recipe().disableRecipe(key, true);  // true = save to config

// Remove a Craftorithm recipe (recipeId is the recipe id, not a NamespacedKey)
api.recipe().removeCraftorithmRecipe("my_recipe", true);  // true = delete file
```

## Filename / Key Mapping

```java
String fileName = api.recipe().getRecipeFileNameByKey(key);
NamespacedKey key = api.recipe().getRecipeKeyByFileName("my_recipe");
```

## Result Processors

Result processors support registering custom component types. Simply implement the `pers.yufiria.craftorithm.resultprocessor.ComponentProcessorFactory` interface and register it.

Example:

```java
ResultProcessorManager.INSTANCE.registerFactory(new ComponentProcessorFactory() {
    @Override
    public String componentName() {
        return "custom_component";
    }

    @Override
    public ResultProcessor createProcessor(String type, @Nullable ConfigurationSection data) {
        return new ResultProcessor() {
            @Override
            public String processorName() {
                return componentName();
            }

            @Override
            public void processItem(@Nullable ItemStack sourceItem, @NotNull ItemStack resultItem, @Nullable Player player) {
                // Perform custom processing
            }
        };
    }
});
```

For existing result processors, you can also add additional handler types:

```java
LoreProcessorFactory.INSTANCE.handlers().put("random_lore", configurationSection -> new ResultProcessor() {
    @Override
    public String processorName() {
        return LoreProcessorFactory.INSTANCE.componentName();
    }

    @Override
    public void processItem(@Nullable ItemStack sourceItem, @NotNull ItemStack resultItem, @Nullable Player player) {
        // Perform custom processing
    }
});
```

## Related Classes

| Class | Description |
|-------|-------------|
| `CraftorithmApi` | API entry point |
| `RecipeApi` | Recipe API |
| `RecipeType` | Recipe type interface |
| `RecipeTypeMap` | typeId ↔ type mapping |
| `RecipeManager` | Recipe manager |
