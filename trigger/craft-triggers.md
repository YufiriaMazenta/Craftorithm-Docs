---
title: 合成触发器
---

# 合成触发器

合成触发器监听配方合成事件，是最常用的触发器类型。

## 三种合成触发器

| 类型 | 监听事件 | Prepare 事件 |
|------|---------|-------------|
| `crafting` | CraftItemEvent | PrepareItemCraftEvent |
| `smithing` | SmithItemEvent | PrepareSmithingEvent |
| `anvil` | InventoryClickEvent (slot 2) | PrepareAnvilEvent |

## 双阶段机制

合成触发器支持 **prepare + execute** 两阶段：

- **Prepare 阶段**：在 `PrepareItemCraftEvent` 中评估条件，条件不通过时清空结果槽，阻止玩家合成
- **Execute 阶段**：在 `CraftItemEvent` 中执行动作（如扣除经验、发送消息）

这意味着合成触发器可以真正阻止合成行为，而不仅仅是事后响应。

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
    - 'level >= 10'
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
    - 'level >= 30'
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
