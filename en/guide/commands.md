---
title: Command Reference
---

# Command Reference

## Main Command

```
/craftorithm <subcommand> [arguments]
```

Aliases: `/cra`, `/craft`, `/crafto`

## Subcommand List

### Recipe Management

| Command | Arguments | Description |
|---------|-----------|-------------|
| `create` | `<type> [recipe_id] [filename]` | Open recipe creation GUI |
| `edit` | `<recipe_id>` | Open recipe editing GUI |
| `remove` | `<recipe_name>` | Delete recipe file and unregister |
| `disable` | `<recipe_id>` | Disable a recipe (including vanilla recipes) |
| `display` | `<recipe_id> [player]` | Display a recipe as a GUI |
| `recipebook` | `[type]` | Open recipe book browser |

### Item Management

| Command | Arguments | Description |
|---------|-----------|-------------|
| `item save` | — | Save held item as a custom item |
| `item give` | `<item> [player]` | Give a custom item |
| `item fuel add` | `<burn_time>` | Add held item as fuel |
| `item fuel remove` | `<fuel_id>` | Remove a custom fuel |

### System Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `reload` | — | Reload plugin configuration |
| `version` | — | Display plugin version |
| `openmenu` | `<name> [player]` | Open a custom menu |
| `script` | `<expression>` | Execute a script expression |

## Recipe Type Parameters

The `create` command supports the following type values:

| Type | Description |
|------|-------------|
| `vanilla_shaped` | Shaped recipe |
| `vanilla_shapeless` | Shapeless recipe |
| `vanilla_smelting_furnace` | Furnace smelting |
| `vanilla_smelting_blast` | Blast furnace smelting |
| `vanilla_smelting_smoker` | Smoker smelting |
| `vanilla_smelting_campfire` | Campfire cooking |
| `vanilla_smithing_transform` | Smithing table transform |
| `vanilla_stonecutting` | Stonecutting |
| `vanilla_brewing` | Brewing (Paper only) |
| `anvil` | Anvil |

## Usage Examples

```bash
# Create a shaped recipe with ID my_sword, saved to weapons.yml
/cra create vanilla_shaped my_sword weapons.yml

# Edit a recipe
/cra edit craftorithm:my_sword

# Disable the vanilla diamond sword recipe
/cra disable minecraft:diamond_sword

# Display a recipe to another player
/cra display craftorithm:my_sword PlayerName

# Open the recipe book
/cra recipebook

# Execute a script
/cra script perm("craftorithm.vip")
```

## Tab Completion

All commands support tab completion:
- Recipe type auto-completion
- Registered recipe ID auto-completion
- Online player name auto-completion
- Custom menu name auto-completion
