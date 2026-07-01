---
title: 事件触发器
---

# 事件触发器

Craftorithm 支持 44+ 种 Bukkit 事件作为触发器类型，覆盖玩家、实体、背包、方块等各类事件。

## 使用方式

在触发器 YAML 的 `type` 字段中使用事件名即可：

```yaml
my_trigger:
  type: 'player_join'
  actions:
    - 'tell("&a欢迎！")'
```

## 事件列表

### 玩家事件

| 事件名 | 说明 | 上下文变量                             |
|--------|------|-----------------------------------|
| `player_join` | 玩家加入 | —                                 |
| `player_quit` | 玩家退出 | —                                 |
| `player_death` | 玩家死亡 | `killer_name`                     |
| `player_respawn` | 玩家重生 | —                                 |
| `player_interact` | 玩家交互 | `action`                          |
| `player_interact_entity` | 玩家与实体交互 | `entity_type`                     |
| `player_advancement` | 完成进度 | `advancement`                     |
| `player_level_change` | 等级变化 | `old_level`, `new_level`          |
| `player_exp_change` | 经验变化 | `amount`                          |
| `player_toggle_sneak` | 潜行切换 | `sneaking`                        |
| `player_toggle_sprint` | 疾跑切换 | `sprinting`                       |
| `player_item_consume` | 消耗物品 | `item`                            |
| `player_item_held` | 切换手持物品 | `previous_slot`, `new_slot`       |
| `player_animation` | 玩家动画 | —                                 |
| `player_bed_enter` | 上床 | —                                 |
| `player_bed_leave` | 离床 | —                                 |
| `player_bucket_fill` | 装满桶 | -                                 |
| `player_bucket_empty` | 倒空桶 | -                                 |
| `player_changed_world` | 切换世界 | `from`                            |
| `player_portal` | 进入传送门 | —                                 |
| `player_teleport` | 传送 | `cause`                           |
| `player_fish` | 钓鱼 | `state`                           |
| `player_shear_entity` | 剪羊毛 | `entity_type`                     |
| `player_edit_book` | 编辑书本 | —                                 |
| `player_statistic` | 统计值变化 | `statistic`, `value`              |
| `player_swap_hand_items` | 切换主副手 | —                                 |
| `player_drop_item` | 丢弃物品 | `item`                            |
| `player_pickup_item` | 拾取物品 | `item`                            |
| `player_velocity` | 速度变化 | —                                 |
| `player_game_mode_change` | 游戏模式变化 | `new_game_mode`                   |
| `player_item_damage` | 物品损坏 | `item`, `damage`                  |
| `player_item_mend` | 经验修补 | `item`, `amount`, `repair_amount` |
| `player_recipe_discover` | 发现配方 | `recipe`                          |
| `player_take_campfire` | 从营火取出物品 | `item`                            |
| `player_move` | 玩家移动 | `from`, `to`                      |
| `player_command_preprocess` | 命令预处理 | `message`                         |
| `async_player_chat` | 异步聊天 | `message`                         |

### 实体事件

| 事件名 | 说明 | 上下文变量                                  |
|--------|------|----------------------------------------|
| `damage_entity` | 实体受伤 | `damage`, `entity_type`, `entity_name` |
| `kill_entity` | 实体被击杀 | `entity_type`, `entity_name`           |
| `entity_shoot_bow` | 射箭 | `force`                                |
| `entity_breed` | 繁殖 | `entity_type`                          |
| `entity_tame` | 驯服 | `entity_type`                          |
| `entity_potion_effect` | 药水效果 | `effect_type`                          |

### 背包事件

| 事件名 | 说明 | 上下文变量 |
|--------|------|-----------|
| `inventory_click` | 点击格子 | `slot`, `click_type` |
| `inventory_close` | 关闭背包 | — |
| `inventory_open` | 打开背包 | — |

### 方块事件

| 事件名 | 说明 | 上下文变量 |
|--------|------|-----------|
| `block_break` | 破坏方块 | `block_type` |
| `block_place` | 放置方块 | `block_type` |

## 上下文变量

每个事件类型会自动注入相关变量到脚本上下文中，可通过 `context("变量名")` 函数访问。

### 示例：检查击杀的实体类型

```yaml
on_kill_zombie:
  type: 'kill_entity'
  conditions:
    - 'context("entity_type") == "ZOMBIE"'
  actions:
    - 'tell("&a你击杀了一只僵尸！")'
```

### 示例：检查进度

```yaml
on_diamond_advancement:
  type: 'player_advancement'
  conditions:
    - 'context("advancement") == "minecraft:story/mine_diamond"'
  actions:
    - 'tell("&b你挖到了钻石！")'
    - 'give-money(1000)'
```

### 示例：检查聊天消息

```yaml
on_keyword:
  type: 'async_player_chat'
  conditions:
    - 'perm("craftorithm.vip")'
  actions:
    - 'tell("&aVIP 发言！")'
```
