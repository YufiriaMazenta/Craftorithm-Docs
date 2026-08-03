---
title: Smithing Recipes
---

# Smithing Recipes

Smithing recipes support two subtypes: **Transform** (equipment upgrade) and **Trim** (decoration).

## Transform Recipe

Used to upgrade equipment, such as upgrading diamond gear to netherite.

### YAML Example

```yaml
type: 'vanilla_smithing_transform'
result: 'minecraft:netherite_sword'
base: 'minecraft:diamond_sword'
addition: 'minecraft:netherite_ingot'
template: 'minecraft:netherite_upgrade_smithing_template'
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `vanilla_smithing_transform` |
| `result` | string | Yes | Output item ID |
| `base` | string | Yes | Base item (the item being upgraded) |
| `addition` | string | Yes | Addition material |
| `template` | string | Yes | Smithing template (1.20+) |
| `copy_components_rules` | list | No | Component copy rules |
| `fake_result_preview` | string | No | Fake preview item shown during crafting |

## Trim Recipe

Used to add decorative trims to equipment. Requires Minecraft 1.20+.

### YAML Example

```yaml
type: 'vanilla_smithing_trim'
base: 'minecraft:diamond_chestplate'
addition: 'minecraft:iron_ingot'
template: 'minecraft:coast_armor_trim_smithing_template'
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `vanilla_smithing_trim` |
| `base` | string | Yes | Equipment being trimmed |
| `addition` | string | Yes | Trim material |
| `template` | string | Yes | Trim template |
| `fake_result_preview` | string | No | Fake preview item shown during crafting |

> Note: Trim recipes cannot set the result — the `result` configuration option is not available.

## Copy Components Rules

**Note**: Starting from version 1.13.0.0, it is recommended to use the new `result_processors` configuration option, which provides more powerful features. The old `copy_components_rules` syntax is still compatible. See [Result Processors](/en/recipe/index.md#result-processors-result_processors).

Specifies which components to copy from the base item to the output item:

| Rule | Description |
|------|-------------|
| `all` | Copy all components |
| `enchantments` | Enchantments |
| `attributes` | Attributes |
| `display_name` | Display name |
| `custom_model_data` | Custom model data |
| `custom_model_data_component` | Custom model data component (1.20.5+) |
| `food` | Food properties |
| `item_flag` | Item flags |
| `lore` | Lore text |
| `max_stack_size` | Max stack size |
| `rarity` | Rarity |
| `tool` | Tool properties |
| `fire_resistance` | Fire resistance |
| `hide_tooltip` | Hide tooltip |
| `unbreakable` | Unbreakable |
| `trim` | Trim |
| `item_model` | Item model |
| `item_name` | Item name |
| `custom_persistent_data` | Custom persistent data |
