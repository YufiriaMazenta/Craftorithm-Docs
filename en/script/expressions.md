---
title: Expressions
---

# Expressions and Operators

## Literals

```yaml
# String — enclosed in double quotes
"hello world"

# Number — integer or float
100
3.14
-5

# Boolean
true
false
```

## Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal | `level == 10` |
| `!=` | Not equal | `level != 0` |
| `>` | Greater than | `level > 5` |
| `>=` | Greater or equal | `level >= 10` |
| `<` | Less than | `money < 100` |
| `<=` | Less or equal | `money <= 100` |

When one operand is numeric, numeric comparison is used; otherwise string comparison.

## Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | Logical AND (short-circuit) | `level >= 10 && money >= 100` |
| `\|\|` | Logical OR (short-circuit) | `perm("a") \|\| perm("b")` |
| `!` | Logical NOT | `!perm("banned")` |

`&&` and `||` support short-circuit evaluation: `&&` stops if the left side is false; `||` stops if the left side is true.

## Function Calls

### Parenthesized (Recommended)

```
perm("craftorithm.vip")
tell("&aHello!")
title("&aTitle", "&bSubtitle")
```

### Bare Arguments

```
perm "craftorithm.vip"
tell "&aHello!"
level >= 10
```

Arguments are space-separated and stop collecting at operators (`==`, `>=`, `&&`, etc.).

### No-Argument Calls

```
level
money
in_water
```

Identifiers followed by operators, newlines, or EOF are treated as zero-argument function calls.

## Conditional Control Flow

```
if perm "craftorithm.admin"
    tell "&cAdmin hello"
elseif level >= 10
    tell "&aAdvanced player"
else
    tell "&7Normal player"
endif
```

- `if` / `elseif` followed by a condition expression
- `else` branch is optional
- `endif` terminates the conditional block

## Return Statement

```
if level < 10
    return
endif
tell "&aYou reached level 10"
```

Terminates script execution immediately.

## Operator Precedence

From highest to lowest:

1. `()` Parentheses
2. `!` Logical NOT
3. Comparison: `==`, `!=`, `>`, `>=`, `<`, `<=`
4. `&&` Logical AND
5. `||` Logical OR

## Expression Examples

```
// Multiple conditions
level >= 10 && money >= 1000 && perm("craftorithm.vip")

// Complex logic with parentheses
(perm("a") || perm("b")) && level >= 5

// Function return value comparison
papi("%player_level%") >= "10"
```
