---
title: Changelog
---

# Changelog

This page lists changes since 1.11.1.0. For older versions, see [GitHub Releases](https://github.com/YufiriaMazenta/Craftorithm/releases).

## 1.14.2.0 <Badge type="info" text="2026-09-24" />

### Update Contents

1. Added PostgreSQL support.
2. The script functions `discover_recipe` and `undiscover_recipe` can now also use regular expressions to match recipes.
3. Added a new script function `recipe_discovered`, which returns whether a player has unlocked a specific recipe.
4. Optimized plugin code structure and performance.

## 1.14.1.1 <Badge type="info" text="2026-09-17" />

### Update Contents

1. Optimized the resource release strategy when the plugin is disabled.

## 1.14.1.0 <Badge type="info" text="2026-09-17" />

### Breaking Changes

1. The `ItemProvider` interface provided by the plugin has changed, so item provider plugins written for older versions need extra adaptation to be compatible with this version
2. Item amounts can no longer be defined inside item packs; all amounts must be defined in the recipe files

### Regular Changes

1. Compatible with Minecraft 26.3
2. Item pack ingredients in anvil recipes now support specifying an amount, e.g. `item_pack:pack_name 4`
3. Added restoring online players' discovered recipes from the database after plugin reload and server startup
4. Fixed an issue where joining the server before recipe registration completed would cause already unlocked recipes to be locked again
5. Fixed an issue where ingredient restriction rules briefly stopped working during reload, allowing crafting that should have been blocked
6. Fixed item pack entries in `item_packs.yml` using `tag:` or nested item pack references (`item_pack:pack_name`) failing to parse
7. Fixed `/craftorithm item fuel add` writing invalid config keys containing amounts to `custom_fuels.yml` when holding a stack; existing invalid keys need to be removed manually
8. Fixed database connection pool connection limits, heartbeat startup timing and idle connection eviction, as well as resource leaks from unclosed DAO statements and result sets
9. Fixed a ConcurrentModificationException when saving items under certain conditions
10. Fixed a NullPointerException in the fake result preview feature under certain timing
11. Fixed the open callback of custom menus being invoked twice when menu loading fails
12. Fixed a concurrency issue with trigger data between the async reload thread and the main thread
13. Optimized internal code structure and removed unreferenced code

## 1.14.0.0 <Badge type="info" text="2026-09-09" />

### Update Contents （ @YufiriaMazenta ）

1. Added database-based cross-server recipe unlock data synchronization functionality.
2. Fixed an issue where anvil recipes could not be crafted without an anvil-type trigger

## 1.13.7.3 <Badge type="info" text="2026-09-05" />

### Update Contents （ @YufiriaMazenta ）

1. Fixed an issue where a large number of disabled recipes could instantly saturate the server's network bandwidth during plugin reload

## 1.13.7.2 <Badge type="info" text="2026-09-05" />

### Update Contents （ @YufiriaMazenta ）

1. Fixed a bug where `crafting` type triggers did not work on the crafter
2. Fixed a bug where executing the close action in the conditions of `crafting`, `smithing`, and `anvil` triggers would cause the crafting ingredients to disappear
3. Renamed the `enabled` config key in triggers to `enable` (with backward compatibility for the old `enabled` key).

## 1.13.7.1 <Badge type="info" text="2026-09-02" />

### Update Contents （ @YufiriaMazenta ）

1. Fixed the issue where MMOItems items could not be loaded in asynchronous threads.
2. Optimized the recipe loading process in the recipe creator and editor

## 1.13.7.0 <Badge type="info" text="2026-09-01" />

### Update Contents （ @YufiriaMazenta ）

1. Optimized plugin reload by using multi-threaded parallel loading to reduce performance overhead
2. Added command `/craftorithm restore <recipe_id>` to re-enable disabled recipes
3. Added config option `ingredient_use_set_threshold` to configure recipe ingredient matching behavior
4. Optimized reload notification messages
5. Optimized plugin code structure
6. Optimized recipe ingredient matching performance
7. Optimized shapeless recipe performance
8. Optimized trigger performance
9. Fixed disabled recipes not being restored after reload

## 1.13.6.0 <Badge type="info" text="2026-08-26" />

**注意，从旧版本升级到此版本建议删除`menus/internal/display`文件夹让其重新生成**

**Note: If upgrading from a previous version, please delete the `menus/internal/display` folder to let it regenerate**

### Update Contents

1. Result processors now allow other plugins to register new action types ( @YufiriaMazenta )
2. Craftorithm item sources can now also have priority configured via the `item_plugin_hook_priority` config option ( @YufiriaMazenta )
3. Fixed an issue where stonecutter recipe ingredient were displayed incorrectly in the recipe display menu ( @YufiriaMazenta )
4. Fixed incorrect text on the display menus for furnace, smoker, campfire, and smithing transform recipes ( @YufiriaMazenta )

## 1.13.5.2 <Badge type="info" text="2026-08-20" />

### Update Contents

1. Fixed an issue where the plugin failed to enable on Folia servers in version 1.13.5.1 ( @YufiriaMazenta )
2. Fixed an issue where the result processor could not parse style codes for the add operation on `display_name`, `item_name`, and `lore` ( @YufiriaMazenta )
3. Result processors of type `lore`, `display_name`, and `item_name` now support parsing PlaceholderAPI variables during add operations ( @YufiriaMazenta )

## 1.13.5.1 <Badge type="info" text="2026-08-19" />

**此版本没有任何新增特性，只是对插件的整体性能表现进行了大幅度优化**

**This version does not introduce any new features; it is solely focused on significantly optimizing the plugin's overall performance**

### Update Contents

1. Optimized the performance of ItemManager when matching item id.
2. Optimized the performance of CraftorithmItemProvider in matching item id
3. Optimized memory consumption of trigger cooldowns
4. Optimized the performance overhead of NamespacedItemId.toString()
5. Optimized recipe loading performance
6. Optimized performance overhead of UI recipe creation and editing
7. Fixed some issues that could cause memory leaks

## 1.13.5.0 <Badge type="info" text="2026-08-18" />

### Update Contents

1.  The `blocked_crafting_lore_rules` config option has been replaced by `ingredient_restriction_rules`, which is used to configure rules that block items from being used in crafting ( @YufiriaMazenta )
2. Fixed [#142](https://github.com/YufiriaMazenta/Craftorithm/issues/142) ( @YufiriaMazenta )

## 1.13.4.0 <Badge type="info" text="2026-08-17" />

**⚠️重要：不建议使用此版本，此版本因为删除了cannot_craft_items导致可能出现严重问题，请直接使用1.13.5.0**

**⚠️Important: It is not recommended to use this version. Due to the removal of the cannot_craft_items configuration, this version may cause serious issues. Please use version 1.13.5.0 instead.**

### Update Contents

1.  Added a new configuration option, blocked_crafting_lore_rules, which allows specifying lore that will block an item from being used in crafting recipes ( @YufiriaMazenta )
2. Removed `cannot_craft_items` – superseded by `blocked_crafting_lore_rules` ( @YufiriaMazenta )
3. Added PlaceholderAPI variables `%craftorithm_discovered_<recipe_key>%` and `%craftorithm_discovered%`, returning whether the player has discovered (unlocked in the recipe book) a specific recipe, and the total number of recipes the player has discovered respectively ( @YufiriaMazenta )
4. Fixed #140 ( @YufiriaMazenta )

## 1.13.3.0 <Badge type="info" text="2026-08-13" />

### Update Contents

1. Added `prepare_grindstone` and `trade_select` trigger types (@YufiriaMazenta)
2.  Added `match_item_id` function to the script system for identifying item id (@YufiriaMazenta)
3. Added global variables `server`  `recipe_manager`  ` item_manager` to the script system, which can now be used in triggers, the script command, and menus (@YufiriaMazenta)
4. The script subcommand now returns the time taken in nanoseconds instead of milliseconds (@YufiriaMazenta)
5. Added CustomFishing item source adapter ([#138](https://github.com/YufiriaMazenta/Craftorithm/pull/138))  (@bai779)
6. Added support for EmakiItem 2.7.0 (@YufiriaMazenta)
7. Fixed [#136](https://github.com/YufiriaMazenta/Craftorithm/issues/136) (@YufiriaMazenta)
8. Fixed [#139](https://github.com/YufiriaMazenta/Craftorithm/issues/139) (@YufiriaMazenta)

## 1.13.2.0 <Badge type="info" text="2026-08-07" />

### Update Contents

1. Now stonecutter recipes can also use result processors(Paper and its forks only).
2. Result processors now support defining multiple processors within one component type.
3. Fixed an issue where the attribute result processor did not support versions 1.20 to 1.20.4.
4. Fixed an issue where reloading, enabling, or disabling datapacks would cause plugin recipes to become invalid(Paper and its forks only).
5. Fixed a bug where the create command and the recipe creation menu could not use the '/' symbol as a recipe name.

## 1.13.1.0 <Badge type="info" text="2026-08-06" />

### Update Contents

1. Now item pack can import items from tags or other item packs
2. Fixed https://github.com/YufiriaMazenta/Craftorithm/issues/135
3. Change the configuration file directory for the recipe book UI from `menus/internal/recipeBook` to `menus/internal/recipe_book`

## 1.13.0.0 <Badge type="info" text="2026-08-03" />

### Update Contents

1. Added a result processor feature to add additional effects to the recipe output during crafting.
2. Added an `event` object to the context of all trigger types, allowing manipulation of related event behaviors.
3. Added commands `/craftorithm discover <target> <recipe_key_pattern>` and `/craftorithm undiscover <target> <recipe_key_pattern>`, which respectively unlock and lock recipes in the recipe book for players. The `<recipe_key_pattern>` supports regex.
4. Fixed an issue where the `sound` function in triggers would throw an error when encountering an unparseable sound.
5. Fixed an issue where tab completion for `/craftorithm display` only listed the plugin's own recipes.
6. Fixed an issue on Minecraft versions 1.21.3 and above where smithing table recipes could not place ingredients in the correct slots in some cases.
7. Optimized code structure and performance.

## 1.12.2.0 <Badge type="info" text="2026-07-31" />

### Update Contents

1. The script syntax has undergone major changes. The shorthand format like `tell "hello world"` is no longer supported; you must now use the full function syntax, e.g., `tell("hello world")`.
2. Swapped the positions of the ingredient and input fields in the brewing recipe creation/editing UI.
3. Fixed a bug where brewing recipes would not produce the correct result on version 1.26.1.
4. Fixed an issue where brewing recipe result refreshing would sometimes fail to update all slots or correctly override the result stack size.

## 1.12.1.0 <Badge type="info" text="2026-07-28" />

### Update Contents

1. Changed the behavior of the `set_inv_item` function; it will now attempt to place the item in another slot or drop it if the target slot already contains an item.
2. The script now disallows bare argument syntax by default; the `enable_script_bare_args` config option must be enabled to use it.
3. Added compatibility for EmakiItem plugin item sources.
4. Fixed an issue where anvil recipes did not correctly display the result when renaming items.
5. Fixed an issue where the enchantment copying rule did not use the higher base enchantment level.
6. Fixed a parsing error with tagged materials that have quantities in anvil recipes.
7. Fixed a NullPointerException (NPE) issue with anvils on versions below 1.21 when the recipe no longer matches.
8. Fixed an issue where custom actions were executed twice when clicking to edit the recipe display icon.
9. Fixed an issue where Spigot 1.21.11 could not register recipes because the recipe registry implementation for 1.21.11 was not packaged.
11. Optimized code structure and performance.

## 1.12.0.3 <Badge type="info" text="2026-07-24" />

### Update Contents

1. Fixed brewing recipe creation errors on minecraft 1.20.1–1.20.2.
2. Fixed a bug in 1.21+ where shapeless multi‑ingredient recipes could bypass checks and accept invalid items in certain slot arrangements

## 1.12.0.2 <Badge type="info" text="2026-07-23" />

### Update Contents

1. Fixed an issue where opening the recipe book menu for all recipes would cause an error when trim type smithing recipes were present
2. Fixed an issue where the brewing recipe display menu could not be opened correctly
3. Fixed an issue where the command and console functions would cause errors in the folia environment

## 1.12.0.1 <Badge type="info" text="2026-07-22" />

### Update Contents

1. Fixed the issue where the disable command could not correctly disable special recipes
2. Optimized plugin memory usage

## 1.12.0.0 <Badge type="info" text="2026-07-21" />

### Update Contents

1. Except for stonecutter recipes on versions above 1.21.3, all recipe ingredients checks are performed by item ID. This means that adding enchantments or renaming items will no longer prevent crafting.
2. Fixed an issue where SmithingTrimRecipe could not be used correctly. For versions above 1.21.5, the trim_pattern must now be specified for smithing trim recipes
3. Added new APIs for recipe registration and material identification
4. Optimized plugin reload performance, and fixed network lag and client-side stuttering that occurred during reload
5. Fixed an issue where shapeless recipe creation pages could create null item materials
6. Improved UI text display
7. The `script` command can now be executed from the console
8. Added compatibility with VaultUnlocked

## 1.11.4.1 <Badge type="info" text="2026-07-11" />

### Update Contents

1. Fixed the issue where the sorting button text in the recipe_list menu was not parsed correctly
2. The recipebook command now supports passing all as an argument to view all recipes
3. Tags now support the `tag:<namespace>:<key>` syntax to allow reading tags added by data packs

## 1.11.4.0 <Badge type="info" text="2026-07-11" />

### Update Contents

1. The tag syntax now supports `tag:<namespace>:<key>` to allow reading newly added item tags from datapacks
2. Now the trigger's conditions supports two writing styles: simple expressions and full scripts
3. Added int and float functions to the script module for forcing a numeric variable to integer or float type
4. Fixed issue #124
5. Fixed an error with update checking

## 1.11.3.0 <Badge type="info" text="2026-07-08" />

### Update Contents

1. Fixed an issue where BackIcon would throw an error when asynchronously closing a page with no parent page.
2. Added several math-related functions to the script module.
3. Optimized the update checking mechanism.

## 1.11.2.0 <Badge type="info" text="2026-07-07" />

### Update Contents

1. Added script function `set_inv_item` for setting the item at a specified slot in a container opened by a player
2. Now the crafting event-related trigger context includes the IDs and counts of crafting ingredients, as well as the number of times the crafting is performed in a single event
3. If a trigger of a recipe is on cooldown, this crafting and all related triggers will be blocked
4. Optimized argument parsing for the recipebook command; the current usage format is `/craftorithm recipebook [--player <name>] [--type <type>]`
5. Fixed the issue where the lore of RecipeDisplayIcon would duplicate

## 1.11.1.1 <Badge type="info" text="2026-07-05" />

### Update Contents

1. Fixed an issue where ProtocolLib hooks would throw exceptions in certain situations

## 1.11.1.0 <Badge type="info" text="2026-07-04" />

### Compatibility Notes

- **Minimum Minecraft version raised**: Minimum supported version raised from 1.19 to **1.20**
- **Recipe file format changes**: Recipe files will be auto-converted, but `random_cooking` type recipes have been removed
- **Script system**: Legacy script system removed, `function.yml` file is no longer functional
- **packetevents / ProtocolLib**: Optimization for client lag caused by recipe updates and virtual recipe preview require one of these to be installed

---

### New Plugin Documentation

https://yufiriamazenta.github.io/Craftorithm-Docs/

---

### New Features

#### New Script Engine
- Full DSL script engine: Lexer → AST → Compiler → Stack-based VM
- Supports conditionals (`if/elseif/else`), arithmetic operators (`+` `-` `*` `/` `%`), string concatenation, negation (`!`)
- Supports variables (`set`/`get`), delayed execution (`delay`), logging (`log`), sound playback (`sound`)
- Built-in condition functions: `game_mode`, `permission`, `item`, `compare`, etc.
- Built-in action functions: `tell`, `give`, `run_cmd`, `take_item`, `play_sound`, etc.
- New `/craftorithm script` subcommand for executing scripts

#### New Trigger System
- New Trigger module supporting dozens of trigger types, monitoring recipe crafting, item usage, and more

#### UI Improvements
- Enhanced recipe list page: recipe list, type selection menu, sort by time/name, opened via `/craftorithm recipebook`
- Recipe creator UI rewritten
- Recipe editor UI rewritten
- Recipe display pages are now customizable via YAML config files for layout and icons
- New custom menu feature, create custom interfaces via YAML config files
- Menu buttons support binding script actions by click type (`actions` config)
- Menu buttons support `item_model` field

#### Other New Features
- Automatic legacy recipe format conversion (`LegacyRecipeMigrator`)
- Virtual recipe preview based on packetevents or ProtocolLib
- New `main_command_aliases` config option for setting main command aliases
- New tick-batched loading, distributes recipe loading across multiple ticks to reduce lag
- New `ItemPack` item pack feature, allowing a ingredient slot to accept multiple items, similar to vanilla tags
- New SX-Item hook
- New item component copy system for anvil and smithing recipes (`copy_components_rules`), supports: `all`, `item_name`, `item_model`, `trim`, `unbreakable`, `tool`, `hide_tooltip`, `fire_resistance`, `custom_model_data_component`, `display_name`, `lore`, `enchantments`, `attributes`, `item_flag`, `max_stack_size`, `rarity`, `food`, `custom_model_data`, `custom_persistent_data`

#### API Extensions
- New `RecipeRegisterEvent` event
- Expanded `CraftorithmAPI` (new item management, recipe management, trigger management methods)
---

### Bug Fixes

- Fixed a bug where server recipe cache and disabled recipes could malfunction
- Fixed `disable_recipes.yml` duplicate recording issue
---

### Optimizations

- Optimized client lag during recipe updates
- Improved listener restoration logic for other plugins during reload

---

