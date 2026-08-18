---
title: 外部插件物品
---

# 外部插件物品

Craftorithm 通过 Hook 系统对接 10+ 外部物品插件，在配方中直接使用它们的物品 ID。

## 支持的插件

| 插件 | 命名空间          | ID 格式                | 特殊说明     |
|------|-------------------|------------------------|--------------|
| CraftEngine | `craft_engine`    | `craft_engine:<id>`    | -            |
| Nexo | `nexo`            | `nexo:<id>`            | -            |
| AzureFlow | `azureflow`       | `azureflow:<id>`       | -            |
| NeigeItems | `neige_items`     | `neige_items:<id>`     | -            |
| ItemsAdder | `items_adder`     | `items_adder:<id>`     | 支持自动重载 |
| Oraxen | `oraxen`          | `oraxen:<id>`          | 支持自动重载 |
| EcoItems | `ecoitems`        | `ecoitems:<id>`        | -            |
| ExecutableItems | `executableitems` | `executableitems:<id>` | -            |
| MMOItems | `mmoitems`        | `mmoitems:<type>:<id>` | 需要类型前缀 |
| MythicMobs | `mythic_mobs`     | `mythic_mobs:<id>`     | -            |
| SX-Item | `sx_item`         | `sx_item:<id>`         | -            |
| CustonFishing | `custom_fishing`  | `custom_fishing:<id>`  | -            |

## 使用示例

```yaml
# 使用 ItemsAdder 物品作为配方产出
type: 'vanilla_shaped'
result: 'items_adder:ruby_sword'
shape:
  - ' A '
  - ' B '
  - ' B '
ingredients:
  A: 'mythic_mobs:ruby'
  B: 'minecraft:stick'

# 使用 MMOItems 物品
type: 'vanilla_shapeless'
result: 'mmoitems:SWORD/custom_blade'
ingredients:
  - 'minecraft:diamond'
  - 'minecraft:netherite_ingot'
```

## Hook 优先级

当一个物品由多个插件定义时时，按 `config.yml` 中 `item_plugin_hook_priority` 的顺序查找第一个匹配。
