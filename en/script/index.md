---
title: Script Engine
---

# Script Engine Overview

Craftorithm includes a compiled script engine used for trigger condition evaluation and action execution.

## Usage

[Trigger](/en/trigger/index.md)'s `conditions` and `actions` are essentially script expressions.

[Menu](/en/ui/index.md) icon actions and custom page's open_actions and close_actions.

## Documentation Navigation

- [Built-in Functions](/en/script/functions.md)

## Syntax

## Data Types

Craftorithm's script system has four data types as follows:

| Type | Description | Example |
|------|-------------|---------|
| `Str` | String | `"hello"` |
| `Num` | Number | `100`, `3.14`, `-5` |
| `Bool` | Boolean | `true`, `false` |
| `NullValue` | Null | — |

When parsing, strings must be enclosed in double quotes, otherwise unexpected errors will occur.

### Basic Syntax

The script supports two syntaxes: `tell "Hello, World!"` and `tell("Hello, World!")`.

Generally, the second syntax is recommended as it is more intuitive.

### Operators

The script supports multiple operators.

#### Comparison Operators:

`>` `<` `==` `>=` `<=` `!=`

#### Logical NOT Operator:

`!`

Example: `!perm("craftorithm.perm")`

#### Binary Infix Operators:

`&&` `||`

Example: `if game_mode("creative") && perm("craftorithm")`

### Control Flow

The script system supports if-else flow control, written as follows:

```
if game_mode("creative")
tell "You are in creative mode"
elseif game_mode("survival")
tell "You are in survival mode"
elseif game_mode == "ADVENTURE"
tell "You are in adventure mode"
else
tell "You are in spectator mode"
endif
```

In YAML, it would look like this:

```yaml
left:
  - 'if game_mode("creative")'
  - 'tell "You are in creative mode"'
  - 'elseif game_mode("survival")'
  - 'tell "You are in survival mode"'
  - 'elseif game_mode == "ADVENTURE"'
  - 'tell "You are in adventure mode"'
  - 'else'
  - 'tell "You are in spectator mode"'
  - 'endif'
```

### Comments

The script system supports line comments. You can write like this: `tell "Hello world" //output statement`

### Function Nesting

In the script system, you can nest functions. For example: `tell("Is player in creative mode: ", game_mode("creative"))`

It will first run `game_mode("creative")` to get the result, then output it with tell.

Of course, you can also nest more layers. For example: `tell("Does player have permission: ", perm(context("perm")))`

This will first get the variable named perm from the context, then check if the player has that permission, and finally output the result.