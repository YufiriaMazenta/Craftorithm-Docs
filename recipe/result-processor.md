---
title: 结果处理器
---

# 结果处理器 (Result Processors)

结果处理器在合成完成时改写结果物品的组件：从源物品复制、写入固定内容、与源物品合并，或者移除组件。

## 支持的配方类型

| 配方类型 | type 值 | 支持状态 |
|----------|---------|-----------|
| 铁砧配方 | `anvil` | ✅ 支持 |
| 锻造台改造 | `vanilla_smithing_transform` | ✅ 支持 |
| 熔炉烧炼 | `vanilla_smelting_*` | ✅ 支持 |
| 酿造台 | `vanilla_brewing` | ✅ 支持 |
| 有序配方 | `vanilla_shaped` | ✅ 支持 |
| 无序配方 | `vanilla_shapeless` | ✅ 支持 |
| 切石机 | `vanilla_stonecutting` | ✅ 支持（仅 Paper 及衍生端） |

## 基本语法

```yaml
type: <配方类型>
result: '<物品ID>'
# ... 其他配方字段

result_processors:
  <组件名>:
    type: <策略>
    data:      # 可选，取决于策略
      <配置>
```

### 单个动作与多个动作

同一组件只做一件事时，直接写 `type`（和 `data`）。需要对同一组件依次执行多个动作时，写成列表，按书写顺序执行：

```yaml
result_processors:
  enchantments:
    - type: copy_from_source
    - type: remove
      data:
        value:
          - "minecraft:sharpness"
    - type: add
      data:
        minecraft:unbreaking: 3
```

不同组件之间也按它们在 `result_processors` 中出现的顺序执行，后写的动作会覆盖前面已经写好的结果。

### 配置写错时的表现

- **组件名不认识**（包括当前服务端版本不支持的组件）：输出 `Unknown component: <组件名>`，跳过该组件，配方仍会正常加载
- **策略不支持**（例如给 `all` 写 `add`）：输出提示并跳过该动作
- **`data` 缺失或格式不对**：多数组件输出警告并跳过该动作，个别组件（如 `custom_persistent_data` 的 `add`）会直接报错

一条通用的经验：如果配方能正常加载，但结果物品少了某个效果，先看控制台有没有 `Unknown component` 或 `missing 'value'` 之类的提示。

## 源物品 (sourceItem)

带 `copy_from_source`、`merge_source` 的策略需要有一个"源"物品可供读取，不同配方类型的源物品如下：

| 配方类型 | sourceItem |
|----------|------------|
| 铁砧 / 锻造台 | base 物品（左侧或中间的基础物品） |
| 烧炼 / 切石 / 酿造 | 输入物品 |
| 工作台（有序 / 无序） | 没有源物品 |

工作台配方找不到源物品，对它使用 `copy_from_source` 或 `merge_source` 不会报错，但也**不会执行任何操作**。给工作台配方写组件时，请使用 `add` 或 `remove`。

## 处理策略

| 策略 | 作用 | 冲突时 |
|------|------|--------|
| `copy_from_source` | 用源物品的组件覆盖结果物品的组件 | 源胜 |
| `merge_source` | 把源物品的组件并入结果物品 | 结果胜（保留结果已有的） |
| `add` | 把 `data` 的内容并入结果物品 | `data` 胜（覆盖同名项） |
| `set` | 清空组件的现有内容，再写入 `data` | 无冲突 |
| `remove` | 移除组件的全部或指定内容 | — |

`add` 和 `merge_source` 都是"并入"，区别只在发生冲突时谁说了算；需要整体替换时用 `set`。

`set` 用于整体替换，目前由说明文本、附魔、属性、物品标志、持久数据这几个可以容纳多项的组件提供。单值组件（名称、稀有度、耐久这类）的 `add` 本身就是替换，没有 `set`。下面每个组件都会列出它实际支持哪些策略，未列出的策略会在加载时被跳过。

## 通用组件

以下组件在插件支持的所有服务端版本都可用（`trim` 需要 1.19.4+，`skull_profile` 需要 1.20.2+）。

### all

复制源物品的全部组件。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 用源物品的组件完全覆盖结果物品的组件 |

`all` 只能从源复制，不能写入固定值，因此不支持 `add` / `set` / `remove`。

```yaml
# 锻造台：保留底材的全部数据（附魔、耐久损耗、名称等）
result_processors:
  all:
    type: copy_from_source
```

### display_name

物品的自定义显示名称（旧式名称）。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 源物品有自定义名称时复制过来 |
| `add` | `value` 写名称字符串，支持颜色代码与 PlaceholderAPI 变量 |
| `remove` | 移除自定义名称，回退为物品默认名称 |

```yaml
result_processors:
  display_name:
    type: add
    data:
      value: '&6&l传说之剑'
    # 整体替换或移除:
    # type: set
    # type: remove
```

1.20.5 及以上版本的物品名称组件请使用下方的 `item_name`。

### lore

结果物品的说明文本。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 用源物品的 lore 整体替换结果物品的 lore |
| `merge_source` | 结果物品的 lore 在前，源物品的 lore 追加在后 |
| `add` | 把 `value` 中的行**追加**到结果物品已有 lore 之后，支持颜色代码与 PlaceholderAPI 变量 |
| `set` | 清空原有 lore 后写入 `value` 中的行 |
| `remove` | 不写 `data` 时清空全部 lore；写 `value` 时移除与列表中**完全一致**的行 |

```yaml
result_processors:
  lore:
    # 追加两行到已有 lore 之后
    type: add
    data:
      value:
        - '&7传世神器'
        - '&a由下界合金之星锻造'

    # 想整体替换（丢弃原有 lore）时改用:
    # type: set
    # data:
    #   value:
    #     - '&7传世神器'

    # 想移除指定行时:
    # type: remove
    # data:
    #   value:
    #     - '&7传世神器'
```

`remove` 按行内容精确匹配，行里带颜色代码时需要用同样的颜色代码书写才能匹配上。

### enchantments

原版附魔。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的附魔，结果物品没有该附魔、或源等级不低于结果等级时写入源等级 |
| `merge_source` | 仅当源等级**更高**时才覆盖结果已有的附魔 |
| `add` | `data` 直接写 `附魔ID: 等级`，同名附魔覆盖等级 |
| `set` | 清空结果物品的全部附魔后写入 |
| `remove` | 不写 `data` 时清空全部附魔；写 `value` 时移除列出的附魔 |

```yaml
result_processors:
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
      minecraft:mending: 1

    # 只保留指定的附魔:
    # type: set
    # data:
    #   minecraft:sharpness: 10

    # 移除指定附魔:
    # type: remove
    # data:
    #   value:
    #     - "minecraft:sharpness"
```

### attributes

物品的属性修饰器。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 用源物品的属性修饰器整体替换结果物品的 |
| `merge_source` | 把源物品的修饰器追加到结果物品，同一属性可能出现多条 |
| `add` | `value` 写修饰器列表，每一项包含 `attribute`、`amount`、`operation`、`slot` |
| `set` | 清空结果物品的属性修饰器后写入 |
| `remove` | 不写 `data` 时清空全部；写 `value` 时移除指定属性的全部修饰器 |

`add` 的字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `attribute` | 是 | 属性 ID，如 `minecraft:generic.attack_damage` |
| `amount` | 是 | 数值 |
| `operation` | 否 | `ADD_NUMBER`（默认）、`ADD_SCALAR`、`MULTIPLY_SCALAR_1` |
| `slot` | 否 | 生效槽位，默认 `any`；1.20.5+ 使用 `mainhand`、`offhand`、`hand`、`armor`、`any` 等，低版本使用 `HAND`、`OFF_HAND`、`HEAD` 等 |

```yaml
result_processors:
  attributes:
    type: add
    data:
      value:
        - attribute: 'minecraft:generic.attack_damage'
          amount: 10
          operation: ADD_NUMBER
          slot: mainhand
        - attribute: 'minecraft:generic.movement_speed'
          amount: 0.1
          operation: MULTIPLY_SCALAR_1

    # 想先清空再写入:
    # type: set
    # data:
    #   value:
    #     - attribute: 'minecraft:generic.attack_damage'
    #       amount: 20
```

`add` 不会合并同一属性的修饰器，如果再写一条相同属性，两条会同时生效（数值叠加）。需要替换某个属性时，先用 `remove` 移除该属性，再 `add` 新的数值。

### item_flag

物品标志（隐藏附魔、隐藏属性等）。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 用源物品的标志完全替换结果物品的标志 |
| `merge_source` | 只把结果物品还没有的标志追加进来 |
| `add` | 追加 `value` 中的标志 |
| `set` | 清空结果物品的标志后写入 |
| `remove` | 不写 `data` 时清空全部；写 `value` 时移除列出的标志 |

标志名使用 Bukkit 的枚举名，如 `HIDE_ENCHANTS`、`HIDE_ATTRIBUTES`、`HIDE_UNBREAKABLE`、`HIDE_DYE`。

```yaml
result_processors:
  item_flag:
    type: add
    data:
      value:
        - 'HIDE_ENCHANTS'
        - 'HIDE_ATTRIBUTES'

    # 只保留指定标志:
    # type: set
    # data:
    #   value:
    #     - 'HIDE_ENCHANTS'
```

### trim

护甲的纹饰，仅对护甲物品生效。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 源物品有纹饰时复制过来 |
| `add` | 用 `pattern` 与 `material` 指定纹饰，两者都必须能解析到，否则跳过 |
| `remove` | 移除纹饰 |

```yaml
result_processors:
  trim:
    type: add
    data:
      pattern: 'minecraft:spire'
      material: 'minecraft:netherite'
```

### unbreakable

不可破坏标记。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 跟随源物品的不可破坏状态 |
| `add` | `value` 写 `true` 或 `false` |
| `remove` | 取消不可破坏 |

```yaml
result_processors:
  unbreakable:
    type: add
    data:
      value: true
```

### custom_model_data

旧版的自定义模型数据（整数）。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的数值 |
| `add` | `value` 写整数 |
| `remove` | 移除该数据 |

```yaml
result_processors:
  custom_model_data:
    type: add
    data:
      value: 1001
```

1.21.4 及以上版本请使用下方的 `custom_model_data_component`。

### damage

结果物品自身的耐久损耗。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 源物品有耐久损耗时复制该数值 |
| `add` | `value`（或 `damage`）写损耗值；`allow_exceed_max` 控制是否允许超过最大耐久 |
| `remove` | 把损耗清零 |

```yaml
result_processors:
  damage:
    type: add
    data:
      value: 50
      allow_exceed_max: false
```

默认情况下写入值超过物品最大耐久时会被截断到上限，并在控制台输出提示；写 `allow_exceed_max: true` 可以绕过截断。

### base_color

皮革护甲的染色颜色，仅对皮革类护甲生效。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 源物品有颜色时复制该颜色 |
| `add` | `value` 写 `'#RRGGBB'` 或 `'r,g,b'` |
| `remove` | 恢复为皮革的默认颜色 |

```yaml
result_processors:
  base_color:
    type: add
    data:
      value: '#3F76E4'
    # 也可以写成:
    # value: '63,118,228'
```

### skull_profile

头颅物品的皮肤，仅对头颅类物品生效。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的皮肤 |
| `remove` | 清除皮肤 |

皮肤数据无法用一段文本构造，所以没有 `add` / `set`；需要固定皮肤时，把带头颅皮肤的玩家头颅作为源物品（铁砧、锻造台的 base）再用 `copy_from_source` 复制。

```yaml
result_processors:
  skull_profile:
    type: copy_from_source
```

## 1.20.5+ 组件

以下组件需要服务端 1.20.5 及以上，低版本会提示 `Unknown component` 并跳过。

### food

食物的饱食度、饱和度等属性。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 源物品有食物属性时复制过来 |
| `remove` | 移除食物属性 |

没有 `add` / `set`：食物属性包含多个字段，无法用简单配置构造。

```yaml
result_processors:
  food:
    type: copy_from_source
```

### hide_tooltip

是否隐藏整个提示框。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 跟随源物品的设置 |
| `add` | `value` 写 `true` 或 `false` |
| `remove` | 关闭隐藏（恢复显示提示框） |

```yaml
result_processors:
  hide_tooltip:
    type: add
    data:
      value: true
```

### item_name

物品的名称组件。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 源物品有名称组件时复制过来 |
| `add` | `value` 写名称字符串，支持颜色代码与 PlaceholderAPI 变量 |
| `remove` | 移除名称组件 |

```yaml
result_processors:
  item_name:
    type: add
    data:
      value: '&b%player_name%&f的剑'
```

### max_stack_size

最大堆叠数量。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的堆叠上限 |
| `add` | `value` 写整数 |
| `remove` | 恢复为物品默认堆叠上限 |

```yaml
result_processors:
  max_stack_size:
    type: add
    data:
      value: 16
```

### rarity

物品稀有度，决定名称颜色。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的稀有度 |
| `add` | `value` 写 `COMMON`、`UNCOMMON`、`RARE` 或 `EPIC` |
| `remove` | 恢复为默认稀有度 |

```yaml
result_processors:
  rarity:
    type: add
    data:
      value: EPIC
```

### fire_resistance

物品是否防火（不会被岩浆、火焰烧毁）。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 跟随源物品 |
| `add` | `value` 写 `true` 或 `false`，不写时默认为 `true` |
| `remove` | 关闭防火 |

```yaml
result_processors:
  fire_resistance:
    type: add
    data:
      value: true
```

### max_damage

物品的最大耐久上限，与 `damage` 相互独立。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的耐久上限 |
| `add` | `value` 写正整数 |
| `remove` | 恢复为物品默认耐久 |

```yaml
result_processors:
  max_damage:
    type: add
    data:
      value: 3000
```

### enchantment_glint_override

强制显示或隐藏附魔光效。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的设置 |
| `add` | `value` 写 `true`（显示光效）或 `false`（隐藏光效） |
| `remove` | 移除该设置，回到默认表现 |

```yaml
result_processors:
  enchantment_glint_override:
    type: add
    data:
      value: true
```

### potion

药水的基础类型（迅捷、治疗等），仅对药水类物品生效。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 源物品有基础药水类型时复制过来 |
| `remove` | 移除基础药水类型 |

```yaml
result_processors:
  potion:
    type: copy_from_source
```

## 1.21+ 组件

### tool

工具组件（挖掘速度、破坏方块等），需要 1.21 及以上。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的工具组件 |
| `remove` | 移除工具组件 |

```yaml
result_processors:
  tool:
    type: copy_from_source
```

## 1.21.2+ 组件

以下组件需要服务端 1.21.2 及以上。

### glider

物品是否能像鞘翅一样滑翔。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 跟随源物品 |
| `add` | `value` 写 `true` 或 `false` |
| `remove` | 关闭滑翔 |

```yaml
result_processors:
  glider:
    type: add
    data:
      value: true
```

### enchantable

物品的附魔能力值，影响附魔台提供的附魔等级。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的附魔能力值 |
| `add` | `value` 写整数 |
| `remove` | 恢复为物品默认值 |

```yaml
result_processors:
  enchantable:
    type: add
    data:
      value: 30
```

### tooltip_style

提示框的外观样式，需要资源包提供对应的样式定义。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的样式 |
| `add` | `value` 写 `命名空间:ID`，如 `mypack:custom_tooltip` |
| `remove` | 移除样式设置 |

```yaml
result_processors:
  tooltip_style:
    type: add
    data:
      value: 'mypack:custom_tooltip'
```

### use_cooldown

物品的使用冷却。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的冷却时间与冷却组 |
| `add` | `seconds` 写冷却秒数，`group` 写冷却组（可省略） |
| `remove` | 移除冷却设置 |

```yaml
result_processors:
  use_cooldown:
    type: add
    data:
      seconds: 5
      group: 'craftorithm:special_items'
```

同一 `group` 的物品共享冷却：使用了其中一件，同组的其它物品也会进入冷却。

### damage_resistant

物品对特定伤害类型免疫，需要服务端 1.21.2 及以上。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的抗性设置 |
| `remove` | 移除抗性设置 |

```yaml
result_processors:
  damage_resistant:
    type: copy_from_source
```

## 1.21.4+ 组件

以下组件需要服务端 1.21.4 及以上。

### custom_model_data_component

新版的自定义模型数据组件（可包含多组浮点数与字符串）。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的组件内容 |
| `remove` | 移除该组件 |

```yaml
result_processors:
  custom_model_data_component:
    type: copy_from_source
```

### item_model

物品使用的模型。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的模型 |
| `add` | `value` 写 `命名空间:ID`，如 `mypack:custom_model` |
| `remove` | 移除模型设置 |

```yaml
result_processors:
  item_model:
    type: add
    data:
      value: 'mypack:ruby_sword'
```

## 特殊组件

### custom_persistent_data

物品的持久化数据（PDC），常用于给物品打标记，供脚本或其它插件识别。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 不写 `data` 时复制源物品的全部键；写 `key` 与 `type` 时只复制该键 |
| `merge_source` | 只补充结果物品里还没有的键，已有的键保留结果的值 |
| `add` | `data` 直接写 `命名空间:键: 值`，同名键覆盖 |
| `set` | 清空全部键后写入 |
| `remove` | 不写 `data` 时清空全部键；写 `value` 时移除列出的键 |

`add` 的值类型根据 YAML 写法自动判断：字符串、整数、小数、布尔值都会按对应类型写入，其它写法按字符串处理。

```yaml
result_processors:
  custom_persistent_data:
    # 写入两个键
    type: add
    data:
      myns:item_type: 'ruby_sword'
      myns:power: 42
      myns:bound: true

    # 只复制源物品的某个键:
    # type: copy_from_source
    # data:
    #   key: 'myns:quality'
    #   type: STRING

    # 只补充结果物品缺少的键:
    # type: merge_source

    # 清空全部键:
    # type: remove

    # 移除指定键:
    # type: remove
    # data:
    #   value:
    #     - 'myns:item_type'
    #     - 'myns:power'
```

`copy_from_source` 与 `merge_source` 指定 `key` 时必须同时指定 `type`，否则会退化为处理全部键。`type` 的可选值为 `STRING`、`INTEGER`、`LONG`、`DOUBLE`、`FLOAT`、`BYTE`、`BOOLEAN` 等。

## 与 AdvancedEnchantments 一起使用

安装 AdvancedEnchantments 后可以使用 `ae_enchantments` 组件处理它的自定义附魔。

| 策略 | 说明 |
|------|------|
| `copy_from_source` | 复制源物品的自定义附魔 |
| `merge_source` | 仅当源等级更高时覆盖结果已有等级 |
| `remove` | 移除结果物品的全部自定义附魔 |

```yaml
result_processors:
  ae_enchantments:
    type: copy_from_source
```

## 兼容旧语法

旧的 `copy_components_rules` 语法仍然可用，每一项会自动转换为对应组件的 `copy_from_source`：

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

旧语法只对铁砧配方与锻造配方（`vanilla_smithing_transform`、`vanilla_smithing_trim`）生效，其它配方类型请使用 `result_processors`。`copy_components_rules` 与 `result_processors` 同时存在时，只使用后者。

## 完整示例

### 铁砧配方：保留底材数据并追加说明

```yaml
type: anvil
result: 'minecraft:diamond_sword'
base: 'minecraft:netherite_sword'
addition: 'minecraft:nether_star'
cost_level: 10

result_processors:
  # 复制底材的附魔与显示名称
  enchantments:
    type: copy_from_source
  display_name:
    type: copy_from_source

  # 在原有 lore 之后追加两行（不会覆盖底材的 lore）
  lore:
    type: add
    data:
      value:
        - '&7传世神器'
        - '&a由下界合金之星锻造'

  # 合并底材的属性
  attributes:
    type: merge_source

  # 隐藏附魔与属性的提示
  item_flag:
    type: add
    data:
      value:
        - 'HIDE_ENCHANTS'
        - 'HIDE_ATTRIBUTES'

  # 设置为不可破坏
  unbreakable:
    type: add
    data:
      value: true

  # 打上自定义标记，供脚本识别
  custom_persistent_data:
    type: add
    data:
      myns:legendary: true
```

### 锻造台配方：整套覆盖

```yaml
type: 'vanilla_smithing_transform'
result: 'minecraft:netherite_sword'
base: 'minecraft:diamond_sword'
addition: 'minecraft:netherite_ingot'
template: 'minecraft:netherite_upgrade_smithing_template'

result_processors:
  # 复制底材的全部组件
  all:
    type: copy_from_source

  # 再额外补一条附魔
  enchantments:
    type: add
    data:
      minecraft:sharpness: 5
```

### 工作台配方：写入固定内容

工作台没有源物品，只能使用 `add` 或 `remove`（多值组件还可以用 `set`）：

```yaml
type: 'vanilla_shaped'
result: 'minecraft:bread'
pattern:
  - 'AAA'
ingredients:
  A: 'minecraft:wheat'

result_processors:
  lore:
    type: set
    data:
      value:
        - '&7用三个小麦揉成的面包'
  rarity:
    type: add
    data:
      value: UNCOMMON
```

### 烧炼配方：只追加说明

```yaml
type: 'vanilla_smelting_furnace'
result: 'minecraft:diamond'
source: 'minecraft:coal_ore'
experience: 1.0
cooking_time: 200

result_processors:
  lore:
    type: add
    data:
      value:
        - '&7通过烧炼获得'
```
