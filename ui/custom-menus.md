---
title: 自定义菜单
---

# 自定义菜单

Craftorithm 支持通过 YAML 配置文件创建自定义菜单界面。

## 文件位置

`plugins/Craftorithm/menus/custom/`

## YAML 结构

```yaml
title: '&a配方列表'
layout:
  - '#########'
  - 'ABCDEFGHI'
  - '#########'
open_actions:
  - 'tell("hello world!")'
close_actions:
  - 'tell("bye bye!")'
permission: 'craftorithm.ui.recipe_list'
icons:
  '#':
    material: 'minecraft:green_stained_glass_pane'
    name: '&a边框'
  A:
    icon_type: recipe_display
    recipe_id: 'craftorithm:my_recipe'
    view_click: left
    edit_click: right
```

## 字段说明

### title — 菜单标题

支持以下特殊标签：
- `<translate:lang:key>` — 多语言翻译
- `<page>` / `<max_page>` — 分页信息

### layout — 布局网格

- 每行字符串中的字符对应 `icons` 中的键
- 空格表示该位置为空
- 最大 6 行（54 格）

### open_actions / close_actions — 脚本动作

菜单打开/关闭时执行的脚本动作列表：

```yaml
open_actions:
  - 'tell("&a欢迎打开菜单")'
close_actions:
  - 'tell("&7菜单已关闭")'
```

### permission — 权限

打开菜单所需的权限节点。

## icon 配置

每个图标支持以下字段：

| 字段 | 说明 |
|------|------|
| `material` | 物品材质 |
| `name` | 显示名称 |
| `lore` | 说明文本列表 |
| `custom_model_data` | 自定义模型数据 |
| `icon_type` | 图标类型（见下表） |
| `recipe_id` | 关联的配方 ID |
| `recipe_type` | 关联的配方类型 |
| `ingredient_slot` | 材料槽位 |
| `view_click` | 查看点击（left/right） |
| `edit_click` | 编辑点击（left/right） |

## icon_type 类型

| 类型 | 说明 |
|------|------|
| (空) | 普通物品图标 |
| `recipe_display` | 配方展示图标 |
| `recipe_list` | 配方列表入口 |
| `sort` | 排序切换按钮 |
| `prev_page` | 上一页按钮 |
| `next_page` | 下一页按钮 |
| `back` | 返回按钮 |
| `result` | 配方结果图标 |

## 完整示例

```yaml
title: '&6自定义配方列表'
permission: 'craftorithm.ui.my_list'
layout:
  - '#########'
  - '#ABCD EF#'
  - '#GHIJ KL#'
  - '#MNOP QR#'
  - '#########'
  - '   <N>  '
icons:
  '#':
    material: 'minecraft:gold_block'
    name: '&6边框'
  A:
    icon_type: recipe_display
    recipe_id: 'craftorithm:recipe1'
  B:
    icon_type: recipe_display
    recipe_id: 'craftorithm:recipe2'
  N:
    icon_type: next_page
    material: 'minecraft:arrow'
    name: '&a下一页'
open_actions:
  - 'tell("&6欢迎浏览配方！")'
```

## 打开自定义菜单

```bash
/cra openmenu <name>
/cra openmenu <name> <player>
```
