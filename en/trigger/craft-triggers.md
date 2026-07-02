---
title: Craft Triggers
---

# Craft Triggers

Craft triggers listen for recipe crafting events and are the most commonly used trigger type.

## Three Craft Trigger Types

| Type | Execute Event | Prepare Event |
|------|--------------|---------------|
| `crafting` | CraftItemEvent | PrepareItemCraftEvent |
| `smithing` | SmithItemEvent | PrepareSmithingEvent |
| `anvil` | InventoryClickEvent (slot 2) | PrepareAnvilEvent |

## Dual-Phase Mechanism

Craft triggers support a **prepare + execute** two-phase mechanism:

- **Prepare phase**: Evaluates conditions during `PrepareItemCraftEvent`. If conditions fail, the result slot is cleared and the player cannot craft.
- **Execute phase**: Runs actions during `CraftItemEvent` (e.g., deduct levels, send messages).

This means craft triggers can actually **block** crafting, not just respond after the fact.

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
