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
copy_components_rules:
  - 'enchantments'
  - 'display_name'
  - 'custom_model_data'
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

> Note: Trim recipes have no `result` field — the result is the base item with the trim applied.

## Copy Components Rules

Specifies which components to copy from the base item to the output item.

| Rule | Description | Min Version |
|------|-------------|-------------|
| `all` | Replaces entire result meta with base meta | Any |
| `enchantments` | All enchantments (keeps higher level if result already has it) | Any |
| `attributes` | Attribute modifiers | Any |
| `display_name` | Custom display name | Any |
| `custom_model_data` | Legacy custom model data integer | Any |
| `custom_model_data_component` | New custom model data component | 1.21.4+ |
| `food` | Food component | 1.20.5+ |
| `item_flag` | Item flags | Any |
| `lore` | Lore lines | Any |
| `max_stack_size` | Max stack size | 1.20.5+ |
| `rarity` | Rarity enum | 1.20.5+ |
| `tool` | Tool component | 1.21+ |
| `fire_resistance` | Fire resistant flag | 1.20.5+ |
| `hide_tooltip` | Hide tooltip flag | 1.20.5+ |
| `unbreakable` | Unbreakable flag | Any |
| `trim` | Armor trim (only works on ArmorMeta) | Any |
| `item_model` | Item model resource location | 1.21.4+ |
| `item_name` | Item name component | 1.20.5+ |
| `custom_persistent_data` | PersistentDataContainer entries | Any |

### Parameterized Rule: `custom_persistent_data`

The `custom_persistent_data` rule accepts optional parameters to copy specific persistent data entries:

```yaml
copy_components_rules:
  - display_name
  - custom_persistent_data {type:tag_container,key:"oraxen:data"}
```

The argument is parsed as a key-value map. If no argument is given, it copies the entire PersistentDataContainer.
