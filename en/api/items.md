---
title: Item API
---

# Item API

## Getting Items

```java
// Get Craftorithm custom item by name
ItemStack item = api.getCraftorithmItem("my_item");

// Get via NamespacedItemIdStack
NamespacedItemIdStack idStack = new NamespacedItemIdStack("craftorithm", "my_item", 1);
ItemStack item = api.getItem(idStack);

// Get with player context (supports PAPI variables)
ItemStack item = api.getItem(idStack, player);
```

## Matching Item ID

```java
// Reverse-lookup item ID from ItemStack
String itemId = api.matchItemId(itemStack, false);
// Returns format like "craftorithm:my_item" or "minecraft:diamond"
```

## Getting All Custom Items

```java
Map<String, ItemStack> items = api.getCraftorithmItems();
```

## Registering Item Plugin Hook

```java
api.registerItemPluginHook(new MyItemPluginHook());
```

## Related Classes

| Class | Description |
|-------|-------------|
| `CraftorithmAPI` | API entry point |
| `NamespacedItemId` | Namespaced item ID (namespace + itemId) |
| `NamespacedItemIdStack` | ID + amount |
| `ItemPack` | Item pack |
| `ItemProvider` | Item provider interface |
| `ItemManager` | Central item manager |
