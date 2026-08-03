---
title: 结果处理器
---

# 结果处理器 (Result Processors)

结果处理器是 1.13.0.0 版本新增的功能，用于在合成时为配方结果添加额外效果。通过结果处理器，你可以复制、添加或移除物品的组件。

## 支持的配方类型

| 配方类型 | type 值 | 支持状态 |
|----------|---------|----------|
| 铁砧配方 | `anvil` | ✅ 支持 |
| 锻造台改造 | `vanilla_smithing_transform` | ✅ 支持 |
| 熔炉烧炼 | `vanilla_smelting_*` | ✅ 支持 |
| 酿造台 | `vanilla_brewing` | ✅ 支持 |
| 有序配方 | `vanilla_shaped` | ✅ 支持 |
| 无序配方 | `vanilla_shapeless` | ✅ 支持 |
| 切石机 | `vanilla_stonecutting` | ❌ 不支持 |

**注意**：切石机配方 (`vanilla_stonecutting`) 暂不支持结果处理器。

## 基本语法

```yaml
type: <配方类型>
result: '<物品ID>'
# ... 其他配方字段

result_processors:
  <组件名>:
    type: <处理策略>
    data:  # 可选，取决于处理策略
      <配置>
```

## 处理策略

结果处理器支持四种处理策略：

### copy_from_source

从源物品(source)复制组件到结果(result)。

```yaml
result_processors:
  enchantments:
    type: copy_from_source
```

### add

直接为结果物品添加指定值。

```yaml
result_processors:
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
      minecraft:mending: 1
```

### merge_source

将源物品的组件与结果物品的组件智能合并。对于附魔，会取较高等级；对于属性，会合并修饰器。

```yaml
result_processors:
  attributes:
    type: merge_source
```

### remove

移除结果物品的组件。不指定 `data` 时移除全部，指定 `data` 时移除特定项。

```yaml
# 移除所有附魔
result_processors:
  enchantments:
    type: remove

# 移除指定附魔
result_processors:
  enchantments:
    type: remove
    data:
      value:
        - "minecraft:sharpness"
        - "minecraft:mending"
```

## sourceItem 含义

不同配方类型中，源物品(source)的含义不同：

| 配方类型 | sourceItem |
|----------|------------|
| 铁砧/锻造台 | base 物品（左侧物品） |
| 烧炼/切石/酿造 | 输入物品 |
| 工作台 | null（无源物品） |

## 支持的组件类型

### 基础组件

| 组件 | 说明 | 支持的策略 |
|------|------|-----------|
| `all` | 复制所有组件 | 仅 `copy_from_source` |
| `display_name` | 显示名称 | 全部 |
| `lore` | 说明文本 | 全部 |
| `enchantments` | 附魔 | 全部 |
| `attributes` | 属性修饰器 | 全部 |
| `item_flag` | 物品标志 | 全部 |
| `trim` | 护甲纹饰 | `copy_from_source`, `remove` |
| `unbreakable` | 不可破坏 | 全部 |
| `custom_model_data` | 自定义模型数据 | 全部 |

### 1.20.5+ 组件

| 组件 | 说明 | 支持的策略 |
|------|------|-----------|
| `food` | 食物属性 | 全部 |
| `hide_tooltip` | 隐藏提示 | 全部 |
| `item_name` | 物品名称 | 全部 |
| `max_stack_size` | 最大堆叠数 | 全部 |
| `rarity` | 稀有度 | 全部 |
| `fire_resistance` | 防火 | 全部 |

### 1.21+ 组件

| 组件 | 说明 | 支持的策略 |
|------|------|-----------|
| `tool` | 工具属性 | 全部 |

### 1.21.4+ 组件

| 组件 | 说明 | 支持的策略 |
|------|------|-----------|
| `custom_model_data_component` | 自定义模型数据组件 | 全部 |
| `item_model` | 物品模型 | 全部 |

### 特殊组件

| 组件 | 说明 | 支持的策略 |
|------|------|-----------|
| `custom_persistent_data` | 自定义持久数据 (PDC) | 全部 |

## 完整示例

### 铁砧配方示例

```yaml
type: anvil
result: 'minecraft:diamond_sword'
base: 'minecraft:netherite_sword'
addition: 'minecraft:nether_star'
cost_level: 10

result_processors:
  # 从源物品复制附魔
  enchantments:
    type: copy_from_source

  # 添加自定义附魔（覆盖上面的复制）
  # enchantments:
  #   type: add
  #   data:
  #     minecraft:sharpness: 5
  #     minecraft:mending: 1
  #     minecraft:unbreaking: 3

  # 复制显示名称
  display_name:
    type: copy_from_source

  # 添加自定义 lore
  lore:
    type: add
    data:
      value:
        - "&7传世神器"
        - "&a由下界合金之星锻造"

  # 合并属性
  attributes:
    type: merge_source

  # 添加物品标志
  item_flag:
    type: add
    data:
      value:
        - "HIDE_ENCHANTS"
        - "HIDE_ATTRIBUTES"

  # 设置为不可破坏
  unbreakable:
    type: add
    data:
      value: true

  # 复制护甲纹饰
  trim:
    type: copy_from_source
```

### 锻造台配方示例

```yaml
type: 'vanilla_smithing_transform'
result: 'minecraft:netherite_sword'
base: 'minecraft:diamond_sword'
addition: 'minecraft:netherite_ingot'
template: 'minecraft:netherite_upgrade_smithing_template'

result_processors:
  # 复制所有组件
  all:
    type: copy_from_source

  # 添加自定义附魔
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
```

### 烧炼配方示例

```yaml
type: 'vanilla_smelting_furnace'
result: 'minecraft:diamond'
source: 'minecraft:coal_ore'
experience: 1.0
cooking_time: 200

result_processors:
  # 添加自定义 lore
  lore:
    type: add
    data:
      value:
        - "&7通过烧炼获得"
```

### 自定义持久数据 (PDC) 示例

```yaml
type: anvil
result: 'minecraft:diamond_sword'
base: 'minecraft:iron_sword'
addition: 'minecraft:diamond'

result_processors:
  custom_persistent_data:
    # 复制全部 PDC
    type: copy_from_source

    # 只复制指定 key
    # type: copy_from_source
    # data:
    #   key: "myns:mykey"
    #   type: STRING

    # 直接设置 PDC 键值
    # type: add
    # data:
    #   myns:key1: "string_value"
    #   myns:key2: 42
    #   myns:key3: true

    # 合并 source 的 PDC（仅复制 result 中没有的 key）
    # type: merge_source

    # 清空全部 PDC
    # type: remove

    # 移除指定 key
    # type: remove
    # data:
    #   keys:
    #     - "myns:key1"
    #     - "myns:key2"
```

## 兼容旧语法

旧的 `copy_components_rules` 语法仍然兼容，会自动转换为 `copy_from_source` 策略：

```yaml
# 旧语法
copy_components_rules:
  - 'enchantments'
  - 'display_name'
  - 'lore'

# 等同于新语法
result_processors:
  enchantments:
    type: copy_from_source
  display_name:
    type: copy_from_source
  lore:
    type: copy_from_source
```

## AdvancedEnchantments 支持

如果安装了 AdvancedEnchantments 插件，还可以使用 `ae_enchantments` 组件：

```yaml
result_processors:
  ae_enchantments:
    type: copy_from_source
    # type: merge_source
    # type: remove
```
