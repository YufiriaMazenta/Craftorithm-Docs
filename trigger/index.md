---
title: 触发器系统
---

# 触发器系统概述

触发器系统允许在特定事件发生时执行条件检查和动作，实现配方行为的灵活控制。

## 触发器是什么

触发器由四部分组成：
1. **类型 (type)**：监听的事件类型
2. **条件 (conditions)**：满足条件时才执行
3. **动作 (actions)**：条件通过后执行的操作
4. **配置**：优先级、冷却、启用/禁用

## 触发器文件

- 位置：`plugins/Craftorithm/triggers/`
- 格式：YAML
- 一个文件可包含多个触发器定义

## YAML 结构

```yaml
trigger_id:                    # 触发器 ID（唯一标识）
  type: 'crafting'             # 触发器类型
  recipes:                     # 匹配的配方列表（可选，空=匹配所有）
    - 'craftorithm:my_recipe'
  conditions:                  # 条件脚本列表（全部满足才通过）
    - 'perm("craftorithm.vip")'
    - 'level >= 10'
  actions:                     # 动作脚本列表（按顺序执行）
    - 'tell("&a条件通过！")'
    - 'give_level(100)'
  priority: 0                  # 执行优先级（数字越小越先执行）
  enabled: true                # 是否启用
  cooldown: 5                  # 冷却时间（秒），0 = 无冷却
  per-player: true             # 冷却是每个玩家独立还是全局
```

## 触发器类型

### 配方触发器（3 种）

监听配方合成事件，支持 prepare 阶段（条件不通过可阻止合成）：

| 类型 | 说明 |
|------|------|
| `crafting` | 工作台合成 |
| `smithing` | 锻造台合成 |
| `anvil` | 铁砧合成 |

### 事件触发器（44+ 种）

监听 Bukkit 事件，详见 [事件触发器](/trigger/bukkit-events)。

## 执行流程

```
事件触发
  ↓
提取上下文（玩家、配方、事件变量）
  ↓
匹配触发器（按 priority 排序）
  ↓
检查冷却
  ↓
评估条件脚本
  ↓
条件通过 → 执行动作脚本
  ↓
（配方触发器）条件不通过 → 清空结果槽，阻止合成
```
