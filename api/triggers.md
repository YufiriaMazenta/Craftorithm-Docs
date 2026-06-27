---
title: Trigger API
---

# Trigger API

## 获取触发器管理器

```java
TriggerManager manager = api.getTriggerManager();
```

## 触发事件

```java
// 以指定类型和上下文触发
TriggerContext context = new TriggerContext(player, variables);
manager.fire("my_trigger_type", context);
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

### RecipeLoadFromConfigEvent

配方从配置文件加载时触发，可取消：

```java
@EventHandler
public void onRecipeLoad(RecipeLoadFromConfigEvent event) {
    if (event.getRecipeKey().getKey().equals("my_recipe")) {
        event.setCancelled(true); // 阻止加载
    }
}
```

## 相关类

| 类 | 说明 |
|----|------|
| `TriggerManager` | 触发器管理器 |
| `Trigger` | 触发器数据模型 |
| `TriggerContext` | 触发器上下文 |
| `TriggerType` | 触发器类型接口 |
| `ScriptValue` | 脚本值类型 |
| `ScriptContext` | 脚本执行上下文 |
