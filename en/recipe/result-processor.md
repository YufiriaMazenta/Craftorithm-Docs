---
title: Result Processors
---

# Result Processors

Result processors rewrite the components of a recipe's result item when the craft completes: copy them from the source item, write fixed values, merge with the source, or remove them.

## Supported Recipe Types

| Recipe Type | type value | Status |
|-------------|------------|--------|
| Anvil | `anvil` | ✅ Supported |
| Smithing transform | `vanilla_smithing_transform` | ✅ Supported |
| Furnace smelting | `vanilla_smelting_*` | ✅ Supported |
| Brewing stand | `vanilla_brewing` | ✅ Supported |
| Shaped recipe | `vanilla_shaped` | ✅ Supported |
| Shapeless recipe | `vanilla_shapeless` | ✅ Supported |
| Stonecutter | `vanilla_stonecutting` | ✅ Supported (Paper and forks only) |

## Basic Syntax

```yaml
type: <recipe type>
result: '<item id>'
# ... other recipe fields

result_processors:
  <component>:
    type: <strategy>
    data:      # optional, depending on the strategy
      <config>
```

### Single Action and Multiple Actions

When a component only needs one action, write `type` (and `data`) directly. To run several actions on the same component in order, use a list:

```yaml
result_processors:
  enchantments:
    - type: copy_from_source
    - type: remove
      data:
        value:
          - "minecraft:sharpness"
    - type: add
      data:
        minecraft:unbreaking: 3
```

Components are also processed in the order they appear under `result_processors`, so a later action overwrites what an earlier one wrote.

### What Happens When the Config Is Wrong

- **Unknown component** (including components the current server version does not support): logs `Unknown component: <name>`, skips it, and the recipe still loads normally.
- **Unsupported strategy** (for example `add` on `all`): logs a warning and skips that action.
- **Missing or malformed `data`**: most components log a warning and skip the action; a few (such as `add` of `custom_persistent_data`) fail with an error.

Rule of thumb: if a recipe loads but the result is missing an effect, check the console for messages such as `Unknown component` or `missing 'value'`.

## Source Item

Strategies `copy_from_source` and `merge_source` read from a "source" item, which differs by recipe type:

| Recipe Type | Source Item |
|-------------|-------------|
| Anvil / Smithing | the base item (left or middle slot) |
| Smelting / Stonecutting / Brewing | the input item |
| Crafting table (shaped / shapeless) | no source item |

Crafting table recipes have no source item. `copy_from_source` and `merge_source` do not fail there, but they do **nothing**. Use `add` or `remove` for crafting table recipes.

## Strategies

| Strategy | Effect | On conflict |
|----------|--------|-------------|
| `copy_from_source` | Overwrite the result's component with the source's | source wins |
| `merge_source` | Merge the source's component into the result | result wins (existing values kept) |
| `add` | Merge the `data` content into the result | `data` wins (overwrites same entries) |
| `set` | Clear the component, then write `data` | no conflict |
| `remove` | Remove all or selected content | — |

`add` and `merge_source` both merge; the only difference is who wins a conflict. Use `set` when you want a full replacement.

`set` performs a full replacement and is provided by the components that can hold multiple entries: lore, enchantments, attributes, item flags and persistent data. For single-value components (name, rarity, durability and so on) `add` already replaces the value, so there is no `set`. Each component below lists the strategies it actually supports; anything else is skipped at load time.

## Common Components

The following components work on every server version the plugin supports (`trim` requires 1.19.4+, `skull_profile` requires 1.20.2+).

### all

Copies every component of the source item.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Fully overwrite the result's components with the source's |

`all` can only copy from the source, so it does not support `add` / `set` / `remove`.

```yaml
# Smithing: keep all data of the base item (enchants, damage, name, ...)
result_processors:
  all:
    type: copy_from_source
```

### display_name

The item's custom display name (the legacy name).

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's custom name if it has one |
| `add` | `value` is the name string; color codes and PlaceholderAPI variables work |
| `remove` | Remove the custom name and fall back to the default |

```yaml
result_processors:
  display_name:
    type: add
    data:
      value: '&6&lLegendary Sword'
    # replace or remove instead:
    # type: set
    # type: remove
```

On 1.20.5+ use `item_name` below for the item name component.

### lore

The item's lore.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Replace the result's lore with the source's lore |
| `merge_source` | Keep the result's lore first, then append the source's lore |
| `add` | **Append** the lines in `value` after the existing lore; color codes and PlaceholderAPI variables work |
| `set` | Clear the existing lore, then write the lines in `value` |
| `remove` | Without `data`, clears all lore; with `value`, removes lines that match exactly |

```yaml
result_processors:
  lore:
    # append two lines after the existing lore
    type: add
    data:
      value:
        - '&7A legendary artifact'
        - '&aForged from a nether star'

    # to replace the whole lore instead:
    # type: set
    # data:
    #   value:
    #     - '&7A legendary artifact'

    # to remove specific lines:
    # type: remove
    # data:
    #   value:
    #     - '&7A legendary artifact'
```

`remove` matches lines exactly, so a line with color codes must be written with the same color codes to match.

### enchantments

Vanilla enchantments.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's enchantments; writes the source level when the result lacks it or when the source level is not lower |
| `merge_source` | Only overwrite an existing enchantment when the source level is **higher** |
| `add` | `data` maps `enchantment id: level`; an existing enchantment is overwritten |
| `set` | Clear all enchantments first, then write |
| `remove` | Without `data`, clears every enchantment; with `value`, removes the listed ones |

```yaml
result_processors:
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
      minecraft:mending: 1

    # keep only the listed enchantments:
    # type: set
    # data:
    #   minecraft:sharpness: 10

    # remove specific enchantments:
    # type: remove
    # data:
    #   value:
    #     - "minecraft:sharpness"
```

### attributes

Attribute modifiers of the item.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Replace the result's modifiers with the source's |
| `merge_source` | Append the source's modifiers; the same attribute may appear twice |
| `add` | `value` is a list of modifiers, each with `attribute`, `amount`, `operation`, `slot` |
| `set` | Clear the result's modifiers first, then write |
| `remove` | Without `data`, clears every modifier; with `value`, removes all modifiers of the listed attributes |

Fields of `add`:

| Field | Required | Description |
|-------|----------|-------------|
| `attribute` | Yes | Attribute id, e.g. `minecraft:generic.attack_damage` |
| `amount` | Yes | Numeric value |
| `operation` | No | `ADD_NUMBER` (default), `ADD_SCALAR`, `MULTIPLY_SCALAR_1` |
| `slot` | No | Target slot group, default `any`; 1.20.5+ uses `mainhand`, `offhand`, `hand`, `armor`, `any`, older versions use `HAND`, `OFF_HAND`, `HEAD`, ... |

```yaml
result_processors:
  attributes:
    type: add
    data:
      value:
        - attribute: 'minecraft:generic.attack_damage'
          amount: 10
          operation: ADD_NUMBER
          slot: mainhand
        - attribute: 'minecraft:generic.movement_speed'
          amount: 0.1
          operation: MULTIPLY_SCALAR_1

    # clear first, then write:
    # type: set
    # data:
    #   value:
    #     - attribute: 'minecraft:generic.attack_damage'
    #       amount: 20
```

`add` does not merge modifiers of the same attribute: writing the same attribute again makes both apply, and the values stack. To replace an attribute, `remove` it first and then `add` the new value.

### item_flag

Item flags (hide enchantments, hide attributes, ...).

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Fully replace the result's flags with the source's |
| `merge_source` | Only append flags the result does not have yet |
| `add` | Append the flags in `value` |
| `set` | Clear the result's flags first, then write |
| `remove` | Without `data`, clears every flag; with `value`, removes the listed ones |

Flag names use Bukkit enum names such as `HIDE_ENCHANTS`, `HIDE_ATTRIBUTES`, `HIDE_UNBREAKABLE`, `HIDE_DYE`.

```yaml
result_processors:
  item_flag:
    type: add
    data:
      value:
        - 'HIDE_ENCHANTS'
        - 'HIDE_ATTRIBUTES'

    # keep only the listed flags:
    # type: set
    # data:
    #   value:
    #     - 'HIDE_ENCHANTS'
```

### trim

Armor trim, only effective on armor items.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the trim when the source has one |
| `add` | Set the trim with `pattern` and `material`; both must resolve, otherwise the action is skipped |
| `remove` | Remove the trim |

```yaml
result_processors:
  trim:
    type: add
    data:
      pattern: 'minecraft:spire'
      material: 'minecraft:netherite'
```

### unbreakable

The unbreakable flag.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Follow the source's unbreakable state |
| `add` | `value` is `true` or `false` |
| `remove` | Remove the unbreakable flag |

```yaml
result_processors:
  unbreakable:
    type: add
    data:
      value: true
```

### custom_model_data

Legacy custom model data (an integer).

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the value from the source |
| `add` | `value` is an integer |
| `remove` | Remove the value |

```yaml
result_processors:
  custom_model_data:
    type: add
    data:
      value: 1001
```

On 1.21.4+ use `custom_model_data_component` below instead.

### damage

Damage already taken by the result item.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the damage value when the source has one |
| `add` | `value` (or `damage`) is the damage; `allow_exceed_max` controls whether it may exceed max durability |
| `remove` | Reset the damage to zero |

```yaml
result_processors:
  damage:
    type: add
    data:
      value: 50
      allow_exceed_max: false
```

By default a value above the item's max durability is clamped to the limit with a console warning; set `allow_exceed_max: true` to bypass the clamp.

### base_color

Leather armor color, only effective on leather armor.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's color when it has one |
| `add` | `value` is `'#RRGGBB'` or `'r,g,b'` |
| `remove` | Reset to the default leather color |

```yaml
result_processors:
  base_color:
    type: add
    data:
      value: '#3F76E4'
    # this also works:
    # value: '63,118,228'
```

### skull_profile

The skin of a skull item, only effective on skulls.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's skin |
| `remove` | Clear the skin |

Skin data cannot be built from a plain string, so there is no `add` / `set`. To use a fixed skin, put a player head with that skin in the source slot (the base of an anvil or smithing recipe) and copy it.

```yaml
result_processors:
  skull_profile:
    type: copy_from_source
```

## 1.20.5+ Components

These require server 1.20.5 or newer; older versions log `Unknown component` and skip them.

### food

Food properties such as nutrition and saturation.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's food properties if it has any |
| `remove` | Remove the food properties |

There is no `add` / `set`: food properties contain many fields and cannot be built from a simple config.

```yaml
result_processors:
  food:
    type: copy_from_source
```

### hide_tooltip

Whether the whole tooltip is hidden.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Follow the source's setting |
| `add` | `value` is `true` or `false` |
| `remove` | Show the tooltip again |

```yaml
result_processors:
  hide_tooltip:
    type: add
    data:
      value: true
```

### item_name

The item name component.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's name component if it has one |
| `add` | `value` is the name string; color codes and PlaceholderAPI variables work |
| `remove` | Remove the name component |

```yaml
result_processors:
  item_name:
    type: add
    data:
      value: '&b%player_name%&f''s sword'
```

### max_stack_size

The maximum stack size.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's stack size |
| `add` | `value` is an integer |
| `remove` | Restore the item's default stack size |

```yaml
result_processors:
  max_stack_size:
    type: add
    data:
      value: 16
```

### rarity

Item rarity, which also decides the name color.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's rarity |
| `add` | `value` is `COMMON`, `UNCOMMON`, `RARE` or `EPIC` |
| `remove` | Restore the default rarity |

```yaml
result_processors:
  rarity:
    type: add
    data:
      value: EPIC
```

### fire_resistance

Whether the item survives lava and fire.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Follow the source |
| `add` | `value` is `true` or `false`; defaults to `true` when omitted |
| `remove` | Turn fire resistance off |

```yaml
result_processors:
  fire_resistance:
    type: add
    data:
      value: true
```

### max_damage

The maximum durability, independent from `damage`.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's max durability |
| `add` | `value` is a positive integer |
| `remove` | Restore the item's default durability |

```yaml
result_processors:
  max_damage:
    type: add
    data:
      value: 3000
```

### enchantment_glint_override

Force the enchantment glint on or off.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's setting |
| `add` | `value` is `true` (show glint) or `false` (hide glint) |
| `remove` | Remove the override and use the default behavior |

```yaml
result_processors:
  enchantment_glint_override:
    type: add
    data:
      value: true
```

### potion

The base potion type (swiftness, healing, ...), only effective on potions.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's base potion type if it has one |
| `remove` | Remove the base potion type |

```yaml
result_processors:
  potion:
    type: copy_from_source
```

## 1.21+ Components

### tool

The tool component (mining speed, mineable blocks, ...), requires 1.21+.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's tool component |
| `remove` | Remove the tool component |

```yaml
result_processors:
  tool:
    type: copy_from_source
```

## 1.21.2+ Components

These require server 1.21.2 or newer.

### glider

Whether the item glides like an elytra.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Follow the source |
| `add` | `value` is `true` or `false` |
| `remove` | Turn gliding off |

```yaml
result_processors:
  glider:
    type: add
    data:
      value: true
```

### enchantable

The item's enchantability, which affects enchantment table results.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's enchantability |
| `add` | `value` is an integer |
| `remove` | Restore the item's default value |

```yaml
result_processors:
  enchantable:
    type: add
    data:
      value: 30
```

### tooltip_style

The tooltip style, which requires a matching definition in a resource pack.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's style |
| `add` | `value` is `namespace:id`, e.g. `mypack:custom_tooltip` |
| `remove` | Remove the style |

```yaml
result_processors:
  tooltip_style:
    type: add
    data:
      value: 'mypack:custom_tooltip'
```

### use_cooldown

The item's use cooldown.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's cooldown and cooldown group |
| `add` | `seconds` is the cooldown in seconds; `group` is the cooldown group (optional) |
| `remove` | Remove the cooldown |

```yaml
result_processors:
  use_cooldown:
    type: add
    data:
      seconds: 5
      group: 'craftorithm:special_items'
```

Items sharing the same `group` share the cooldown: using one puts the others on cooldown too.

### damage_resistant

Immunity to specific damage types, requires 1.21.2+.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's resistance |
| `remove` | Remove the resistance |

```yaml
result_processors:
  damage_resistant:
    type: copy_from_source
```

## 1.21.4+ Components

These require server 1.21.4 or newer.

### custom_model_data_component

The newer custom model data component (may hold multiple floats and strings).

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's component data |
| `remove` | Remove the component |

```yaml
result_processors:
  custom_model_data_component:
    type: copy_from_source
```

### item_model

The model used by the item.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's model |
| `add` | `value` is `namespace:id`, e.g. `mypack:custom_model` |
| `remove` | Remove the model |

```yaml
result_processors:
  item_model:
    type: add
    data:
      value: 'mypack:ruby_sword'
```

## Special Components

### custom_persistent_data

Persistent data (PDC) of the item, commonly used to tag items for scripts or other plugins.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Without `data`, copies every key of the source; with `key` and `type`, copies only that key |
| `merge_source` | Only adds keys the result does not have; existing keys keep the result's value |
| `add` | `data` maps `namespace:key: value`; existing keys are overwritten |
| `set` | Clear every key first, then write |
| `remove` | Without `data`, clears every key; with `value`, removes the listed keys |

The value type of `add` follows the YAML value: strings, integers, decimals and booleans are written as their own type, anything else as a string.

```yaml
result_processors:
  custom_persistent_data:
    # write two keys
    type: add
    data:
      myns:item_type: 'ruby_sword'
      myns:power: 42
      myns:bound: true

    # copy a single key from the source:
    # type: copy_from_source
    # data:
    #   key: 'myns:quality'
    #   type: STRING

    # only add keys the result is missing:
    # type: merge_source

    # clear every key:
    # type: remove

    # remove specific keys:
    # type: remove
    # data:
    #   value:
    #     - 'myns:item_type'
    #     - 'myns:power'
```

When using `key` with `copy_from_source` or `merge_source`, `type` is required as well, otherwise every key is processed. Valid `type` values include `STRING`, `INTEGER`, `LONG`, `DOUBLE`, `FLOAT`, `BYTE` and `BOOLEAN`.

## Using with AdvancedEnchantments

With AdvancedEnchantments installed, the `ae_enchantments` component handles its custom enchantments.

| Strategy | Description |
|----------|-------------|
| `copy_from_source` | Copy the source's custom enchantments |
| `merge_source` | Only overwrite an existing level when the source level is higher |
| `remove` | Remove every custom enchantment from the result |

```yaml
result_processors:
  ae_enchantments:
    type: copy_from_source
```

## Legacy Syntax

The old `copy_components_rules` syntax still works; each entry is converted to `copy_from_source` of the matching component:

```yaml
# old syntax
copy_components_rules:
  - 'enchantments'
  - 'display_name'
  - 'lore'

# equivalent to
result_processors:
  enchantments:
    type: copy_from_source
  display_name:
    type: copy_from_source
  lore:
    type: copy_from_source
```

The legacy syntax only works for anvil and smithing recipes (`vanilla_smithing_transform`, `vanilla_smithing_trim`); use `result_processors` for other recipe types. When both `copy_components_rules` and `result_processors` are present, only the latter is used.

## Complete Examples

### Anvil: keep base data and append lore

```yaml
type: anvil
result: 'minecraft:diamond_sword'
base: 'minecraft:netherite_sword'
addition: 'minecraft:nether_star'
cost_level: 10

result_processors:
  # copy enchantments and the display name from the base item
  enchantments:
    type: copy_from_source
  display_name:
    type: copy_from_source

  # append two lines after the existing lore (the base lore is kept)
  lore:
    type: add
    data:
      value:
        - '&7A legendary artifact'
        - '&aForged from a nether star'

  # merge the base attributes
  attributes:
    type: merge_source

  # hide enchantment and attribute tooltips
  item_flag:
    type: add
    data:
      value:
        - 'HIDE_ENCHANTS'
        - 'HIDE_ATTRIBUTES'

  # make it unbreakable
  unbreakable:
    type: add
    data:
      value: true

  # tag it so scripts can recognize it
  custom_persistent_data:
    type: add
    data:
      myns:legendary: true
```

### Smithing: overwrite everything

```yaml
type: 'vanilla_smithing_transform'
result: 'minecraft:netherite_sword'
base: 'minecraft:diamond_sword'
addition: 'minecraft:netherite_ingot'
template: 'minecraft:netherite_upgrade_smithing_template'

result_processors:
  # copy every component of the base
  all:
    type: copy_from_source

  # then add one more enchantment
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
```

### Crafting table: write fixed content

Crafting table recipes have no source item, so only `add` / `remove` (plus `set` on multi-entry components) are useful:

```yaml
type: 'vanilla_shaped'
result: 'minecraft:bread'
pattern:
  - 'AAA'
ingredients:
  A: 'minecraft:wheat'

result_processors:
  lore:
    type: set
    data:
      value:
        - '&7Bread made from three wheat'
  rarity:
    type: add
    data:
      value: UNCOMMON
```

### Smelting: append a line only

```yaml
type: 'vanilla_smelting_furnace'
result: 'minecraft:diamond'
source: 'minecraft:coal_ore'
experience: 1.0
cooking_time: 200

result_processors:
  lore:
    type: add
    data:
      value:
        - '&7Obtained by smelting'
```
