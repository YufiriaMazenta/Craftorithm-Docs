---
title: Event triggers
---

# Event triggers

Craftorithm supports 44+ Bukkit event types as trigger types, covering player, entity, inventory, and block events.

## Usage

Set the event name as the `type` field in your trigger YAML:

```yaml
my_trigger:
  type: 'player_join'
  actions:
    - 'tell("&aWelcome!")'
```

## Event List

### Player Events

| Event | Description | Context Variables |
|-------|-------------|-------------------|
| `player_join` | Player joins | — |
| `player_quit` | Player quits | — |
| `player_death` | Player dies | `killer_name` |
| `player_respawn` | Player respawns | — |
| `player_interact` | Player interacts | `action` |
| `player_interact_entity` | Interact with entity | `entity_type` |
| `player_interact_at_entity` | Interact at entity location | — |
| `player_advancement` | Advancement completed | `advancement` |
| `player_level_change` | Level changes | `old_level`, `new_level` |
| `player_exp_change` | Experience changes | `amount` |
| `player_toggle_sneak` | Sneak toggle | `sneaking` |
| `player_toggle_sprint` | Sprint toggle | `sprinting` |
| `player_item_consume` | Item consumed | `item` |
| `player_item_held` | Held item slot changes | `previous_slot`, `new_slot` |
| `player_animation` | Player animation | `animation` |
| `player_bed_enter` | Enter bed | — |
| `player_bed_leave` | Leave bed | — |
| `player_bucket_fill` | Fill bucket | — |
| `player_bucket_empty` | Empty bucket | — |
| `player_changed_world` | World change | `from` |
| `player_portal` | Enter portal | — |
| `player_teleport` | Teleport | `cause` |
| `player_fish` | Fishing | `state` |
| `player_shear_entity` | Shear entity | — |
| `player_unleash_entity` | Unleash entity | — |
| `player_edit_book` | Edit book | — |
| `player_statistic` | Statistic increase | `statistic` |
| `player_swap_hand_items` | Swap hand items | — |
| `player_drop_item` | Drop item | `item` |
| `player_pickup_item` | Pick up item | `item` |
| `player_velocity` | Velocity change | — |
| `player_game_mode_change` | Game mode change | `new_game_mode` |
| `player_resource_pack_status` | Resource pack status | `status` |
| `player_item_damage` | Item durability loss | `item`, `damage` |
| `player_item_mend` | Mending | `item`, `repair_amount` |
| `player_recipe_discover` | Recipe discovered | `recipe` |
| `player_take_campfire` | Take item from campfire | — |
| `player_move` | Player moves (actual displacement only) | — |
| `player_command_preprocess` | Command preprocessing | `message` |
| `async_player_chat` | Async chat | `message` |

### Entity Events

| Event | Description | Context Variables |
|-------|-------------|-------------------|
| `damage_entity` | Entity damaged by player | `damage`, `entity_type`, `entity_name` |
| `kill_entity` | Entity killed by player | `entity_type`, `entity_name` |
| `entity_shoot_bow` | Shoot bow | `force` |
| `entity_breed` | Breeding | — |
| `entity_tame` | Taming | — |
| `entity_potion_effect` | Potion effect change | — |

### Inventory Events

| Event | Description | Context Variables |
|-------|-------------|-------------------|
| `inventory_click` | Click slot | `slot` |
| `inventory_close` | Close inventory | — |
| `inventory_open` | Open inventory | — |

### Block Events

| Event | Description | Context Variables |
|-------|-------------|-------------------|
| `block_break` | Break block | `block_type` |
| `block_place` | Place block | `block_type` |

## Context Variables

Each event type automatically injects relevant variables into the script context. Access them via `context("variable_name")`.

### Example: Check Killed Entity Type

```yaml
on_kill_zombie:
  type: 'kill_entity'
  conditions:
    - 'context("entity_type") == "ZOMBIE"'
  actions:
    - 'tell("&aYou killed a zombie!")'
```

### Example: Check Advancement

```yaml
on_diamond_advancement:
  type: 'player_advancement'
  conditions:
    - 'context("advancement") == "minecraft:story/mine_diamond"'
  actions:
    - 'tell("&bYou found diamonds!")'
    - 'give-money(1000)'
```

### Example: Check Chat Message

```yaml
on_keyword:
  type: 'async_player_chat'
  conditions:
    - 'perm("craftorithm.vip")'
  actions:
    - 'tell("&aVIP spoke!")'
```
