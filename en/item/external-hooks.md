---
title: External Hooks
---

# External Plugin Hooks

Craftorithm integrates with 10+ external item plugins through its hook system, allowing you to use their item IDs directly in recipes.

## Supported Plugins

| Plugin | Namespace | ID Format              | Notes |
|--------|-----------|------------------------|-------|
| CraftEngine | `craftengine` | `craftengine:<id>`     | — |
| Nexo | `nexo` | `nexo:<id>`            | — |
| AzureFlow | `azureflow` | `azureflow:<id>`       | — |
| NeigeItems | `neigeitems` | `neigeitems:<id>`      | — |
| ItemsAdder | `itemsadder` | `itemsadder:<id>`      | Auto-reload supported |
| Oraxen | `oraxen` | `oraxen:<id>`          | Auto-reload supported |
| EcoItems | `ecoitems` | `ecoitems:<id>`        | — |
| ExecutableItems | `executableitems` | `executableitems:<id>` | — |
| MMOItems | `mmoitems` | `mmoitems:<type>:<id>` | Requires type prefix |
| MythicMobs | `mythicmobs` | `mythicmobs:<id>`      | — |
| SX-Item | `sx-item` | `sx-item:<id>`         | — |

## Usage Examples

```yaml
# Using ItemsAdder item as recipe output
type: 'vanilla_shaped'
result: 'itemsadder:ruby_sword'
shape:
  - ' A '
  - ' B '
  - ' B '
ingredients:
  A: 'mythicmobs:ruby'
  B: 'minecraft:stick'

# Using MMOItems item
type: 'vanilla_shapeless'
result: 'mmoitems:SWORD/custom_blade'
ingredients:
  - 'minecraft:diamond'
  - 'minecraft:netherite_ingot'
```

## Hook Priority

When multiple plugins register items with the same ID, Craftorithm searches in the order defined by `item_plugin_hook_priority` in `config.yml` and returns the first match.

## Auto-Reload

- **ItemsAdder**: When ItemsAdder runs `/ia reload`, Craftorithm automatically reloads recipes
- **Oraxen**: When Oraxen reloads, Craftorithm automatically reloads recipes

You can disable this behavior in `config.yml`:

```yaml
reload_when_ia_reload: false
```
