---
title: Trigger API
---

# Trigger API

## Getting the Trigger Manager

```java
TriggerManager manager = api.trigger().getTriggerManager();
```

## Firing Triggers

```java
// Fire with the specified type and context
TriggerType triggerType = manager.getTriggerType("my_trigger_type");
TriggerContext context = new TriggerContext(player, variables);
api.trigger().fireTrigger(triggerType, context);
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

### RecipeRegisterEvent

Fired when a recipe is registered (on plugin load, reload, and when a recipe is created or edited). Cancellable; a cancelled recipe is not registered:

```java
@EventHandler
public void onRecipeRegister(RecipeRegisterEvent event) {
    if (event.recipeKey().getKey().equals("my_recipe")) {
        event.setCancelled(true); // Prevent registration
    }
}
```

`reason()` tells why the recipe is being registered: `RELOAD` (load or reload), `NEW_RECIPE` (recipe created) or `EDIT_RECIPE` (recipe edited).

### CraftorithmReloadDoneEvent

Fired after the plugin finishes reloading. **It runs on an asynchronous thread**, so schedule back to the main thread before calling anything that requires it:

```java
@EventHandler
public void onReloadDone(CraftorithmReloadDoneEvent event) {
    // Re-read plugin data after the reload
}
```

## Related Classes

| Class | Description |
|-------|-------------|
| `CraftorithmApi` | API entry point |
| `TriggerApi` | Trigger API |
| `TriggerManager` | Trigger manager |
| `Trigger` | Trigger data model |
| `TriggerContext` | Trigger context |
| `TriggerType` | Trigger type interface |
| `ScriptValue` | Script value type |
| `ScriptContext` | Script execution context |
