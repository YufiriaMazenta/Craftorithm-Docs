---
title: Craft Triggers
---

# Craft Triggers

Craft triggers listen for recipe crafting events and are the most commonly used trigger type.

## Three Craft Trigger Types

### Types
1. `crafting` - Crafting table event
2. `smithing` - Smithing table event
3. `anvil` - Anvil event

## Dual-Phase Mechanism

Craft triggers support a **prepare + execute** two-phase mechanism:

- **Prepare phase**: Evaluates conditions during `PrepareItemCraftEvent`. If conditions fail, the result slot is cleared and the player cannot craft.
- **Execute phase**: Runs actions during `CraftItemEvent` (e.g., deduct levels, send messages).

This means craft triggers can actually **block** crafting, not just respond after the fact.

## Context (1.11.2.0+)

Craft triggers add crafting material information and the batch crafting quantity to the trigger context.

The batch crafting quantity key is `craft_num`, which can only be accessed in actions. For normal click crafting, it returns 1.

### crafting

In `crafting` type triggers, you can use `ingredient_<row-1>_<col-1>` to get the raw material ID at the corresponding position, and `ingredient_<row-1>_<col-1>_amount` to get the quantity.

The row and column numbers are not affected by placement position. For example, in a 2x2 recipe, regardless of where you place it, `ingredient_0_0` always gets the item in the first row, first column.

Example:
```yaml
craft_example:
  type: crafting
  recipes:
    - 'craftorithm:shaped_01'
  conditions:
    - 'context("ingredient_0_0_amount") >= 2'
    - 'context("ingredient_0_0") != "items:example_item:1"'
```

In this example, it gets the quantity and item ID of the first row, first column material, and only allows crafting when the quantity is >= 2 and the item is not `items:example_item:1`.

### smithing

In `smithing` type triggers, you can use `template`, `base`, `addition` to get the raw materials of the three slots, and `template_amount`, `base_amount`, `addition_amount` to get the corresponding quantities.

### anvil

Similar to `smithing` type triggers, `anvil` type triggers can use `base`, `addition` to get the raw materials of the two slots, and the same way to get quantities.

## YAML Examples

### Basic Usage

```yaml
on_craft_diamond_sword:
  type: 'crafting'
  recipes:
    - 'minecraft:diamond_sword'
  actions:
    - 'tell("&aYou crafted a diamond sword!")'
```

### With Conditions

```yaml
vip_recipe:
  type: 'crafting'
  recipes:
    - 'craftorithm:vip_sword'
  conditions:
    - 'perm("craftorithm.vip")'
    - 'level >= 10'
  actions:
    - 'tell("&aVIP recipe crafted!")'
  priority: 0
```

### Level Cost

```yaml
costly_recipe:
  type: 'crafting'
  recipes:
    - 'craftorithm:legendary_sword'
  conditions:
    - 'level >= 30'
  actions:
    - 'take_level(30)'
    - 'tell("&6Cost 30 levels!")'
```

### Match All Recipes

When `recipes` is empty, the trigger matches all recipes of that type:

```yaml
on_any_craft:
  type: 'crafting'
  recipes: []
  actions:
    - 'tell("&7You crafted an item")'
```

## Cooldown

```yaml
cooldown_trigger:
  type: 'crafting'
  recipes:
    - 'craftorithm:my_recipe'
  cooldown: 10           # 10-second cooldown
  per-player: true       # Per-player cooldown
  actions:
    - 'tell("&cPlease wait for cooldown")'
```

- `per-player: true` — each player has an independent cooldown timer
- `per-player: false` — global cooldown shared by all players
