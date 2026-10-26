---
title: Crafting Remainders
---

# Crafting Remainders (Remainders)

`remainders` controls what each crafting grid **input slot** leaves behind after a craft in crafting table recipes.

Vanilla only leaves a fixed remainder for a handful of items (buckets, lava buckets). `remainders` lets you define the behaviour for any ingredient: damage a tool, replace it with another item, or keep it as it is.

## Supported Recipe Types

| Recipe type | type value | Supported |
|-------------|------------|-----------|
| Shaped recipe | `vanilla_shaped` | ✅ Yes |
| Shapeless recipe | `vanilla_shapeless` | ✅ Yes |
| Other recipe types | — | ❌ No |

Only crafting table recipes process input items slot by slot when the result is taken. Input consumption in every other recipe type (smelting, smithing, brewing, anvil, stonecutting) is hardcoded, so `remainders` is not supported there. If you add `remainders` to an unsupported recipe, the plugin logs a warning and ignores the section; the recipe itself still loads normally.

## Basic Syntax

```yaml
type: 'vanilla_shaped'
result: '<item ID>'
# ... other recipe fields

remainders:
  - ingredient: <ingredient>
    action: <action>
    # ... action arguments
```

`remainders` must be a list, and each element is one rule.

| Field | Required | Description |
|-------|----------|-------------|
| `ingredient` | Yes | The ingredient to match. Uses the same format as recipe ingredients: vanilla item ID, custom item ID, `tag:`, `item_pack:` |
| `action` | Yes | Action name. Built-in values are `damage` / `replace` / `keep`; other plugins may register custom actions |
| Action arguments | Depends on the action | See the action sections below |

## Actions

### damage

Keeps the consumed item and adds the configured amount to its current damage.

```yaml
remainders:
  - ingredient: 'minecraft:flint_and_steel'
    action: damage
    damage: 1
```

| Field | Required | Description |
|-------|----------|-------------|
| `damage` | Yes | Durability to consume. Must be a positive integer |

- When the accumulated damage reaches the item's maximum durability, the item is destroyed and the slot is left empty.
- On items without durability, `damage` behaves like `keep` and returns the item unchanged.

### replace

Replaces the consumed item with a configured item.

```yaml
remainders:
  - ingredient: 'my_items:magic_water_bucket'
    action: replace
    item: 'minecraft:iron_ingot 2'
```

| Field | Required | Description |
|-------|----------|-------------|
| `item` | Yes | The replacement item in the format `<item ID> [amount]`. The amount defaults to 1 when omitted |

- The amount must not exceed the item's max stack size, otherwise the rule is treated as invalid.
- If the item can no longer be resolved at craft time (for example the item provider plugin was removed), the slot is left empty, which is the same as the ingredient being consumed normally.

### keep

Keeps the consumed item unchanged.

```yaml
remainders:
  - ingredient: 'my_items:reusable_catalyst'
    action: keep
```

Returns one copy of the consumed item with all of its data intact, including durability, enchantments and NBT. The amount is always 1. This is useful for catalysts and reusable moulds.

## Matching and Behaviour

- **Handled per slot**: every non-empty slot in the crafting grid matches the rules on its own, rather than matching by ingredient type. The same ingredient placed in two slots is processed in both slots.
- **One rule per slot**: rules are matched top to bottom, the first rule whose `ingredient` matches wins, and later rules are not tried for that slot.
- **Unmatched slots keep vanilla behaviour**: slots without a matching rule keep their vanilla remainder (for example a bucket leaves an empty bucket).
- **Invalid rules are skipped**: if `ingredient` cannot be parsed, `action` is not registered, or the action arguments are missing or invalid, that rule is ignored and a warning is logged on load. Other rules in the same recipe are unaffected.

## Difference from Result Processors

| | `remainders` | `result_processors` |
|---|---|---|
| Target | Input items in the crafting grid | The crafted result item |
| Timing | After the result is taken, written back slot by slot | While the result is produced |
| Typical use | Tool durability, bucket replacement, catalysts | Copy / add / remove result components |

They are independent and can be used in the same recipe. See [Result Processors](/en/recipe/result-processor.md) for details on result processors.

## Full Example

```yaml
type: 'vanilla_shaped'
result: 'my_items:charged_crystal'
group: 'magic'

shape:
  - 'ABA'
  - 'BCB'
  - 'ABA'

ingredients:
  A: 'minecraft:amethyst_shard'
  B: 'minecraft:gold_ingot'
  C: 'my_items:crystal_core'

remainders:
  # The core acts as a catalyst and is kept after crafting
  - ingredient: 'my_items:crystal_core'
    action: keep
  # Flint and steel loses 2 durability per craft
  - ingredient: 'minecraft:flint_and_steel'
    action: damage
    damage: 2
  # Any plank turns into a stick when consumed
  - ingredient: 'tag:minecraft:planks'
    action: replace
    item: 'minecraft:stick'
```

## Custom Actions

`action` is an open registry. Other plugins can register their own actions and use them directly in recipe configs.

```java
RemainderActionRegistry.INSTANCE.register("my_action", (section, recipeKey) -> {
    String arg = section.getString("my_arg");
    if (arg == null) {
        // Returning null marks the config as invalid and the rule is skipped
        return null;
    }
    // The returned action is called for the single matched item on every craft
    return source -> {
        ItemStack remainder = source.clone();
        remainder.setAmount(1);
        return remainder;
    };
});
```

- Action names are case-insensitive, and registering an existing name replaces the previous action.
- The `source` passed to `RemainderAction#createRemainder` is the consumed original item, and the plugin guarantees an amount of 1. Returning an empty item (`Material.AIR`) means the slot is left empty.
- If the factory returns `null`, the config is treated as invalid and the rule is skipped. Log your own warning in the factory to explain why.
