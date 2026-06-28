---
title: Languages
---

# Languages

## Supported Languages

| Language | File |
|----------|------|
| English | `en_us.yml` |
| 简体中文 (Simplified Chinese) | `zh_cn.yml` |
| 繁體中文 (Traditional Chinese) | `zh_tw.yml` |
| 香港中文 (Hong Kong Chinese) | `zh_hk.yml` |
| 日本語 (Japanese) | `ja_jp.yml` |
| Русский (Russian) | `ru_ru.yml` |
| Deutsch (German) | `de_de.yml` |
| Français (French) | `fr_fr.yml` |
| Español (Spanish) | `es_es.yml` |
| Türkçe (Turkish) | `tr_tr.yml` |

## How It Works

The plugin automatically detects the player's client language and loads the corresponding language file. No manual configuration is required.

## Language File Structure

```yaml
prefix: '&8[&3Craftorithm&8]'
command:
  no_perm: '&cYou do not have permission to execute this command'
  player_only: '&cThis command can only be executed by a player'
  reload:
    success: '&aReload successful'
  create:
    success: '&aRecipe created successfully'
recipe_type_name:
  vanilla_shaped: 'Shaped Recipe'
  vanilla_shapeless: 'Shapeless Recipe'
# ...
```

## Custom Language

1. Create a YAML file in `plugins/Craftorithm/lang/` with a Minecraft language code name, e.g., `en_us.yml`
2. Copy the structure from an existing language file into your file
3. Edit the translations
4. Reload the plugin
