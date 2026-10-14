---
title: Recipe API
---

# Recipe API

## 获取配方

```java
// 通过 NamespacedKey 获取配方
NamespacedKey key = new NamespacedKey("craftorithm", "my_recipe");
Recipe recipe = api.recipe().getRecipe(key);

// 检查配方是否存在
boolean exists = api.recipe().containsRecipe("craftorithm:my_recipe");
```

## 获取配方集合

```java
// 获取所有 Craftorithm 注册的配方
Map<NamespacedKey, Recipe> recipes = api.recipe().getCraftorithmRecipes();

// 获取所有服务器配方（含原版）
Set<NamespacedKey> allRecipes = api.recipe().getServerRecipeKeys();
```

## 按类型获取配方

```java
// 遍历所有 Craftorithm 配方，通过 RecipeType 筛选出指定类型的配方
List<Recipe> shapedRecipes = api.recipe().getCraftorithmRecipes().values().stream()
    .filter(recipe -> api.recipe().getRecipeType(recipe).typeKey().equals("vanilla_shaped"))
    .toList();
```

## 获取配方类型

```java
// 从 Recipe 检测类型
RecipeType type = api.recipe().getRecipeType(recipe);

// 从类型 key 获取类型
RecipeType type = api.recipe().getRecipeType("vanilla_shaped");
```

## 注册配方类型

```java
api.recipe().registerRecipeType(new MyCustomRecipeType());
```

## 配方组

```java
// 获取所有配方组 ID
Collection<String> groups = api.recipe().getRecipeGroups();

// 获取指定配方组
RecipeGroup group = api.recipe().getRecipeGroup("my_group");
```

## 禁用/移除配方

```java
// 禁用配方
api.recipe().disableRecipe(key, true);

// 移除 Craftorithm 配方（recipeId 为配方 id，而非 NamespacedKey）
api.recipe().removeCraftorithmRecipe("my_recipe", true);
```

## 文件名/Key 映射

```java
String fileName = api.recipe().getRecipeFileNameByKey(key);
NamespacedKey key = api.recipe().getRecipeKeyByFileName("my_recipe");
```

## 结果处理器

结果处理器支持用户注册自定义的组件类型, 只需要实现`pers.yufiria.craftorithm.resultprocessor.ComponentProcessorFactory`接口, 并将其注册即可

例如:

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
                //进行一些操作
            }
        };
    }
});
```

对于已有的结果处理器, 也可以添加额外的操作类型, 例如:

```java
LoreProcessorFactory.INSTANCE.handlers().put("random_lore", configurationSection -> new ResultProcessor() {
    @Override
    public String processorName() {
        return LoreProcessorFactory.INSTANCE.componentName();
    }

    @Override
    public void processItem(@Nullable ItemStack sourceItem, @NotNull ItemStack resultItem, @Nullable Player player) {
        //进行一些操作
    }
});
```

## 相关类

| 类 | 说明 |
|----|------|
| `CraftorithmApi` | API 总入口 |
| `RecipeApi` | Recipe API |
| `RecipeType` | 配方类型接口 |
| `RecipeTypeMap` | 类型 ID ↔ 类型映射 |
| `RecipeManager` | 配方管理器 |
