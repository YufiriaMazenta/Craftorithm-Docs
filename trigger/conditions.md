---
title: 条件函数
---

# 条件函数

条件函数用于触发器的 `conditions` 列表中，决定是否执行动作。

## 语法

条件列表中每个字符串是一个条件表达式，多个条件之间隐式使用 `&&` 连接（全部满足才通过）。

```yaml
conditions:
  - 'perm("craftorithm.vip")'
  - 'level >= 10'
  - 'world("world_nether")'
```

## 运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `==` | 等于 | `level == 10` |
| `!=` | 不等于 | `level != 0` |
| `>` | 大于 | `level > 5` |
| `>=` | 大于等于 | `level >= 10` |
| `<` | 小于 | `money < 100` |
| `<=` | 小于等于 | `money <= 100` |
| `&&` | 逻辑与 | `level >= 10 && money >= 100` |
| `\|\|` | 逻辑或 | `perm("a") \|\| perm("b")` |
| `!` | 逻辑非 | `!perm("craftorithm.banned")` |

## 函数参考

### perm — 权限检查

```yaml
- 'perm("craftorithm.vip")'
```

- 返回：`boolean`
- 说明：检查玩家是否拥有指定权限节点（支持 PlaceholderAPI 解析）

### papi — PlaceholderAPI 变量

```yaml
- 'papi("%player_level%") >= 10'
- 'papi("%vault_eco_balance%") >= 1000'
```

- 返回：`number` 或 `string`
- 说明：解析 PlaceholderAPI 变量，返回值自动转为数字进行比较

### level — 玩家等级

```yaml
- 'level >= 10'
```

- 返回：`number`
- 说明：获取玩家经验等级

### money — Vault 金币

```yaml
- 'money >= 1000'
```

- 返回：`number`
- 说明：获取玩家 Vault 经济余额（需安装 Vault）

### points — PlayerPoints 积分

```yaml
- 'points >= 50'
```

- 返回：`number`
- 说明：获取玩家 PlayerPoints 余额（需安装 PlayerPoints）

### world — 世界检查

```yaml
- 'world("world_nether")'
- 'world("world")'
```

- 返回：`string`（无参数时）或 `boolean`（有参数时）
- 说明：无参数返回当前世界名，有参数检查是否在指定世界

### game_mode — 游戏模式

```yaml
- 'game_mode("SURVIVAL")'
- 'game_mode("CREATIVE")'
```

- 返回：`string`（无参数时）或 `boolean`（有参数时）
- 说明：无参数返回当前游戏模式，有参数检查是否为指定模式

### item — 物品检查

```yaml
- 'item("craftorithm:my_item")'
- 'item("minecraft:diamond") >= 5'
```

- 返回：`boolean`
- 说明：检查事件相关物品 ID，可选检查数量

### biome — 群系检查

```yaml
- 'biome("minecraft:ocean")'
- 'biome("minecraft:desert")'
```

- 返回：`boolean`
- 说明：检查玩家所在位置的群系

### in_water — 水中检查

```yaml
- 'in_water'
```

- 返回：`boolean`
- 说明：检查玩家是否站在水中

### in_rain — 雨中检查

```yaml
- 'in_rain'
```

- 返回：`boolean`
- 说明：检查玩家是否在雨中/雷暴中

### light_level — 光照等级

```yaml
- 'light_level >= 7'
```

- 返回：`number`（无比较时）或 `boolean`（有比较时）
- 说明：获取玩家位置的光照等级

### context — 上下文变量

```yaml
- 'context("entity_type") == "ZOMBIE"'
- 'context("damage") >= 10'
- 'context("message")'
```

- 返回：`any`
- 说明：读取触发器上下文中的变量（事件自动注入的变量）

## 组合示例

```yaml
conditions:
  - 'perm("craftorithm.vip")'
  - 'level >= 10'
  - 'money >= 1000'
  - 'world("world")'
  - 'game_mode("SURVIVAL")'
```

以上条件全部满足时才会执行动作。
