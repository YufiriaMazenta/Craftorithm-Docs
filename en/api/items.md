---
title: Item API
---

# Item API

## Getting Items

```java
// Get Craftorithm custom item by name
ItemStack item = api.item().getCraftorithmItem("my_item");

// Get via NamespacedItemIdStack
NamespacedItemIdStack idStack = new NamespacedItemIdStack(NamespacedItemId.of("craftorithm", "my_item"), 1);
Optional<ItemStack> item = api.item().getItem(idStack);

// Get with player context (supports PAPI variables)
Optional<ItemStack> item = api.item().getItem(idStack, player);
```

## Matching Item ID

```java
// Reverse-lookup item ID from ItemStack
Optional<NamespacedItemIdStack> idStack = api.item().matchItemId(itemStack, false);
// Returns an ID like "craftorithm:my_item" or "minecraft:diamond"
```

## Getting All Custom Items

```java
Map<String, ItemStack> items = api.item().getCraftorithmItems();
```

## Registering Item Plugin Hook

```java
api.item().registerItemPluginHook(new MyItemPluginHook());
```

## Related Classes

| Class | Description |
|-------|-------------|
| `CraftorithmApi` | API entry point |
| `ItemApi` | Item API |
| `NamespacedItemId` | Namespaced item ID (namespace + itemId) |
| `NamespacedItemIdStack` | ID + amount |
| `ItemPack` | Item pack |
| `ItemProvider` | Item provider interface |
| `ItemManager` | Central item manager |
