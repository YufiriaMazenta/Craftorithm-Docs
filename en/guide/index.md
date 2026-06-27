---
title: Quick Start
---

# Quick Start

## Prerequisites

- **Java**: 21 or higher
- **Server**: Paper / Spigot 1.19.4+ (Folia supported)
- **Build tool**: CrypticLib (bundled automatically, no extra install needed)

## Download

Download the latest version from:

- [SpigotMC](https://www.spigotmc.org/resources/craftorithm-customized-crafting-management-plugin-1-13-1-20-folia-supported.108429/)
- [Modrinth](https://modrinth.com/plugin/craftorithm)
- [GitHub Releases](https://github.com/YufiriaMazenta/Craftorithm/releases)

## Installation

1. Place `Craftorithm-x.x.x.jar` into your server's `plugins/` directory
2. Restart the server
3. The plugin will generate default config files under `plugins/Craftorithm/`

## Creating Your First Recipe

After logging into the server, run the following command to open the recipe creation GUI:

```
/cra create shaped
```

1. Place crafting materials in the GUI (arranged as a shaped recipe)
2. Place the output item in the result slot
3. Click the confirm button to save

The recipe will be automatically saved to the `plugins/Craftorithm/recipes/` directory.

## Verification

Place the corresponding materials in a crafting table and confirm the recipe appears in the crafting result.

## Next Steps

- [Recipe System](/recipe/) — Learn the details of 12 recipe types
- [Configuration](/config/) — Customize plugin behavior
- [Trigger System](/trigger/) — Add conditions and actions to recipes
- [Script Engine](/script/) — Write complex conditional logic
