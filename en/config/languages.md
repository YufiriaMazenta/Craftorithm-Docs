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

## Configuration

Set the language in `config.yml`:

```yaml
language: en_us
```

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

## Placeholders

Language files support the following placeholders:

| Placeholder | Description |
|-------------|-------------|
| `<prefix>` | Plugin prefix |
| `<version>` | Plugin version |
| `<player_name>` | Player name |
| `<item_name>` | Item name |
| `<recipe_name>` | Recipe name |
| `<menu_name>` | Menu name |
| `<time>` | Time |
| `<recipe_type>` | Recipe type name |

## Custom Language

1. Copy an existing language file
2. Change the `language` value in `config.yml` to your custom filename
3. Edit the translations
