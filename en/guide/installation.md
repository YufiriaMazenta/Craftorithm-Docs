---
title: Installation & Dependencies
---

# Installation & Dependencies

## System Requirements

| Item | Requirement |
|------|-------------|
| Java | 21+ |
| Server | Paper / Spigot 1.19.4+ |
| Folia | Fully supported |

## Installation

Place the downloaded Craftorithm-xx.jar into your plugins folder, then restart the server.

### Installation Recommendations

To experience all features, it is recommended to use Paper server or its forks, and install either packetevents or ProtocolLib. Without a packet management plugin, the virtual recipe preview feature will not be available.

## Soft Dependencies

The following plugins are optional. Installing them unlocks additional features:

| Plugin | Feature |
|--------|---------|
| Vault | Economy system (`money` condition function, `take-money`/`give-money` actions) |
| PlayerPoints | Points system (`points` condition function, `take-points`/`give-points` actions) |
| PlaceholderAPI | Variable parsing (`papi` condition function) |
| ProtocolLib | Recipe book fake result preview |
| PacketEvents | Recipe book fake result preview (ProtocolLib alternative) |

## External Item Plugin Hooks

Craftorithm supports integrating with the following item plugins, allowing you to use their item IDs directly in recipes:

| Plugin | Namespace | Item ID Format         |
|--------|-----------|------------------------|
| CraftEngine | `craftengine` | `craftengine:<id>`     |
| Nexo | `nexo` | `nexo:<id>`            |
| AzureFlow | `azureflow` | `azureflow:<id>`       |
| NeigeItems | `neigeitems` | `neigeitems:<id>`      |
| ItemsAdder | `itemsadder` | `itemsadder:<id>`      |
| Oraxen | `oraxen` | `oraxen:<id>`          |
| EcoItems | `ecoitems` | `ecoitems:<id>`        |
| ExecutableItems | `executableitems` | `executableitems:<id>` |
| MMOItems | `mmoitems` | `mmoitems:<type>:<id>` |
| MythicMobs | `mythicmobs` | `mythicmobs:<id>`      |
| SX-Item | `sx-item` | `sx-item:<id>`         |

Hook priority can be configured in `config.yml` under `item_plugin_hook_priority`.

## Plugin Directory Structure

After installation, the plugin generates the following directory structure:

```
plugins/Craftorithm/
├── config.yml           # Main configuration
├── recipes/             # Recipe files
├── triggers/            # Trigger files
├── items/               # Custom items
├── menus/               # Menu configurations
│   ├── custom/          # Custom menus
│   └── internal/        # Built-in menus (do not modify)
├── item_packs.yml       # Item pack definitions
├── custom_fuels.yml     # Custom fuels
├── disabled_recipes.yml # Disabled recipe list
└── lang/                # Language files
```

## First Startup

1. The plugin auto-detects the server locale and loads the corresponding language file
2. Generates default `config.yml` and example files
3. Registers recipes per-tick at the rate configured by `max_reg_recipe_per_tick` to avoid lag
4. Auto-detects installed external item plugins and registers hooks
