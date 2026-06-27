---
title: 烧炼配方
---

# 烧炼配方 (Smelting Recipe)

烧炼配方支持 4 种设备：熔炉、高炉、烟熏炉、营火。

## 类型列表

| 类型 | 说明 | 默认时间(ticks) |
|------|------|----------------|
| `vanilla_smelting_furnace` | 熔炉 | 200 |
| `vanilla_smelting_blast` | 高炉 | 100 |
| `vanilla_smelting_smoker` | 烟熏炉 | 100 |
| `vanilla_smelting_campfire` | 营火 | 100 |

## YAML 示例

```yaml
type: 'vanilla_smelting_furnace'
result: 'minecraft:diamond'
ingredient: 'minecraft:bedrock'
exp: 1.0
time: 200
group: 'smelting'
recipe_book_category: misc
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 上述 4 种类型之一 |
| `result` | string | 是 | 产出物品 ID |
| `ingredient` | string | 是 | 输入物品 ID（单个） |
| `exp` | number | 否 | 烧炼经验值，默认 `0` |
| `time` | integer | 否 | 烧炼时间(ticks)，默认取决于设备类型 |
| `group` | string | 否 | 配方分组名 |
| `recipe_book_category` | string | 否 | 配方书分类：`food`、`blocks`、`misc` |

## 经验与时间

- **经验 (`exp`)**：烧炼完成后给予玩家的经验值，支持小数
- **时间 (`time`)**：单位为 tick (20 ticks = 1 秒)
  - 熔炉默认 200 ticks (10 秒)
  - 高炉/烟熏炉/营火默认 100 ticks (5 秒)

## 四种设备对照

```yaml
# 熔炉 — 最通用，速度最慢
type: 'vanilla_smelting_furnace'

# 高炉 — 仅矿石类，速度 2x
type: 'vanilla_smelting_blast'

# 烟熏炉 — 仅食物类，速度 2x
type: 'vanilla_smelting_smoker'

# 营火 — 仅食物类，无经验
type: 'vanilla_smelting_campfire'
```
