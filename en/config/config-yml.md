---
title: config.yml
---

# config.yml Reference

The main configuration file `plugins/Craftorithm/config.yml` controls core plugin behavior.

## Configuration Keys

### Basic Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `config_version` | integer | `2` | Config version, do not modify manually |
| `language` | string | `en_us` | Plugin language |
| `check_update` | boolean | `true` | Check for updates on startup |
| `debug` | boolean | `false` | Debug mode |

### Recipe Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `remove_all_vanilla_recipe` | boolean | `false` | Remove all vanilla recipes |
| `enable_anvil_recipe` | boolean | `true` | Enable custom anvil recipes |
| `max_reg_recipe_per_tick` | integer | `20` | Max recipes registered per tick (anti-lag) |

### Item Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `item_plugin_hook_priority` | list | (ordered list) | External item plugin detection priority |
| `cannot_craft_items` | list | `[]` | Item IDs that cannot be used in crafting |

### Command Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `main_command_aliases` | list | `[cra, craft, crafto]` | Main command aliases |

### Integration Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `bstats` | boolean | `true` | Enable bStats statistics |
| `reload_when_ia_reload` | boolean | `true` | Auto-reload when ItemsAdder reloads |

## Example

```yaml
config_version: 2
language: en_us
check_update: true
debug: false
remove_all_vanilla_recipe: false
enable_anvil_recipe: true
max_reg_recipe_per_tick: 20
bstats: true
reload_when_ia_reload: true
main_command_aliases:
  - cra
  - craft
  - crafto
item_plugin_hook_priority:
  - craftengine
  - nexo
  - azureflow
  - neigeitems
  - itemsadder
  - oraxen
  - ecoitems
  - executableitems
  - mmoitems
  - mythicmobs
cannot_craft_items: []
```
