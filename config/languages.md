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

## 工作原理

插件会自动检测玩家客户端的语言设置，并加载对应的语言文件，无需手动配置。

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

## 自定义语言

1. 在plugins/Craftorithm/lang文件夹下创建符合Minecraft原版语言代码名字的yml文件，例如`en_us.yml`
2. 复制现有语言文件的结构到你的语言文件里
3. 编辑翻译内容
4. 重载插件
