---
title: Script API
---

# Script API

## Script Execution

```java
ScriptEngine engine = ScriptEngine.INSTANCE;

// Execute script expression
ScriptContext context = new ScriptContext(player, variables);
ScriptValue result = engine.execute("perm(\"craftorithm.vip\")", context);
```

## ScriptContext

```java
// Create script context
Map<String, ScriptValue> vars = new HashMap<>();
vars.put("key", new ScriptValue.Str("value"));
ScriptContext ctx = new ScriptContext(player, vars);

// Get variables
ScriptValue val = ctx.getVariable("key");
Player player = ctx.getPlayer();
```

## ScriptValue Types

```java
// Create values
ScriptValue.Str str = new ScriptValue.Str("hello");
ScriptValue.Num num = new ScriptValue.Num(100.0);
ScriptValue.Bool bool = new ScriptValue.Bool(true);
ScriptValue.NullValue nil = ScriptValue.NullValue.INSTANCE;

// Get primitive values
String s = str.getString();
double n = num.getNumber();
boolean b = bool.getBoolean();

// Compare (automatic type conversion)
int cmp = num.compare(otherValue); // -1, 0, 1
```

## Registering Custom Functions

```java
ScriptFunctionRegistry registry = ScriptFunctionRegistry.INSTANCE;

registry.register("my_condition", (context, vm, args) -> {
    if (args.isEmpty()) return ScriptValue.Bool.FALSE;
    String key = args.get(0).getString();
    boolean result = checkCondition(context.getPlayer(), key);
    return result ? ScriptValue.Bool.TRUE : ScriptValue.Bool.FALSE;
});
```

After registration, use in triggers:

```yaml
conditions:
  - 'my_condition("key")'
actions:
  - 'my_action("hello ", "world")'
```

## Custom Modules

Implement the `ScriptModule` interface for batch function registration:

```java
public class MyModule implements ScriptModule {
    @Override
    public void registerFunctions(ScriptFunctionRegistry registry) {
        registry.register("module", "func1", this::func1);
        registry.register("module", "func2", this::func2);
    }

    private ScriptValue func1(ScriptContext ctx, ScriptVM vm, ScriptValue... args) {
        // ...
    }

    private ScriptValue func2(ScriptContext ctx, ScriptVM vm, ScriptValue... args) {
        // ...
    }
}
```

## Related Classes

| Class | Description |
|-------|-------------|
| `ScriptEngine` | Script engine entry point |
| `ScriptContext` | Execution context |
| `ScriptValue` | Value type (sealed interface) |
| `ScriptFunction` | Function interface |
| `ScriptModule` | Module interface |
| `ScriptFunctionRegistry` | Function registry |
| `CompiledScript` | Compiled script |
