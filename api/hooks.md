---
title: 接入自己的物品插件
---

# 接入自己的物品插件

## ItemPluginHook 接口

要将自定义物品插件接入 Craftorithm，需实现 `ItemPluginHook` 接口和 `ItemProvider` 接口：

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
        return "myplugin"; // 命名空间，用于物品 ID 前缀
    }

    @Override
    public ItemStack matchItem(String id) {
        // 将 "myplugin:sword" 转换为 ItemStack
        return MyPluginAPI.getItem(id);
    }

    @Override
    public NamespacedItemId matchItemId(ItemStack itemStack) {
        // 从 ItemStack 反查物品 ID
        String id = MyPluginAPI.getItemId(itemStack);
        if (id == null) {
            return null;
        }
        return NamespacedItemId.of(namespace(), id);
    }
}
```

## 注册 Hook

在插件启动时注册：

```java
CraftorithmAPI.INSTANCE.registerItemPluginHook(new MyPluginHook());
```


## 现有 Hook 参考

Craftorithm 的所有 Hook 实现都位于 `hook` 模块中，可参考其中的实现来编写自己的 Hook。

## 注意事项

- Hook 类在 Craftorithm 启动后、配方加载前初始化
- `matchItem()` 应返回 `null` 表示未找到物品
- `matchItemId()` 应返回 `null` 表示不是该插件的物品
- `matchItemId()` 只负责返回物品 ID，物品数量由 Craftorithm 统一处理
- 避免在 Hook 中执行耗时操作
