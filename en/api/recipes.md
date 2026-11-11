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

Implement `ComponentProcessorFactory` and declare the fields and the behaviors it supports in `declareBehaviors`:

```java
api.resultProcessor().registerComponent(new ComponentProcessorFactory() {

    @Override
    public String componentName() {
        return "my_component";
    }

    @Override
    public void declareBehaviors(ComponentRegistrar registrar) {
        registrar.valueType(String.class)
            .getter(meta -> meta.hasDisplayName() ? meta.getDisplayName() : null)
            .setter((meta, value) -> meta.setDisplayName(value))
            .valueReader(data -> ValueProviders.text(data, "value", "", "my_component/value"))
            .behavior(Behaviors.COPY_FROM_SOURCE, ScalarBehaviors.copyFromSource())
            .behavior(Behaviors.ADD, ScalarBehaviors.add())
            .behavior(Behaviors.REMOVE, ScalarBehaviors.remove());
    }
});
```

`valueType` declares the type of value the component handles; the methods that follow all describe that field. `getter` and `setter` declare how the field is read and written, `valueReader` declares where the configured value comes from (it can be omitted for fields that only copy from the source item), and `accepts` restricts which items the field can be written to (omitted means no restriction). With `getter` and `setter` in place, the standard behaviors `copy_from_source`, `add` and `remove` no longer need to be implemented by hand. They must come before the behaviors — leaving either out is reported as an error while loading.

Components that are not built around a single field (`lore`, `enchantments`, `attributes` and the like) skip `valueType(...)` and declare behaviors directly:

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

This returns a `BehaviorRegistrar`, which has no `valueType(...)` to call at compile time. When the key matches a behavior the component declared itself, the externally registered one wins.

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
| `ComponentRegistrar` / `BehaviorRegistrar` | Behavior registrars |
| `FieldDeclaration` | Chained declaration of a field |
| `FieldBinding` | Runtime read/write access to a field |
| `ItemWrapper` | Item wrapper within a processing chain |
