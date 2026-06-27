---
title: 外部插件物品
---

# 外部插件物品

Craftorithm 通过 Hook 系统对接 10+ 外部物品插件，在配方中直接使用它们的物品 ID。

## 支持的插件

| 插件 | 命名空间 | ID 格式 | 特殊说明 |
|------|---------|---------|---------|
| CraftEngine | `craftengine` | `craftengine:<id>` | — |
| Nexo | `nexo` | `nexo:<id>` | — |
| AzureFlow | `azureflow` | `azureflow:<id>` | — |
| NeigeItems | `neigeitems` | `neigeitems:<id>` | — |
| ItemsAdder | `itemsadder` | `itemsadder:<id>` | 支持自动重载 |
| Oraxen | `oraxen` | `oraxen:<id>` | 支持自动重载 |
| EcoItems | `ecoitems` | `ecoitems:<id>` | — |
| ExecutableItems | `executableitems` | `executableitems:<id>` | — |
| MMOItems | `mmoitems` | `mmoitems:<type>/<id>` | 需要类型前缀 |
| MythicMobs | `mythicmobs` | `mythicmobs:<id>` | — |
| SX-Item | `sx-item` | `sx-item:<id>` | — |

## 使用示例

```yaml
# 使用 ItemsAdder 物品作为配方产出
type: 'vanilla_shaped'
result: 'itemsadder:ruby_sword'
shape:
  - ' A '
  - ' B '
  - ' B '
ingredients:
  A: 'mythicmobs:ruby'
  B: 'minecraft:stick'

# 使用 MMOItems 物品
type: 'vanilla_shapeless'
result: 'mmoitems:SWORD/custom_blade'
ingredients:
  - 'minecraft:diamond'
  - 'minecraft:netherite_ingot'
```

## Hook 优先级

当多个插件注册了相同 ID 的物品时，按 `config.yml` 中 `item_plugin_hook_priority` 的顺序查找第一个匹配。

## 自动重载

- **ItemsAdder**：当 ItemsAdder 执行 `/ia reload` 时，Craftorithm 自动重新加载配方
- **Oraxen**：当 Oraxen 重载时，Craftorithm 自动重新加载配方

可在 `config.yml` 中禁用此行为：

```yaml
reload_when_ia_reload: false
```
