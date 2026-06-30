---
title: Actions
---

# Actions

Actions are written in the `actions` list of triggers and execute in order after all conditions pass.

## Syntax

```yaml
actions:
  - 'tell("&aConditions passed!")'
  - 'give-level(100)'
  - 'command("give %player_name% diamond 1")'
```