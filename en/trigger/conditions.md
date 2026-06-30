---
title: Conditions
---

# Conditions

In each trigger, you can write conditions to determine whether the trigger should execute.

Conditions are written in the `conditions` list of triggers. Each string in the conditions list is a condition expression, and multiple conditions are implicitly connected with `&&` (all must pass).

## Syntax

In conditions, you can only use expressions that return a Bool (boolean) type, otherwise an error will occur.

### Example

```yaml
conditions:
  - 'perm("craftorithm.vip")'
  - 'level >= 10'
  - 'world("world_nether")'
```