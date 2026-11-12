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

The extension entry point for `result_processors` is `api.resultProcessor()`. There are two kinds of extension, and both are written the same way: **get a registrar, then declare behaviors with `behavior(key, impl)`**.

### Adding a component

Implement `ComponentProcessorFactory` and declare the behaviors it supports in `declareBehaviors`; how to read and write is given by each behavior:

```java
api.resultProcessor().registerComponent(new ComponentProcessorFactory() {

    @Override
    public String componentName() {
        return "my_component";
    }

    @Override
    public void declareBehaviors(BehaviorRegistrar registrar) {
        BiConsumer<ItemMeta, String> setter = (meta, value) -> meta.setDisplayName(value);
        registrar.behavior(Behaviors.COPY_FROM_SOURCE, ScalarBehaviors.copyFromSource(
                    meta -> meta.hasDisplayName() ? meta.getDisplayName() : null, setter))
                .behavior(Behaviors.ADD, ScalarBehaviors.add(
                    setter, data -> ValueProviders.text(data, "value", "", "my_component/value")))
                .behavior(Behaviors.REMOVE, ScalarBehaviors.remove(setter));
    }
});
```

`copyFromSource` takes a reader (returning `null` means the source item has no such value) and a writer, `add` takes the writer and where the configured value comes from, and `remove` only needs the writer (it receives `null`). `ScalarBehaviors` merely assembles these lambdas into a behavior — the read/write logic always stays with the component.

When you don't need those helpers, a behavior can read and write the item directly through `context.processor(...)`:

```java
registrar.behavior(Behaviors.ADD, (context, data) ->
    context.processor((sourceItem, resultItem, player) -> {
        // Read and write resultItem yourself
    })
);
```

### Adding behaviors to an existing component

```java
api.resultProcessor()
    .component("lore")
    .behavior("shuffle", (context, data) -> context.requireSource((sourceItem, resultItem, player) -> {
        // Your implementation
    }));
```

This returns a `BehaviorRegistrar`, the same type a component receives in `declareBehaviors`. When the key matches a behavior the component declared itself, the externally registered one wins.

### Processor arguments

Both `context.processor(...)` and `context.requireSource(...)` receive `(sourceItem, resultItem, player)`, and both items are `ItemWrapper`:

| Argument | Description |
|----------|-------------|
| `sourceItem` | Source item, **read-only**; `null` for crafting table recipes |
| `resultItem` | Result item, writable |
| `player` | The player who triggered the craft, may be `null` |

- The only difference between `requireSource(...)` and `processor(...)` is that the former skips when the source item is `null`, so you do not have to null-check
- Calling `edit` / `setMeta` / `apply` on the source item throws, because the source item is never written back
- Changes to the result item are written back once at the end of the processing chain — do **not** call `setItemMeta` yourself inside a processor
- For third-party APIs that need a real `ItemStack`, use `resultItem.snapshot()` to get a copy carrying the changes made so far

### Registration timing

Processors are instantiated while recipes load, so any extension has to be registered before that. Put the registration in `onLoad()` and declare `softdepend: [Craftorithm]` in `plugin.yml`.

## Related Classes

| Class | Description |
|-------|-------------|
| `CraftorithmApi` | API entry point |
| `RecipeApi` | Recipe API |
| `ResultProcessorApi` | Result processor extension entry |
| `RecipeType` | Recipe type interface |
| `RecipeTypeMap` | typeId ↔ type mapping |
| `RecipeManager` | Recipe manager |
| `ComponentProcessorFactory` | Result processor component |
| `BehaviorRegistrar` | Behavior registrar |
| `ItemWrapper` | Item wrapper within a processing chain |
