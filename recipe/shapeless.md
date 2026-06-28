---
title: 无序配方
---

# 无序配方 (Shapeless Recipe)

无序配方不要求材料按特定形状排列，玩家可将材料放入工作台任意位置。

## YAML 示例

```yaml
type: 'vanilla_shapeless'
result: 'minecraft:magenta_dye'
group: 'dye'
ingredients:
  - 'minecraft:red_dye'
  - 'minecraft:blue_dye'
recipe_book_category: misc
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 固定为 `vanilla_shapeless` |
| `result` | string | 是 | 产出物品 ID |
| `ingredients` | list | 是 | 物品 ID 列表（顺序无关） |
| `group` | string | 否 | 配方分组名 |
| `recipe_book_category` | string | 否 | 配方书分类 |
| `fake_result_preview` | string | 否 | 合成时显示的虚假预览物品                         |

## 与有序配方的区别

- 无 `shape` 字段
- `ingredients` 是列表而非映射
- 材料可放入工作台任意位置

## 材料数量

- 最少 1 个，最多 9 个材料
- 列表中的物品数量即为所需材料数量

```yaml
# 需要 3 种不同材料
ingredients:
  - 'minecraft:iron_ingot'
  - 'minecraft:gold_ingot'
  - 'minecraft:diamond'
```
