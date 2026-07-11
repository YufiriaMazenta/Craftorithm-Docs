---
title: Conditions
---

# Conditions

In each trigger, you can write conditions to determine whether the trigger should execute.

Conditions are written in the `conditions` list of triggers. Each string in the conditions list is a condition expression, and multiple conditions are implicitly connected with `&&` (all must pass).

## Syntax

### Version 1.11.4.0 and later

Conditions support multiple syntaxes as follows:

#### 1. Legacy syntax (backward compatible):

In this syntax, `conditions` is a list. Each expression in the list must return a Bool type variable, otherwise an error will occur.

When all conditions are met, the conditions pass.

Example:

```yaml
conditions:
  - 'perm("craftorithm.vip")'
  - 'level >= 10'
  - 'world("world_nether")'
```

#### 2. New syntax

In the new syntax, the structure of `conditions` is as follows:

```yaml
conditions:
  mode: and / script
  body:
    - '...'
    - '...'
```

`mode` is used to set how to parse the content written in `body`. There are two types: `and` and `script`.

In `and` mode, the content in `body` is parsed the same way as the legacy syntax - each item is an expression and all must be satisfied to pass.

In `script` mode, the content in `body` is recognized as a complete script code block. You need to manually use `return` to return the result.

Example:

```yaml
script_conditions:
  type: crafting
  recipes:
    - 'craftorithm:shaped_01'
  conditions:
    mode: 'script'
    body:
      - 'if !perm("craftorithm.recipe.1")'
      - '  tell("&cYou don\'t have permission!")'
      - '  close'
      - '  return false'
      - 'elseif context("ingredient_0_0_amount") < 2'
      - '  tell("&cNot enough materials!")'
      - '  close'
      - '  return false'
      - 'elseif context("ingredient_0_0") == "items:example_item:1"'
      - '  tell("&cCannot use this material!")'
      - '  close'
      - '  return false'
      - 'else'
      - '  return true'
      - 'endif'
  actions:
    - 'tell "&aCrafting successful! Consumed 10 levels of experience"'
```
