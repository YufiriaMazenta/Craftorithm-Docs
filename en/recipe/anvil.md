---
title: Anvil Recipes
---

# Anvil Recipes

Anvil recipes allow custom anvil crafting behavior with experience cost and component copying support.

## YAML Example

```yaml
type: 'anvil'
result: 'minecraft:diamond_sword'
base: 'minecraft:iron_sword'
addition: 'minecraft:diamond'
cost_level: 3
copy_components_rules:
  - 'enchantments'
  - 'display_name'
  - 'lore'
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `anvil` |
| `result` | string | Yes | Output item ID |
| `base` | string | Yes | Left anvil slot item (base item) |
| `addition` | string | Yes | Right anvil slot item (addition material) |
| `cost_level` | integer | No | Experience levels consumed, default `0` |
| `copy_components_rules` | list | No | Component copy rules (see Smithing Recipes) |
| `fake_result_preview` | string | No | Fake preview item shown during crafting |

## Difference from Vanilla Anvil

- Vanilla anvil: item repair, enchantment combining, renaming
- Custom anvil recipes: fully custom input → output mapping, bypassing vanilla logic

## Enable / Disable

Anvil recipe functionality can be globally controlled in `config.yml`:

```yaml
enable_anvil_recipe: true
```

Set to `false` to disable all custom anvil recipes.

## Copy Components Rules

**Note**: Starting from version 1.13.0.0, it is recommended to use the new `result_processors` configuration option, which provides more powerful features. The old `copy_components_rules` syntax is still compatible. See [Result Processors](/en/recipe/index.md#result-processors-result_processors).

Same as smithing recipes. See [Smithing Recipes — Copy Components Rules](/recipe/smithing#copy-components-rules) for the full list of supported rules.

## Notes

- Both `base` and `addition` support item packs (`item_pack:`)
- `cost_level` of 0 means no experience is consumed
- When multiple anvil recipes match the same input, the first matching recipe is used
