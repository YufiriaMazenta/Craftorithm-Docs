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

## `level`/`money`/`points`/`light_level`

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

## `in_rain`/`in_water`

These two functions work similarly. `in_rain` returns whether the player is in rain, and `in_water` returns whether the player is in water. Neither accepts any parameters.

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

## `take_money`/`give_money`/`take_level`/`give_level`/`give_exp`/`take_points`/`give_points`

These seven functions work similarly - they all accept a numeric parameter.

`take_money`, `take_level`, and `take_points` deduct the player's Vault balance, experience level, and PlayerPoints balance respectively.

`give_money`, `give_level`, `give_exp`, and `give_points` add to the player's Vault balance, experience level, experience points, and PlayerPoints balance respectively.

## `close`/`back`

Both functions are used in menus and neither accepts any parameters.

`close` directly closes the player's currently open menu.

`back` returns to the previous menu if the player has one. If there is no previous menu, it closes the menu directly.

## `openmenu`

This function opens a Craftorithm custom menu.

It accepts one parameter, which is the name of the menu to open.

## `discover_recipe`/`undiscover_recipe`

Both functions are used for recipe book management and each accepts only one parameter.

`discover_recipe` unlocks a recipe for the player in the recipe book.

`undiscover_recipe` locks the specified recipe.

## `sound`

This function plays a sound for the player. It accepts up to three parameters.

The first parameter is the sound key in the format `<namespace>:<key>`.

The second parameter is the volume.

The third parameter is the pitch.

## `set_inv_item`(1.11.2.0+)

This function sets an item at a specified position in the player's currently open inventory page. It must accept two parameters.

The second parameter is the item ID, using the same item system as recipes, and it can specify quantity.

Example: `set_inv_item(0, "minecraft:bucket 1")`

The replacement is forced. To prevent unexpected issues, the item replacement operation is delayed by 1 tick.

## `delay`

This is a special function that pauses the current script execution and resumes after the specified number of ticks.

It accepts one parameter, which must be an integer.

## `abs`(1.11.3.0+)

This function returns the absolute value of the input. For example, `abs(-1)` returns 1.

## `min`(1.11.3.0+)

This function returns the smaller of two values. For example, `min(1, 0)` returns 0.

## `max`(1.11.3.0+)

This function returns the larger of two values. For example, `max(1, 0)` returns 1.

## `round`(1.11.3.0+)

This function rounds the value to the nearest integer. For example, `round(10.6)` returns 11.

## `floor` `ceil`(1.11.3.0+)

`floor` rounds down, while `ceil` rounds up.

For example, `floor(6.1)` returns 6, and `ceil(6.8)` returns 7.

## `pow`(1.11.3.0+)

This function performs exponentiation. It requires two numeric parameters, which can be floating-point numbers.

For example, `pow(2, 4)` returns 2 to the power of 4, which is 16.

## `random`(1.11.3.0+) / `random_int`(1.11.4.0+)

Both functions return a random number. The difference is that `random` returns a floating-point number, while `random_int` returns an integer.

`random` accepts 0, 1, or 2 parameters, while `random_int` must accept at least one parameter.

When no parameters are provided, it returns a random number between 0 and 1 (inclusive of 0, exclusive of 1).

When one parameter is provided, it returns a random number between 0 and the input value (inclusive of 0, exclusive of the input).

When two parameters are provided, it returns a random number between the first and second values (inclusive of the smaller value, exclusive of the larger value).

## `int` / `float`(1.11.4.0+)

These two functions perform type conversion. `int` forces a number to be an integer, while `float` forces a number to be a floating-point number.

Both must accept one parameter.

For example, `set("num_var", int(1.1))` - although 1.1 is passed in, the actual value set is 1.

## `match_item_id`(1.13.3.0+)

This function identifies an item's ID without the quantity, similar to the item ID format used in recipe files.

It requires an ItemStack type variable, so in most cases you need to obtain it through the event object.

For example, `match_item_id(event.get("item"))` - if the item has a plugin-defined ID, it returns a string; otherwise, it returns nil.

# Custom Function Registration

Plugin developers can register custom functions through `ScriptFunctionRegistry`:

```java
ScriptFunctionRegistry.INSTANCE.register("my_func", (context, vm, args) -> {
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

## Function Naming Restrictions

Custom function names **may only contain letters, digits, and underscores** (`[a-zA-Z0-9_]`). **Hyphens (`-`) are not allowed.**

This is because `-` is parsed as the subtraction operator by the script engine, which would cause the function name to be split into multiple tokens and fail to resolve correctly.

✅ Valid function names: `my_func`, `take_money`, `giveExp2`, `check_level`

❌ Invalid function names: `my-func`, `take-money`, `give-exp`

For detailed API, see [Script API](/api/scripts.md).
