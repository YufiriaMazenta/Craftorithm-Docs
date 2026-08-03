---
title: Result Processors
---

# Result Processors

Result processors are a feature added in version 1.13.0.0 that allows adding additional effects to recipe results during crafting. With result processors, you can copy, add, or remove item components.

## Supported Recipe Types

| Recipe Type | type Value | Support Status |
|-------------|------------|----------------|
| Anvil Recipe | `anvil` | ✅ Supported |
| Smithing Transform | `vanilla_smithing_transform` | ✅ Supported |
| Smelting | `vanilla_smelting_*` | ✅ Supported |
| Brewing | `vanilla_brewing` | ✅ Supported |
| Shaped Recipe | `vanilla_shaped` | ✅ Supported |
| Shapeless Recipe | `vanilla_shapeless` | ✅ Supported |
| Stonecutting | `vanilla_stonecutting` | ❌ Not Supported |

**Note**: Stonecutting recipes (`vanilla_stonecutting`) do not currently support result processors.

## Basic Syntax

```yaml
type: <recipe_type>
result: '<item_id>'
# ... other recipe fields

result_processors:
  <component_name>:
    type: <processing_strategy>
    data:  # optional, depends on strategy
      <configuration>
```

## Processing Strategies

Result processors support four processing strategies:

### copy_from_source

Copy components from the source item to the result.

```yaml
result_processors:
  enchantments:
    type: copy_from_source
```

### add

Directly add specified values to the result item.

```yaml
result_processors:
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
      minecraft:mending: 1
```

### merge_source

Intelligently merge source item components with result item components. For enchantments, the higher level is used; for attributes, modifiers are merged.

```yaml
result_processors:
  attributes:
    type: merge_source
```

### remove

Remove components from the result item. Without `data`, all components are removed; with `data`, specific items are removed.

```yaml
# Remove all enchantments
result_processors:
  enchantments:
    type: remove

# Remove specific enchantments
result_processors:
  enchantments:
    type: remove
    data:
      value:
        - "minecraft:sharpness"
        - "minecraft:mending"
```

## Source Item Meaning

The meaning of the source item varies by recipe type:

| Recipe Type | Source Item |
|-------------|-------------|
| Anvil/Smithing | base item (left slot) |
| Smelting/Stonecutting/Brewing | input item |
| Crafting table | null (no source item) |

## Supported Component Types

### Basic Components

| Component | Description | Supported Strategies |
|-----------|-------------|---------------------|
| `all` | Copy all components | `copy_from_source` only |
| `display_name` | Display name | All |
| `lore` | Lore text | All |
| `enchantments` | Enchantments | All |
| `attributes` | Attribute modifiers | All |
| `item_flag` | Item flags | All |
| `trim` | Armor trim | `copy_from_source`, `remove` |
| `unbreakable` | Unbreakable | All |
| `custom_model_data` | Custom model data | All |

### 1.20.5+ Components

| Component | Description | Supported Strategies |
|-----------|-------------|---------------------|
| `food` | Food properties | All |
| `hide_tooltip` | Hide tooltip | All |
| `item_name` | Item name | All |
| `max_stack_size` | Max stack size | All |
| `rarity` | Rarity | All |
| `fire_resistance` | Fire resistance | All |

### 1.21+ Components

| Component | Description | Supported Strategies |
|-----------|-------------|---------------------|
| `tool` | Tool properties | All |

### 1.21.4+ Components

| Component | Description | Supported Strategies |
|-----------|-------------|---------------------|
| `custom_model_data_component` | Custom model data component | All |
| `item_model` | Item model | All |

### Special Components

| Component | Description | Supported Strategies |
|-----------|-------------|---------------------|
| `custom_persistent_data` | Custom persistent data (PDC) | All |

## Complete Examples

### Anvil Recipe Example

```yaml
type: anvil
result: 'minecraft:diamond_sword'
base: 'minecraft:netherite_sword'
addition: 'minecraft:nether_star'
cost_level: 10

result_processors:
  # Copy enchantments from source
  enchantments:
    type: copy_from_source

  # Add custom enchantments (overrides the copy above)
  # enchantments:
  #   type: add
  #   data:
  #     minecraft:sharpness: 5
  #     minecraft:mending: 1
  #     minecraft:unbreaking: 3

  # Copy display name
  display_name:
    type: copy_from_source

  # Add custom lore
  lore:
    type: add
    data:
      value:
        - "&7Legendary Weapon"
        - "&aForged with Nether Star"

  # Merge attributes
  attributes:
    type: merge_source

  # Add item flags
  item_flag:
    type: add
    data:
      value:
        - "HIDE_ENCHANTS"
        - "HIDE_ATTRIBUTES"

  # Set as unbreakable
  unbreakable:
    type: add
    data:
      value: true

  # Copy armor trim
  trim:
    type: copy_from_source
```

### Smithing Recipe Example

```yaml
type: 'vanilla_smithing_transform'
result: 'minecraft:netherite_sword'
base: 'minecraft:diamond_sword'
addition: 'minecraft:netherite_ingot'
template: 'minecraft:netherite_upgrade_smithing_template'

result_processors:
  # Copy all components
  all:
    type: copy_from_source

  # Add custom enchantments
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
```

### Smelting Recipe Example

```yaml
type: 'vanilla_smelting_furnace'
result: 'minecraft:diamond'
source: 'minecraft:coal_ore'
experience: 1.0
cooking_time: 200

result_processors:
  # Add custom lore
  lore:
    type: add
    data:
      value:
        - "&7Obtained through smelting"
```

### Custom Persistent Data (PDC) Example

```yaml
type: anvil
result: 'minecraft:diamond_sword'
base: 'minecraft:iron_sword'
addition: 'minecraft:diamond'

result_processors:
  custom_persistent_data:
    # Copy all PDC
    type: copy_from_source

    # Copy only specific key
    # type: copy_from_source
    # data:
    #   key: "myns:mykey"
    #   type: STRING

    # Set PDC key-value pairs directly
    # type: add
    # data:
    #   myns:key1: "string_value"
    #   myns:key2: 42
    #   myns:key3: true

    # Merge source PDC (only copies keys not in result)
    # type: merge_source

    # Clear all PDC
    # type: remove

    # Remove specific keys
    # type: remove
    # data:
    #   keys:
    #     - "myns:key1"
    #     - "myns:key2"
```

## Legacy Syntax Compatibility

The old `copy_components_rules` syntax is still supported and will be automatically converted to the `copy_from_source` strategy:

```yaml
# Old syntax
copy_components_rules:
  - 'enchantments'
  - 'display_name'
  - 'lore'

# Equivalent to new syntax
result_processors:
  enchantments:
    type: copy_from_source
  display_name:
    type: copy_from_source
  lore:
    type: copy_from_source
```

## AdvancedEnchantments Support

If AdvancedEnchantments plugin is installed, you can also use the `ae_enchantments` component:

```yaml
result_processors:
  ae_enchantments:
    type: copy_from_source
    # type: merge_source
    # type: remove
```
