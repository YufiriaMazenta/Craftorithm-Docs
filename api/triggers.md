---
title: Trigger API
---

# Trigger API

## 获取触发器管理器

```java
TriggerManager manager = api.trigger().getTriggerManager();
```

## 触发事件

```java
// 以指定类型与上下文触发
TriggerType triggerType = manager.getTriggerType("my_trigger_type");
TriggerContext context = new TriggerContext(player, variables);
api.trigger().fireTrigger(triggerType, context);
```

## TriggerContext

```java
// 配方事件上下文
TriggerContext ctx = new TriggerContext(player, recipeKey, recipeType);

// 通用事件上下文
Map<String, ScriptValue> vars = new HashMap<>();
vars.put("damage", new ScriptValue.Num(10.0));
vars.put("entity_type", new ScriptValue.Str("ZOMBIE"));
TriggerContext ctx = new TriggerContext(player, vars);

// 获取变量
ScriptValue val = ctx.getVariable("damage");

// 转换为脚本上下文
ScriptContext scriptCtx = ctx.toScriptContext();
```

## Trigger 数据模型

```java
public class Trigger {
    String id;
    String typeKey;
    List<String> recipes;
    CompiledScript conditionScript;
    CompiledScript actionScript;
    int priority;
    long cooldownMillis;
    boolean perPlayer;
    boolean enabled;
}
```

## 注册触发器类型

实现 `TriggerType` 接口：

```java
public class MyTriggerType implements TriggerType {
    @Override
    public String typeKey() {
        return "my_type";
    }

    @Override
    public Class<? extends Event> eventClass() {
        return MyEvent.class;
    }

    @Override
    public TriggerContext extractContext(Event event) {
        // 从事件中提取上下文
        return new TriggerContext(player, variables);
    }
}
```

## 事件

### RecipeRegisterEvent

配方注册时触发（插件加载、重载、新建或编辑配方都会触发），可取消，取消后该配方不会注册：

```java
@EventHandler
public void onRecipeRegister(RecipeRegisterEvent event) {
    if (event.recipeKey().getKey().equals("my_recipe")) {
        event.setCancelled(true); // 阻止注册
    }
}
```

`reason()` 表示本次注册的原因，可选值为 `RELOAD`（加载或重载）、`NEW_RECIPE`（新建配方）、`EDIT_RECIPE`（编辑配方）。

### CraftorithmReloadDoneEvent

插件重载完成后触发，**在异步线程触发**，需要操作只能在主线程调用的 API 时请自行调度回主线程：

```java
@EventHandler
public void onReloadDone(CraftorithmReloadDoneEvent event) {
    // 重载完成后重新读取插件数据
}
```

## 相关类

| 类 | 说明 |
|----|------|
| `CraftorithmApi` | API 总入口 |
| `TriggerApi` | Trigger API |
| `TriggerManager` | 触发器管理器 |
| `Trigger` | 触发器数据模型 |
| `TriggerContext` | 触发器上下文 |
| `TriggerType` | 触发器类型接口 |
| `ScriptValue` | 脚本值类型 |
| `ScriptContext` | 脚本执行上下文 |
