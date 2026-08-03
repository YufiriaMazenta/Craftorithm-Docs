---
title: 配方系统
---

# 配方系统概述

Craftorithm 支持 11 种配方类型，覆盖 Minecraft 中所有合成方式。

## 支持的配方类型

| 类型 | 说明 | 配方文件 type 值 |
|------|------|-----------------|
| 有序配方 | 工作台按形状排列 | `vanilla_shaped` |
| 无序配方 | 工作台不按形状 | `vanilla_shapeless` |
| 熔炉烧炼 | 熔炉冶炼 | `vanilla_smelting_furnace` |
| 高炉烧炼 | 高炉冶炼 | `vanilla_smelting_blast` |
| 烟熏炉烧炼 | 烟熏炉烹饪 | `vanilla_smelting_smoker` |
| 营火烧炼 | 营火烹饪 | `vanilla_smelting_campfire` |
| 锻造台改造 | 锻造台升级装备 | `vanilla_smithing_transform` |
| 锻造台纹饰 | 锻造台添加纹饰 (1.20+) | `vanilla_smithing_trim` |
| 切石机 | 切石台加工 | `vanilla_stonecutting` |
| 酿造台 | 药水酿造 (仅 Paper) | `vanilla_brewing` |
| 铁砧 | 铁砧合成 | `anvil` |

## 配方文件

- 位置：`plugins/Craftorithm/recipes/`
- 格式：YAML
- 命名空间：文件名即配方命名空间，例如 `my_recipe.yml` → `craftorithm:my_recipe`
- 支持通过 `recipe_id` 字段指定与文件名不同的配方 ID

## 通用字段

所有配方类型共有的字段：

```yaml
type: 'vanilla_shaped'      # 配方类型（必填）
result: 'minecraft:diamond'  # 产出物品（必填）
group: 'example'             # 配方分组（可选）
recipe_id: 'my_recipe'       # 自定义配方 ID（可选，默认为文件名）
result_processors:           # 结果处理器（可选，1.13.0.0+）
  enchantments:
    type: copy_from_source
```

## 物品指定方式

在配方中指定物品时，支持以下格式：

| 格式 | 示例 | 说明 |
|------|------|------|
| 原版物品 | `minecraft:diamond` | Minecraft 原版物品 ID |
| 物品组 | `item_pack:ores` | 引用 `item_packs.yml` 中定义的物品组 |
| 自定义物品 | `craftorithm:my_item` | 引用 `items/` 目录中的自定义物品 |
| 外部插件物品 | `itemsadder:my_item` | 引用外部物品插件的物品 |

## 创建方式

### GUI 创建（推荐新手）

```
/cra create <type> [recipe_id] [filename]
```

打开图形界面，通过点击操作完成配方创建。

### 手写 YAML（推荐进阶）

直接在 `recipes/` 目录下创建 YAML 文件，适合批量创建或精确控制。

## 结果处理器 (result_processors)

1.13.0.0 版本新增了结果处理器功能，用于在合成时为配方结果添加额外效果。结果处理器可以复制、添加或移除物品的组件。

**注意**：切石机配方 (`vanilla_stonecutting`) 暂不支持结果处理器。

支持的配方类型：铁砧、锻造台、烧炼、酿造台、有序/无序配方。

详细用法参见 [结果处理器](/recipe/result-processor.md)。
