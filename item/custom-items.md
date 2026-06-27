---
title: 自定义物品
---

# 自定义物品

## 保存物品

1. 手持想要保存的物品
2. 执行命令：

```bash
/cra item save <file> <id>
```

示例：

```bash
/cra item save weapons epic_sword
```

物品将保存到 `plugins/Craftorithm/items/weapons.yml`，ID 为 `craftorithm:epic_sword`。

## 给予物品

```bash
/cra item give <item> [player]
```

示例：

```bash
/cra item give craftorithm:epic_sword PlayerName
```

## 物品文件格式

物品定义文件位于 `plugins/Craftorithm/items/` 目录：

```yaml
# weapons.yml
epic_sword:
  material: 'minecraft:diamond_sword'
  name: '&6史诗之剑'
  lore:
    - '&7传说中的武器'
    - '&c攻击力 +100'
  enchantments:
    - 'sharpness:5'
    - 'fire_aspect:2'
  unbreakable: true
  custom_model_data: 1001
  amount: 1
```

## 支持的字段

| 字段 | 说明 |
|------|------|
| `material` | 基础物品材质 |
| `name` | 显示名称（支持颜色代码） |
| `lore` | 说明文本列表 |
| `enchantments` | 附魔列表 |
| `unbreakable` | 是否不可破坏 |
| `custom_model_data` | 自定义模型数据 |
| `amount` | 数量 |
| `flags` | 物品标志列表 |

## 在配方中引用

```yaml
type: 'vanilla_shaped'
result: 'craftorithm:epic_sword'
shape:
  - ' A '
  - ' B '
  - ' A '
ingredients:
  A: 'minecraft:diamond'
  B: 'minecraft:stick'
```
