---
title: 铁砧配方
---

# 铁砧配方 (Anvil Recipe)

铁砧配方允许自定义铁砧合成行为，支持经验消耗和组件复制。

## YAML 示例

```yaml
type: 'anvil'
result: 'minecraft:diamond_sword'
base: 'minecraft:iron_sword'
addition: 'minecraft:diamond'
cost_level: 3
copy_components_rules:
  - 'enchantments'
  - 'display_name'
  - 'lore'
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 固定为 `anvil` |
| `result` | string | 是 | 产出物品 ID |
| `base` | string | 是 | 铁砧左侧物品（基础物品） |
| `addition` | string | 是 | 铁砧右侧物品（添加材料） |
| `cost_level` | integer | 否 | 消耗的经验等级，默认 `0` |
| `copy_components_rules` | list | 否 | 组件复制规则（参见锻造配方） |
| `fake_result_preview` | string | 否 | 合成时显示的虚假预览物品                         |

## 与原版铁砧的区别

- 原版铁砧：物品修复、合并附魔、重命名
- 自定义铁砧配方：完全自定义输入→输出映射，绕过原版逻辑

## 启用/禁用

铁砧配方功能可在 `config.yml` 中全局控制：

```yaml
enable_anvil_recipe: true
```

设为 `false` 将禁用所有自定义铁砧配方。

## 组件复制规则

与锻造配方相同，支持的规则参见 [锻造配方 - 组件复制规则](/recipe/smithing#组件复制规则-copy-components-rules)。

## 注意事项

- 铁砧配方的 `base` 和 `addition` 均支持物品组 (`item_pack:`)
- `cost_level` 为 0 时不消耗经验
- 多个铁砧配方匹配同一输入时，优先使用第一个匹配的配方
