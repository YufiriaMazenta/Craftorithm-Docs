---
title: Actions
---

# Action Functions

Action functions are used in the `actions` list of triggers. They execute in order after conditions pass.

## Syntax

```yaml
actions:
  - 'tell("&aConditions passed!")'
  - 'give-level(100)'
  - 'command("give %player% diamond 1")'
```

## Messages

### tell — Chat Message

```yaml
- 'tell("&aHello!")'
- 'tell("&aHello ", "&bWorld!")'
```

- Multiple arguments are concatenated automatically
- Supports `&` color codes

### actionbar — Action Bar

```yaml
- 'actionbar("&eNotification")'
```

### title — Title

```yaml
- 'title("&aMain Title", "&bSubtitle")'
```

- Argument 1: main title
- Argument 2: subtitle
- Fade in / stay / fade out: 10 / 70 / 20 ticks

## Command Execution

### command — Execute as Player

```yaml
- 'command("give %player% diamond 1")'
- 'command("spawn")'
```

- Executes with player permissions
- `%player%` is replaced with the player's name

### console — Execute as Console

```yaml
- 'console("say Server announcement")'
- 'console("give %player% diamond 1")'
```

- Executes with console permissions
- Also supports `%player%` placeholder

## Economy

### take-money / give-money

```yaml
- 'take-money(100)'
- 'give-money(1000)'
```

- Requires Vault
- Parameter: amount

### take-level / give-level

```yaml
- 'take-level(5)'
- 'give-level(10)'
```

- Parameter: experience level count

### give-exp

```yaml
- 'give-exp(50)'
```

- Parameter: experience points (not levels)

### take-points / give-points

```yaml
- 'take-points(50)'
- 'give-points(100)'
```

- Requires PlayerPoints
- Parameter: point count

## Recipe Management

### discover-recipe / undiscover-recipe

```yaml
- 'discover-recipe("craftorithm:my_recipe")'
- 'undiscover-recipe("minecraft:diamond_sword")'
```

- Unlocks/locks a recipe (visible/invisible to the player)

## Inventory

### close — Close Inventory

```yaml
- 'close'
```

- Closes the player's currently open inventory

## Variable Operations

### set — Set Context Variable

```yaml
- 'set("key", "value")'
- 'set("count", 100)'
```

- Sets a variable in the script context for use by subsequent conditions or actions

## Combined Example

```yaml
actions:
  - 'take-money(100)'
  - 'take-level(5)'
  - 'give-level(10)'
  - 'command("give %player% diamond_sword 1")'
  - 'tell("&aCrafted! Cost 100 coins and 5 levels")'
  - 'actionbar("&e+1 Diamond Sword")'
```
