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

Example: `if gamemode("creative") && perm("craftorithm")`

#### Arithmetic Operators

`+` `-` `*` `/`

Basic arithmetic operations are supported. Multiplication and division have higher precedence than addition and subtraction. Parentheses can be used to change precedence.

Examples:
- `context("value") * 100 - 5`
- `(context("level") + 1) * 10`

The `+` operator also supports string concatenation. When either operand is a string, it automatically concatenates:

- `"Hello, " + context("name") + "!"`
- `"HP: " + context("hp")`

### Control Flow

The script system supports if-else flow control, written as follows:

```
if gamemode("creative")
tell "You are in creative mode"
elseif gamemode("survival")
tell "You are in survival mode"
elseif gamemode == "ADVENTURE"
tell "You are in adventure mode"
else
tell "You are in spectator mode"
endif
```

In YAML, it would look like this:

```yaml
left:
  - 'if gamemode("creative")'
  - 'tell "You are in creative mode"'
  - 'elseif gamemode("survival")'
  - 'tell "You are in survival mode"'
  - 'elseif gamemode == "ADVENTURE"'
  - 'tell "You are in adventure mode"'
  - 'else'
  - 'tell "You are in spectator mode"'
  - 'endif'
```

### Comments

The script system supports line comments. You can write like this: `tell "Hello world" //output statement`

### Function Nesting

In the script system, you can nest functions. For example: `tell("Is player in creative mode: ", gamemode("creative"))`

It will first run `gamemode("creative")` to get the result, then output it with tell.

Of course, you can also nest more layers. For example: `tell("Does player have permission: ", perm(context("perm")))`

This will first get the variable named perm from the context, then check if the player has that permission, and finally output the result.

### Function Naming Restrictions

Function names **may only contain letters, digits, and underscores** (`[a-zA-Z0-9_]`). **Hyphens (`-`) are not allowed.** This is because `-` is parsed as the subtraction operator by the script engine.

✅ Valid: `my_func`, `take_money`

❌ Invalid: `my-func`, `take-money`