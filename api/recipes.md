---
title: Recipe API
---

# Recipe API

## 获取配方

```java
// 通过 NamespacedKey 获取配方
NamespacedKey key = new NamespacedKey("craftorithm", "my_recipe");
Recipe recipe = api.getRecipe(key);

// 检查配方是否存在
boolean exists = api.containsRecipe("craftorithm:my_recipe");
```

## 获取配方集合

```java
// 获取所有 Craftorithm 注册的配方
Map<NamespacedKey, Recipe> recipes = api.getCraftorithmRecipes();

// 获取所有服务器配方（含原版）
Map<NamespacedKey, Recipe> allRecipes = api.getServerRecipes();
```

## 按类型获取配方

```java
// 获取指定类型的所有配方
List<Recipe> shapedRecipes = api.getRecipesByType("vanilla_shaped");

// 获取所有配方类型（按 typeId 排序）
List<RecipeType> types = api.getAllRecipeTypes();
```

## 获取配方类型

```java
// 从 Recipe 检测类型
RecipeType type = api.getRecipeType(recipe);

// 从 typeId 获取类型
RecipeType type = RecipeTypeMap.getTypeById(typeId);
```

## 注册配方类型

```java
api.registerRecipeType(new MyCustomRecipeType());
```

## 禁用/移除配方

```java
// 禁用配方
api.disableRecipe(key, true);

// 移除 Craftorithm 配方
api.removeCraftorithmRecipe(key, true);
```

## 文件名/Key 映射

```java
String fileName = api.getRecipeFileNameByKey(key);
NamespacedKey key = api.getRecipeKeyByFileName("my_recipe");
```

## 相关类

| 类 | 说明 |
|----|------|
| `CraftorithmAPI` | API 入口 |
| `RecipeType` | 配方类型接口 |
| `RecipeTypeMap` | 类型 ID ↔ 类型映射 |
| `RecipeManager` | 配方管理器 |
