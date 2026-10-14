---
title: Menu API
---

# Menu API

自 1.15.2.0 起，Craftorithm 开放了界面（Menu）相关的 API。其他插件可以通过 `MenuApi` 打开、注册或注销配方**创建（creator）**、**编辑（editor）**、**展示（display）**三类界面。

```java
import pers.yufiria.craftorithm.Craftorithm;
import pers.yufiria.craftorithm.api.MenuApi;

MenuApi menuApi = Craftorithm.api().menu();
```

## 界面工厂

三类界面各自对应一个「界面工厂」函数，返回类型为 `crypticlib.ui.menu.Menu`：

| 界面 | 工厂类型 | 参数 |
|------|---------|------|
| 创建 creator | `TriFunction<Player, String, String, Menu>` | (玩家, 配方id, 配方文件名) |
| 编辑 editor | `TriFunction<Player, NamespacedKey, Recipe, Menu>` | (玩家, 配方key, 配方) |
| 展示 display | `BiFunction<Player, Recipe, Menu>` | (玩家, 配方) |

创建界面的配方 id 与配方文件名均可为 `null`。

## 打开界面

```java
// 打开某个配方类型的创建界面（不预设配方 id 与文件名）
menuApi.openCreator(recipeType, player, null, null);

// 打开某个配方类型的编辑界面
menuApi.openEditor(recipeType, player, recipeKey, recipe);

// 打开某个配方类型的展示界面
menuApi.openDisplay(recipeType, player, recipe);
```

> 若该配方类型未注册对应的界面工厂，则不会打开任何界面。

## 注册 / 注销界面

```java
// 注册创建界面
menuApi.registerCreator(recipeType, (player, recipeId, recipeFileName) -> {
    MyCreator creator = new MyCreator(player, recipeId, recipeFileName);
    creator.openMenu();
    return creator;
});

// 注册编辑界面
menuApi.registerEditor(recipeType, (player, recipeKey, recipe) -> {
    MyEditor editor = new MyEditor(player, recipeKey, recipe);
    editor.openMenu();
    return editor;
});

// 注册展示界面
menuApi.registerDisplay(recipeType, (player, recipe) -> {
    MyDisplay display = new MyDisplay(player, recipe);
    display.openMenu();
    return display;
});

// 注销
menuApi.unregisterCreator(recipeType);
menuApi.unregisterEditor(recipeType);
menuApi.unregisterDisplay(recipeType);
```

## 注意事项

- 界面工厂由 Craftorithm 在打开界面时调用，工厂内应自行调用 `openMenu()` 打开界面
- 为同一配方类型重复注册界面会覆盖原有的界面工厂

## 相关类

| 类 | 说明 |
|----|------|
| `CraftorithmApi` | API 总入口 |
| `MenuApi` | 界面 API |
| `RecipeCreatorManager` | 创建界面路由表 |
| `RecipeEditorManager` | 编辑界面路由表 |
| `RecipeDisplayManager` | 展示界面路由表 |
