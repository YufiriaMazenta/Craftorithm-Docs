---
title: Trigger API
---

# Trigger API

## Getting Trigger Manager

```java
TriggerManager manager = api.getTriggerManager();
```

## Firing Triggers

```java
// Fire with specified type and context
TriggerContext context = new TriggerContext(player, variables);
manager.fire("my_trigger_type", context);
```

## TriggerContext

```java
// Recipe event context
TriggerContext ctx = new TriggerContext(player, recipeKey, recipeType);

// Generic event context
Map<String, ScriptValue> vars = new HashMap<>();
vars.put("damage", new ScriptValue.Num(10.0));
vars.put("entity_type", new ScriptValue.Str("ZOMBIE"));
TriggerContext ctx = new TriggerContext(player, vars);

// Get variables
ScriptValue val = ctx.getVariable("damage");

// Convert to script context
ScriptContext scriptCtx = ctx.toScriptContext();
```

## Trigger Data Model

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

## Registering Trigger Types

Implement the `TriggerType` interface:

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
        // Extract context from event
        return new TriggerContext(player, variables);
    }
}
```

## Events

### RecipeLoadFromConfigEvent

Fired when a recipe is loaded from config. Cancellable:

```java
@EventHandler
public void onRecipeLoad(RecipeLoadFromConfigEvent event) {
    if (event.getRecipeKey().getKey().equals("my_recipe")) {
        event.setCancelled(true); // Prevent loading
    }
}
```

## Related Classes

| Class | Description |
|-------|-------------|
| `TriggerManager` | Trigger manager |
| `Trigger` | Trigger data model |
| `TriggerContext` | Trigger context |
| `TriggerType` | Trigger type interface |
| `ScriptValue` | Script value type |
| `ScriptContext` | Script execution context |
