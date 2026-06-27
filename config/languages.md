---
title: 多语言
---

# 多语言

## 支持的语言

| 语言 | 文件名 |
|------|--------|
| English | `en_us.yml` |
| 简体中文 | `zh_cn.yml` |
| 繁體中文 | `zh_tw.yml` |
| 香港中文 | `zh_hk.yml` |
| 日本語 | `ja_jp.yml` |
| Русский | `ru_ru.yml` |
| Deutsch | `de_de.yml` |
| Français | `fr_fr.yml` |
| Español | `es_es.yml` |
| Türkçe | `tr_tr.yml` |

## 配置方式

在 `config.yml` 中设置语言：

```yaml
language: zh_cn
```

## 语言文件结构

```yaml
prefix: '&8[&3Craftorithm&8]'
command:
  no_perm: '&c你没有权限执行此命令'
  player_only: '&c此命令只能由玩家执行'
  reload:
    success: '&a重载成功'
  create:
    success: '&a配方创建成功'
recipe_type_name:
  vanilla_shaped: '有序配方'
  vanilla_shapeless: '无序配方'
# ...
```

## 占位符

语言文件中支持以下占位符：

| 占位符 | 说明 |
|--------|------|
| `<prefix>` | 插件前缀 |
| `<version>` | 插件版本 |
| `<player_name>` | 玩家名称 |
| `<item_name>` | 物品名称 |
| `<recipe_name>` | 配方名称 |
| `<menu_name>` | 菜单名称 |
| `<time>` | 时间 |
| `<recipe_type>` | 配方类型名 |

## 自定义语言

1. 复制现有语言文件
2. 修改 `config.yml` 中的 `language` 为自定义文件名
3. 编辑翻译内容
