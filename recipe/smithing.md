---
title: 锻造配方
---

# 锻造配方 (Smithing Recipe)

锻造配方支持两种子类型：改造 (Transform) 和纹饰 (Trim)。

## 改造配方 (Transform)

用于升级装备，如将钻石装备升级为下界合金装备。

### YAML 示例

```yaml
type: 'vanilla_smithing_transform'
result: 'minecraft:netherite_sword'
base: 'minecraft:diamond_sword'
addition: 'minecraft:netherite_ingot'
template: 'minecraft:netherite_upgrade_smithing_template'
copy_components_rules:
  - 'enchantments'
  - 'display_name'
  - 'custom_model_data'
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 固定为 `vanilla_smithing_transform` |
| `result` | string | 是 | 产出物品 ID |
| `base` | string | 是 | 基础物品（被升级的物品） |
| `addition` | string | 是 | 添加材料 |
| `template` | string | 是 | 锻造模板 (1.20+) |
| `copy_components_rules` | list | 否 | 组件复制规则 |
| `fake_result_preview` | string | 否 | 合成时显示的虚假预览物品                         |

### 组件复制规则 (copy_components_rules)

指定从基础物品复制哪些组件到产出物品：

| 规则 | 说明 |
|------|------|
| `all` | 复制所有组件 |
| `enchantments` | 附魔 |
| `attributes` | 属性 |
| `display_name` | 显示名称 |
| `custom_model_data` | 自定义模型数据 |
| `custom_model_data_component` | 自定义模型数据组件 (1.20.5+) |
| `food` | 食物属性 |
| `item_flag` | 物品标志 |
| `lore` | 说明文本 |
| `max_stack_size` | 最大堆叠数 |
| `rarity` | 稀有度 |
| `tool` | 工具属性 |
| `fire_resistance` | 防火 |
| `hide_tooltip` | 隐藏提示 |
| `unbreakable` | 不可破坏 |
| `trim` | 纹饰 |
| `item_model` | 物品模型 |
| `item_name` | 物品名称 |
| `custom_persistent_data` | 自定义持久数据 |

## 纹饰配方 (Trim)

用于为装备添加装饰性纹饰，需要 1.20+ 版本。

纹饰配方无法设置配方结果，也就是result配置项

### YAML 示例

```yaml
type: 'vanilla_smithing_trim'
base: 'minecraft:diamond_chestplate'
addition: 'minecraft:iron_ingot'
template: 'minecraft:coast_armor_trim_smithing_template'
trim_pattern: 'minecraft:eye' #1.21.5及以上,必须设定trim_pattern, 否则无法注册配方
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 固定为 `vanilla_smithing_trim` |
| `base` | string | 是 | 被纹饰的装备 |
| `addition` | string | 是 | 纹饰材料 |
| `template` | string | 是 | 纹饰模板 |
| `fake_result_preview` | string | 否 | 合成时显示的虚假预览物品                         |
| `copy_components_rules` | list | 否 | 组件复制规则 |