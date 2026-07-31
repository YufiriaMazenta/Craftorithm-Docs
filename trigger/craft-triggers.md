---
title: 合成触发器
---

# 合成触发器

合成触发器监听配方合成事件，是最常用的触发器类型。

## 三种合成触发器

### 类型
1. `crafting` 工作台合成事件
2. `smithing` 锻造台合成事件
3. `anvil` 铁砧合成事件

## 双阶段机制

合成触发器支持 **prepare + execute** 两阶段：

- **Prepare 阶段**：在 `PrepareItemCraftEvent` 中评估条件，条件不通过时清空结果槽，阻止玩家合成
- **Execute 阶段**：在 `CraftItemEvent` 中执行动作（如扣除经验、发送消息）

## 上下文(1.11.2.0+)

合成触发器会在触发器的上下文中添加合成材料的相关信息和本次批量合成所能合成的数量

其中, 批量合成数量的key为`craft_num`, 只能在actions中获取, 对于正常的点击合成, 它会返回1

### crafting

在`crafting`类型的触发器上下文中可以使用`ingredient_<行数-1>_<列数-1>`这样的key来获取对应位置的原材料ID, 也可以通过`ingredient_<行数-1>_<列数-1>_amount`来获取对应位置原材料的数量

其中, 行数和列数的获取不受摆放位置影响, 也就是说, 例如一个2x2的配方, 你将他摆放在任意位置, `ingredient_0_0`获取到的都是第一行第一个物品

例如:
```yaml
craft_example:
  type: crafting
  recipes:
    - 'craftorithm:shaped_01'
  conditions:
    - 'context("ingredient_0_0_amount") >= 2'
    - 'context("ingredient_0_0") != "items:example_item:1"'
```

在这个示例中,他会获取配方第一行第一个物品的数量和物品id, 并在数量大于等于2, 且不能是`items:example_item:1`这个特殊物品, 才能合成

### smithing

在`smithing`类型的触发器上下文中可以使用`template`,`base`,`addition`获取到三个槽位的原材料以及`template_amount`,`base_amount`,`addition_amount`获取对应的数量

### anvil

与`smithing`类型触发器类似, `anvil`类型的触发器可以通过`base`,`addition`获取两个槽位的原材料以及同样的方式获取数量

## YAML 示例

### 基础用法

```yaml
on_craft_diamond_sword:
  type: 'crafting'
  recipes:
    - 'minecraft:diamond_sword'
  actions:
    - 'tell("&a你合成了一把钻石剑！")'
```

### 条件限制

```yaml
vip_recipe:
  type: 'crafting'
  recipes:
    - 'craftorithm:vip_sword'
  conditions:
    - 'perm("craftorithm.vip")'
    - 'level() >= 10'
  actions:
    - 'tell("&aVIP 配方合成成功！")'
  priority: 0
```

### 消耗经验

```yaml
costly_recipe:
  type: 'crafting'
  recipes:
    - 'craftorithm:legendary_sword'
  conditions:
    - 'level() >= 30'
  actions:
    - 'take_level(30)'
    - 'tell("&6消耗 30 等级！")'
```

### 全配方触发器

`recipes` 列表为空时，匹配该类型的所有配方：

```yaml
on_any_craft:
  type: 'crafting'
  recipes: []
  actions:
    - 'tell("&7你合成了一件物品")'
```

## 冷却机制

```yaml
cooldown_trigger:
  type: 'crafting'
  recipes:
    - 'craftorithm:my_recipe'
  cooldown: 10           # 10 秒冷却
  per-player: true       # 每个玩家独立冷却
  actions:
    - 'tell("&c请等待冷却结束")'
```

- `per-player: true` — 每个玩家有独立的冷却计时
- `per-player: false` — 全局冷却，所有玩家共享
