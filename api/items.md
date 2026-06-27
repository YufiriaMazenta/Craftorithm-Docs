---
title: Item API
---

# Item API

## 获取物品

```java
// 通过名称获取 Craftorithm 自定义物品
ItemStack item = api.getCraftorithmItem("my_item");

// 通过 NamespacedItemIdStack 获取
NamespacedItemIdStack idStack = new NamespacedItemIdStack("craftorithm", "my_item", 1);
ItemStack item = api.getItem(idStack);

// 带玩家上下文获取（支持 PAPI 变量）
ItemStack item = api.getItem(idStack, player);
```

## 匹配物品 ID

```java
// 从 ItemStack 反查物品 ID
String itemId = api.matchItemId(itemStack, false);
// 返回格式如 "craftorithm:my_item" 或 "minecraft:diamond"
```

## 获取所有自定义物品

```java
Map<String, ItemStack> items = api.getCraftorithmItems();
```

## 注册物品插件 Hook

```java
api.registerItemPluginHook(new MyItemPluginHook());
```

## 相关类

| 类 | 说明 |
|----|------|
| `CraftorithmAPI` | API 入口 |
| `NamespacedItemId` | 命名空间物品 ID |
| `NamespacedItemIdStack` | ID + 数量 |
| `ItemPack` | 物品组 |
