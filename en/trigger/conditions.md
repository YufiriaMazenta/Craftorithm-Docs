---
title: Conditions
---

# Condition Functions

Condition functions are used in the `conditions` list of triggers to determine whether actions should execute.

## Syntax

Each string in the conditions list is a condition expression. Multiple conditions are implicitly connected with `&&` (all must pass).

```yaml
conditions:
  - 'perm("craftorithm.vip")'
  - 'level >= 10'
  - 'world("world_nether")'
```

## Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal | `level == 10` |
| `!=` | Not equal | `level != 0` |
| `>` | Greater than | `level > 5` |
| `>=` | Greater or equal | `level >= 10` |
| `<` | Less than | `money < 100` |
| `<=` | Less or equal | `money <= 100` |
| `&&` | Logical AND | `level >= 10 && money >= 100` |
| `\|\|` | Logical OR | `perm("a") \|\| perm("b")` |
| `!` | Logical NOT | `!perm("craftorithm.banned")` |

## Function Reference

### perm — Permission Check

```yaml
- 'perm("craftorithm.vip")'
```

- Returns: `boolean`
- Checks whether the player has the specified permission node (supports PlaceholderAPI resolution)

### papi — PlaceholderAPI Variable

```yaml
- 'papi("%player_level%") >= 10'
- 'papi("%vault_eco_balance%") >= 1000'
```

- Returns: `number` or `string`
- Resolves PlaceholderAPI variables; return value is automatically converted to a number for comparison

### level — Player Level

```yaml
- 'level >= 10'
```

- Returns: `number`
- Gets the player's experience level

### money — Vault Balance

```yaml
- 'money >= 1000'
```

- Returns: `number`
- Gets the player's Vault economy balance (requires Vault)

### points — PlayerPoints

```yaml
- 'points >= 50'
```

- Returns: `number`
- Gets the player's PlayerPoints balance (requires PlayerPoints)

### world — World Check

```yaml
- 'world("world_nether")'
- 'world("world")'
```

- Returns: `string` (no argument) or `boolean` (with argument)
- No argument returns the current world name; with argument checks if the player is in the specified world

### game_mode — Game Mode

```yaml
- 'game_mode("SURVIVAL")'
- 'game_mode("CREATIVE")'
```

- Returns: `string` (no argument) or `boolean` (with argument)
- No argument returns the current game mode; with argument checks if the player is in the specified mode (case-insensitive)

### item — Item Check

```yaml
- 'item("craftorithm:my_item")'
- 'item("minecraft:diamond") >= 5'
```

- Returns: `boolean`
- Checks the event-related item ID; optionally checks quantity

### biome — Biome Check

```yaml
- 'biome("minecraft:ocean")'
- 'biome("minecraft:desert")'
```

- Returns: `boolean`
- Checks the biome at the player's location (case-insensitive)

### in_water — Water Check

```yaml
- 'in_water'
```

- Returns: `boolean`
- Checks if the player is standing in water

### in_rain — Rain Check

```yaml
- 'in_rain'
```

- Returns: `boolean`
- Checks if the player is in rain or a thunderstorm

### light_level — Light Level

```yaml
- 'light_level >= 7'
```

- Returns: `number` (no comparison) or `boolean` (with comparison)
- Gets the light level at the player's location

### context — Context Variable

```yaml
- 'context("entity_type") == "ZOMBIE"'
- 'context("damage") >= 10'
- 'context("message")'
```

- Returns: `any`
- Reads variables from the trigger context (automatically injected by events)

## Combined Example

```yaml
conditions:
  - 'perm("craftorithm.vip")'
  - 'level >= 10'
  - 'money >= 1000'
  - 'world("world")'
  - 'game_mode("SURVIVAL")'
```

All conditions above must be satisfied for the actions to execute.
