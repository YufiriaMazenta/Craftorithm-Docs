---
title: External Hooks
---

# External Plugin Hooks

Craftorithm integrates with 10+ external item plugins through its hook system, allowing you to use their item IDs directly in recipes.

## Supported Plugins

| Plugin | Namespace | ID Format | Notes |
|--------|-----------|-----------|-------|
| CraftEngine | `craft_engine` | `craft_engine:<id>` | — |
| Nexo | `nexo` | `nexo:<id>` | — |
| AzureFlow | `azureflow` | `azureflow:<id>` | — |
| NeigeItems | `neige_items` | `neige_items:<id>` | — |
| ItemsAdder | `items_adder` | `items_adder:<id>` | — |
| Oraxen | `oraxen` | `oraxen:<id>` | — |
| EcoItems | `ecoitems` | `ecoitems:<id>` | — |
| ExecutableItems | `executableitems` | `executableitems:<id>` | — |
| MMOItems | `mmoitems` | `mmoitems:<type>:<id>` | — |
| MythicMobs | `mythic_mobs` | `mythic_mobs:<id>` | — |
| SX-Item | `sx_item` | `sx_item:<id>` | — |
| CustomFishing | `custom_fishing` | `custom_fishing:<id>` | — |

## Usage Examples

```yaml
# Using ItemsAdder item as recipe output
type: 'vanilla_shaped'
result: 'items_adder:ruby_sword'
shape:
  - ' A '
  - ' B '
  - ' B '
ingredients:
  A: 'mythic_mobs:ruby'
  B: 'minecraft:stick'

# Using MMOItems item
type: 'vanilla_shapeless'
result: 'mmoitems:SWORD/custom_blade'
ingredients:
  - 'minecraft:diamond'
  - 'minecraft:netherite_ingot'
```

## Hook Priority

When an item is defined by multiple plugins, Craftorithm searches in the order defined by `item_plugin_hook_priority` in `config.yml` and returns the first match.
