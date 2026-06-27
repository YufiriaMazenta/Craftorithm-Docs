---
title: Trigger System
---

# Trigger System Overview

The trigger system executes condition checks and actions when specific events occur, providing flexible control over recipe behavior.

## What Is a Trigger

A trigger consists of four parts:

1. **Type** — the event to listen for
2. **Conditions** — expressions that must all pass before actions run
3. **Actions** — scripts executed when conditions pass
4. **Settings** — priority, cooldown, enable/disable

## Trigger Files

- Location: `plugins/Craftorithm/triggers/`
- Format: YAML
- One file can contain multiple trigger definitions

## YAML Structure

```yaml
trigger_id:                    # Unique trigger identifier
  type: 'crafting'             # Trigger type
  recipes:                     # Matched recipe list (optional, empty = match all)
    - 'craftorithm:my_recipe'
  conditions:                  # Condition script list (all must pass)
    - 'perm("craftorithm.vip")'
    - 'level >= 10'
  actions:                     # Action script list (executed in order)
    - 'tell("&aConditions passed!")'
    - 'give-level(100)'
  priority: 0                  # Execution priority (lower = earlier)
  enabled: true                # Whether enabled
  cooldown: 5                  # Cooldown in seconds, 0 = no cooldown
  per-player: true             # Per-player or global cooldown
```

## Trigger Types

### Craft Triggers (3 types)

Listen for recipe crafting events with a dual-phase mechanism (prepare + execute):

| Type | Description |
|------|-------------|
| `crafting` | Crafting table |
| `smithing` | Smithing table |
| `anvil` | Anvil |

### Dynamic Event Triggers (44+ types)

Listen for Bukkit events. See [Dynamic Events](/en/trigger/dynamic-events).

## Execution Flow

```
Event fires
  ↓
Extract context (player, recipe, event variables)
  ↓
Match triggers (sorted by priority)
  ↓
Check cooldown
  ↓
Evaluate condition script
  ↓
Conditions pass → Execute action script
  ↓
(Craft triggers) Conditions fail → Clear result slot, block crafting
```
