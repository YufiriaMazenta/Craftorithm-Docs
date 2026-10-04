---
title: Permissions
---

# Permissions

::: tip Permission Structure
Since 1.15.1.0, permissions use a capability-oriented naming scheme in the format `craftorithm.<domain>.<capability>`, and commands share the same permissions with menus. If you previously configured the old nodes (such as `craftorithm.command.create` or `craftorithm.edit_recipe`) in a permission plugin, you need to migrate to the new nodes.
:::

## Default Permissions

| Permission Node | Description | Default |
|----------------|-------------|---------|
| `craftorithm.command` | All basic commands (root command) | OP |
| `craftorithm.command.reload` | Reload plugin | OP |
| `craftorithm.command.version` | View version | OP |
| `craftorithm.command.script` | Execute scripts | OP |
| `craftorithm.command.openmenu` | Open custom menus | OP |
| `craftorithm.command.recipebook` | Open recipe book | OP |
| `craftorithm.recipe.create` | Create recipes | OP |
| `craftorithm.recipe.remove` | Delete recipes | OP |
| `craftorithm.recipe.edit` | Edit recipes | OP |
| `craftorithm.recipe.display` | Display recipes | OP |
| `craftorithm.recipe.disable` | Disable recipes | OP |
| `craftorithm.recipe.restore` | Restore disabled recipes | OP |
| `craftorithm.recipe.discover` | Unlock recipes for players | OP |
| `craftorithm.recipe.undiscover` | Lock recipes for players | OP |
| `craftorithm.item` | Item management | OP |

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
