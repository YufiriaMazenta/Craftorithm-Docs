---
title: Hook 开发
---

# Hook 开发指南

## ItemPluginHook 接口

要将自定义物品插件接入 Craftorithm，需实现 `ItemPluginHook` 接口：

```java
public class MyPluginHook implements ItemPluginHook {

    @Override
    public String namespace() {
        return "myplugin"; // 命名空间，用于物品 ID 前缀
    }

    @Override
    public ItemStack matchItem(String id) {
        // 将 "myplugin:sword" 转换为 ItemStack
        return MyPluginAPI.getItem(id);
    }

    @Override
    public String matchItemId(ItemStack itemStack) {
        // 从 ItemStack 反查物品 ID
        String id = MyPluginAPI.getItemId(itemStack);
        return id != null ? "myplugin:" + id : null;
    }
}
```

## 注册 Hook

在插件启动时注册：

```java
CraftorithmAPI.INSTANCE.registerItemPluginHook(new MyPluginHook());
```

## 模块结构

如果作为独立 Gradle 子模块开发，参考 `hook/` 目录下的现有实现：

```
hook/
├── myplugin/
│   ├── build.gradle.kts
│   └── src/main/java/.../MyPluginHook.java
```

在 `settings.gradle.kts` 中添加子项目：

```kotlin
include(":hook:myplugin")
```

## 现有 Hook 参考

| 模块 | 说明 |
|------|------|
| `hook/itemsadder` | ItemsAdder 集成（含重载监听） |
| `hook/oraxen` | Oraxen 集成（含重载监听） |
| `hook/mythicmobs` | MythicMobs 物品 |
| `hook/mmoitems` | MMOItems 物品 |
| `hook/ecoitems` | EcoItems 物品 |
| `hook/neigeitems` | NeigeItems 物品 |
| `hook/nexo` | Nexo 物品 |
| `hook/azureflow` | AzureFlow 物品 |
| `hook/craftengine` | CraftEngine 物品 |
| `hook/executableitems` | ExecutableItems 物品 |
| `hook/sx-item` | SX-Item 物品 |
| `hook/protocollib` | ProtocolLib 假结果预览 |
| `hook/packetevents` | PacketEvents 假结果预览 |

## 注意事项

- Hook 类在 Craftorithm 启动后、配方加载前初始化
- `matchItem()` 应返回 `null` 表示未找到物品
- `matchItemId()` 应返回 `null` 表示不是该插件的物品
- 避免在 Hook 中执行耗时操作
