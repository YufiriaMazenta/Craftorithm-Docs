---
title: 切石配方
---

# 切石配方 (Stonecutting Recipe)

切石配方用于在切石台中将一种方块加工为另一种方块。

## YAML 示例

```yaml
type: 'vanilla_stonecutting'
result: 'minecraft:stone_brick'
ingredient: 'minecraft:stone'
group: 'stonecutting'
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 固定为 `vanilla_stonecutting` |
| `result` | string | 是 | 产出物品 ID |
| `ingredient` | string | 是 | 输入物品 ID（单个） |
| `group` | string | 否 | 配方分组名 |

## 多产物示例

如需一种材料可切出多种产物，创建多个配方文件即可：

```yaml
# stone_to_bricks.yml
type: 'vanilla_stonecutting'
result: 'minecraft:stone_bricks'
ingredient: 'minecraft:stone'

# stone_to_slab.yml
type: 'vanilla_stonecutting'
result: 'minecraft:stone_slab'
ingredient: 'minecraft:stone'
```
