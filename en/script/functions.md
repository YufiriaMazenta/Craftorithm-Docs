---
title: Functions
---

# Built-in Functions

## `perm`

This function checks whether a player has a specific permission.

It accepts one parameter. If multiple parameters are provided, subsequent parameters will be ignored.

## `papi`

This function resolves a PlaceholderAPI variable.

It accepts one parameter. If multiple parameters are provided, subsequent parameters will be ignored.

## `level`/`money`/`points`/`light-level`

These four functions work similarly - they all return a numeric value for the player.

`level` returns the player's current experience level.

`money` returns the player's current Vault balance.

`points` returns the player's current PlayerPoints balance.

`light_level` returns the light level at the player's current location.

## `world`/`gamemode`/`biome`

These three functions all have two usage modes.

`world` without parameters returns the name of the player's current world. With a parameter, it checks whether the player is in the specified world.

`gamemode` without parameters returns the player's current game mode (in uppercase). With a parameter, it checks whether the player is in the specified mode (case-insensitive).

`biome` without parameters returns the key of the player's current biome. With a parameter, it checks whether the player is in the specified biome.

## `item`

This function only works in item-related triggers. Its purpose is to check whether the item involved in the event matches a specific item.

It accepts one parameter, which is the item ID, using the same item system as recipes.

## `in-rain`/`in-water`

These two functions work similarly. `in-rain` returns whether the player is in rain, and `in-water` returns whether the player is in water. Neither accepts any parameters.

## `context`

This function retrieves a variable's value from the context, so it may return any type of value.

It accepts one parameter, which is the name of the variable to retrieve.

## `tell`/`actionbar`/`title`/`log`

These four functions all output content and automatically resolve PlaceholderAPI variables.

However, their usage differs slightly.

`tell`, `actionbar`, and `log` all accept all parameters and concatenate them together for output.

`tell` sends a message to the player's chat.

`actionbar` sends a message to the player's action bar.

`log` sends a message to the server console.

`title` only accepts two parameters: the first parameter is sent as the main title, and the second parameter is sent as the subtitle.

## `command`/`console`

Both functions execute commands and automatically resolve PlaceholderAPI variables. They both accept all parameters and concatenate them together as a single command.

`command` executes the command as the player.

`console` executes the command as the server console.

## `take-money`/`give-money`/`take-level`/`give-level`/`give-exp`/`take-points`/`give-points`

These seven functions work similarly - they all accept a numeric parameter.

`take-money`, `take-level`, and `take-points` deduct the player's Vault balance, experience level, and PlayerPoints balance respectively.

`give-money`, `give-level`, `give-exp`, and `give-points` add to the player's Vault balance, experience level, experience points, and PlayerPoints balance respectively.

## `close`/`back`

Both functions are used in menus and neither accepts any parameters.

`close` directly closes the player's currently open menu.

`back` returns to the previous menu if the player has one. If there is no previous menu, it closes the menu directly.

## `openmenu`

This function opens a Craftorithm custom menu.

It accepts one parameter, which is the name of the menu to open.

## `discover-recipe`/`undiscover-recipe`

Both functions are used for recipe book management and each accepts only one parameter.

`discover-recipe` unlocks a recipe for the player in the recipe book.

`undiscover-recipe` locks the specified recipe.

## `sound`

This function plays a sound for the player. It accepts up to three parameters.

The first parameter is the sound key in the format `<namespace>:<key>`.

The second parameter is the volume.

The third parameter is the pitch.

## `set`

This function is similar to declaring a variable. It is generally used in conjunction with the `context` function.

It accepts two parameters: the first parameter is the variable name (string type), and the second parameter is the variable content (can be any type).

## `delay`

This is a special function that pauses the current script execution and resumes after the specified number of ticks.

It accepts one parameter, which must be an integer.

# Custom Function Registration

Plugin developers can register custom functions through `ScriptFunctionRegistry`:

```java
ScriptFunctionRegistry.INSTANCE.register("my_func", (context, args) -> {
    // args is a list of ScriptValue
    // context contains Player and variables
    String msg = args.get(0).getString();
    context.getPlayer().sendMessage(msg);
    return ScriptValue.NullValue.INSTANCE;
});
```

After registration, it can be used in triggers:

```yaml
actions:
  - 'my_func("hello")'
```

For detailed API, see [Script API](/api/scripts.md).
