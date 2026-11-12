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

`result_processors` 的扩展入口是 `api.resultProcessor()`。两种扩展方式，写法是一样的：**拿到注册器，用 `behavior(key, 实现)` 声明行为**。

### 新增一个组件

实现 `ComponentProcessorFactory`，在 `declareBehaviors` 里声明支持的行为，读写方式由行为自己给出：

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

`copyFromSource` 要一个读法（返回 `null` 表示源物品没有这个值）和一个写法，`add` 要写法与取值方式，`remove` 只要写法（收到 `null`）。`ScalarBehaviors` 只是把这几段 lambda 组装成行为，读写逻辑始终在组件手里。

不需要这些工具时，行为可以直接用 `context.processor(...)` 自己读写物品：

```java
registrar.behavior(Behaviors.ADD, (context, data) ->
    context.processor((sourceItem, resultItem, player) -> {
        // 自行读写 resultItem
    })
);
```
```

### 给已有组件追加行为

```java
api.resultProcessor()
    .component("lore")
    .behavior("shuffle", (context, data) -> context.requireSource((sourceItem, resultItem, player) -> {
        // 自行实现
    }));
```

拿到的是 `BehaviorRegistrar`，与组件在 `declareBehaviors` 里收到的是同一个类型。与组件自身声明的行为同名时，外部注册的优先。

### 处理方法的参数

`context.processor(...)` 和 `context.requireSource(...)` 收到的都是 `(源物品, 结果物品, 玩家)`，两个物品都是 `ItemWrapper`：

| 参数 | 说明 |
|------|------|
| `sourceItem` | 源物品，**只读**；工作台配方下为 `null` |
| `resultItem` | 结果物品，可改 |
| `player` | 触发合成的玩家，可能为 `null` |

- `requireSource(...)` 与 `processor(...)` 唯一的区别是：源物品为 `null` 时直接跳过，不用自己判空
- 源物品上调用 `edit` / `setMeta` / `apply` 会抛异常，因为源物品不参与写回
- 结果物品的改动在处理链结束时统一写回，处理器里**不要**自己调用 `setItemMeta`
- 需要真实 `ItemStack` 的第三方 API，用 `resultItem.snapshot()` 取带当前改动的副本

### 注册时机

配方在加载时就会实例化处理器，所以扩展内容必须在配方加载前注册完成。建议放在 `onLoad()` 里，并在 `plugin.yml` 声明 `softdepend: [Craftorithm]`。

## 相关类

| 类 | 说明 |
|----|------|
| `CraftorithmApi` | API 总入口 |
| `RecipeApi` | Recipe API |
| `ResultProcessorApi` | 结果处理器扩展入口 |
| `RecipeType` | 配方类型接口 |
| `RecipeTypeMap` | 类型 ID ↔ 类型映射 |
| `RecipeManager` | 配方管理器 |
| `ComponentProcessorFactory` | 结果处理器组件 |
| `BehaviorRegistrar` | 行为注册器 |
| `ItemWrapper` | 处理链内的物品包装 |
