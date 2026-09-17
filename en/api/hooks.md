---
title: Hook Development
---

# Hook Development Guide

## ItemPluginHook Interface

To integrate a custom item plugin with Craftorithm, implement the `ItemPluginHook` interface and the `ItemProvider` interface:

```java
public class MyPluginHook implements ItemPluginHook {
    
    @Override
    public ItemProvider itemProvider() {
        return new MyPluginItemProvider();
    }

    @Override
    public String pluginName() {
        return "MyPlugin";
    }



}
```

```java
public class MyPluginItemProvider implements ItemProvider {

    @Override
    public String namespace() {
        return "myplugin"; // Namespace for item ID prefix
    }

    @Override
    public ItemStack matchItem(String id) {
        // Convert "myplugin:sword" to ItemStack
        return MyPluginAPI.getItem(id);
    }

    @Override
    public NamespacedItemId matchItemId(ItemStack itemStack) {
        // Reverse-lookup item ID from ItemStack
        String id = MyPluginAPI.getItemId(itemStack);
        if (id == null) {
            return null;
        }
        return NamespacedItemId.of(namespace(), id);
    }
}
```

## Registering Hooks

Register during plugin startup:

```java
CraftorithmAPI.INSTANCE.registerItemPluginHook(new MyPluginHook());
```


## Existing Hook Reference

| Module | Description |
|--------|-------------|
| `hook/itemsadder` | ItemsAdder integration (with reload listener) |
| `hook/oraxen` | Oraxen integration (with reload listener) |
| `hook/mythicmobs` | MythicMobs items |
| `hook/mmoitems` | MMOItems items |
| `hook/ecoitems` | EcoItems items |
| `hook/neigeitems` | NeigeItems items |
| `hook/nexo` | Nexo items |
| `hook/azureflow` | AzureFlow items |
| `hook/craftengine` | CraftEngine items |
| `hook/executableitems` | ExecutableItems items |
| `hook/sx-item` | SX-Item items |
| `hook/protocollib` | ProtocolLib fake result preview |
| `hook/packetevents` | PacketEvents fake result preview |

## Notes

- Hook classes are initialized after Craftorithm starts but before recipes load
- `matchItem()` should return `null` if the item is not found
- `matchItemId()` should return `null` if the item does not belong to that plugin
- `matchItemId()` only returns the item ID; item amounts are handled by Craftorithm
- Avoid performing expensive operations in hooks
