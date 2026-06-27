---
title: Permissions
---

# Permissions

## Default Permissions

| Permission Node | Description | Default |
|----------------|-------------|---------|
| `craftorithm.command` | All basic commands | OP |
| `craftorithm.command.reload` | Reload plugin | OP |
| `craftorithm.command.version` | View version | OP |
| `craftorithm.command.create` | Create recipes | OP |
| `craftorithm.command.disable` | Disable recipes | OP |
| `craftorithm.command.display` | Display recipes | OP |
| `craftorithm.command.recipebook` | Open recipe book | OP |
| `craftorithm.command.openmenu` | Open custom menus | OP |
| `craftorithm.command.script` | Execute scripts | OP |
| `craftorithm.command.item` | Item management | OP |
| `craftorithm.edit_recipe` | Edit recipes | OP |
| `craftorithm.recipe.remove` | Delete recipes | OP |

## Trigger Permissions

Custom permission nodes can be used in triggers for conditional checks:

```yaml
my_trigger:
  type: crafting
  recipes: ['craftorithm:my_recipe']
  conditions:
    - 'perm("craftorithm.trigger.vip")'
  actions:
    - 'tell("&aVIP exclusive recipe!")'
```

Permission node names can be freely defined — just reference them in the trigger's `perm()` function.

## Wildcard Permissions

Permission management plugins (such as LuckPerms) can be used to set wildcard permissions:

```
craftorithm.*          # Grant all permissions
craftorithm.command.*  # Grant all command permissions
```
