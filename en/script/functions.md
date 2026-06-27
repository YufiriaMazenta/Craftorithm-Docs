---
title: Function Reference
---

# Function Reference

## Condition Functions

| Function | Syntax | Returns | Description |
|----------|--------|---------|-------------|
| `perm` | `perm("node")` | Bool | Permission check |
| `papi` | `papi("%var%")` | Num/Str | PlaceholderAPI variable |
| `level` | `level` / `level >= N` | Num/Bool | Player level |
| `money` | `money` / `money >= N` | Num/Bool | Vault balance |
| `points` | `points` / `points >= N` | Num/Bool | PlayerPoints balance |
| `world` | `world` / `world("name")` | Str/Bool | World name check |
| `game_mode` | `game_mode` / `game_mode("MODE")` | Str/Bool | Game mode |
| `item` | `item("id")` / `item("id") >= N` | Bool | Item ID check |
| `biome` | `biome("name")` | Bool | Biome check |
| `in_water` | `in_water` | Bool | In water check |
| `in_rain` | `in_rain` | Bool | In rain check |
| `light_level` | `light_level` / `light_level >= N` | Num/Bool | Light level |
| `context` | `context("key")` | Any | Context variable |

## Action Functions

| Function | Syntax | Description |
|----------|--------|-------------|
| `tell` | `tell("msg")` | Send chat message |
| `actionbar` | `actionbar("msg")` | Send action bar |
| `title` | `title("main", "sub")` | Send title |
| `command` | `command("cmd")` | Execute as player |
| `console` | `console("cmd")` | Execute as console |
| `take-money` | `take-money(N)` | Deduct money |
| `give-money` | `give-money(N)` | Add money |
| `take-level` | `take-level(N)` | Deduct levels |
| `give-level` | `give-level(N)` | Add levels |
| `give-exp` | `give-exp(N)` | Add experience |
| `take-points` | `take-points(N)` | Deduct points |
| `give-points` | `give-points(N)` | Add points |
| `close` | `close` | Close inventory |
| `discover-recipe` | `discover-recipe("key")` | Unlock recipe |
| `undiscover-recipe` | `undiscover-recipe("key")` | Lock recipe |
| `set` | `set("key", value)` | Set context variable |

## Custom Function Registration

Plugin developers can register custom functions via `ScriptFunctionRegistry`:

```java
ScriptFunctionRegistry.INSTANCE.register("my_func", (context, args) -> {
    // args is a list of ScriptValue
    // context contains Player and variables
    String msg = args.get(0).getString();
    context.getPlayer().sendMessage(msg);
    return ScriptValue.NullValue.INSTANCE;
});
```

After registration, use it in triggers:

```yaml
actions:
  - 'my_func("hello")'
```

See [Script API](/en/api/scripts) for details.
