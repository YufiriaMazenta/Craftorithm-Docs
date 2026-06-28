---
title: 有序配方
---

# 有序配方 (Shaped Recipe)

有序配方要求材料在工作台中按特定形状排列。

## YAML 示例

```yaml
type: 'vanilla_shaped'
result: 'minecraft:diamond_sword'
group: 'weapons'
shape:
  - 'ABA'
  - 'ABA'
  - ' C '
ingredients:
  A: 'minecraft:diamond'
  B: 'minecraft:stick'
  C: 'item_pack:ores'
recipe_book_category: equipment
```

## 字段说明

| 字段 | 类型 | 必填 | 说明                                             |
|------|------|------|------------------------------------------------|
| `type` | string | 是 | 固定为 `vanilla_shaped`                           |
| `result` | string | 是 | 产出物品 ID                                        |
| `shape` | list | 是 | 1-3 行字符串，每行 1-3 个字符                            |
| `ingredients` | map | 是 | 字符 → 物品 ID 映射                                  |
| `group` | string | 否 | 配方分组名                                          |
| `recipe_book_category` | string | 否 | 配方书分类：`misc`、`building`、`redstone`、`equipment` |
| `fake_result_preview` | string | 否 | 合成时显示的虚假预览物品                         |

## 形状规则

- 最小 1x1，最大 3x3
- 每行字符串中的字符对应 `ingredients` 中的键
- 空格表示该位置为空
- 字符区分大小写（`a` 和 `A` 是不同材料）

### 不同大小示例

```yaml
# 2x2 配方
shape:
  - 'AB'
  - 'AB'
ingredients:
  A: 'minecraft:iron_ingot'
  B: 'minecraft:stick'

# 1x3 配方
shape:
  - 'A'
  - 'A'
  - 'B'
ingredients:
  A: 'minecraft:stick'
  B: 'minecraft:string'
```

## 物品组 (Item Pack)

使用 `item_pack:` 前缀引用 `item_packs.yml` 中定义的物品组，使配方接受多种材料变体：

```yaml
ingredients:
  A: 'item_pack:all_wood'  # 接受任何木材类型
```
