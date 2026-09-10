---
title: 物品组
---

# 物品组 (Item Packs)

物品组允许将多个物品定义为一个集合，在配方中作为材料接受组内的任意物品。

其功能类似于物品Tag，但是是可以自定义的

## 定义文件

`plugins/Craftorithm/item_packs.yml`：

```yaml
all_wood:
  - 'minecraft:oak_planks'
  - 'minecraft:spruce_planks'
  - 'minecraft:birch_planks'
  - 'minecraft:jungle_planks'
  - 'minecraft:acacia_planks'
  - 'minecraft:dark_oak_planks'
  - 'minecraft:mangrove_planks'
  - 'minecraft:cherry_planks'
  - 'minecraft:bamboo_planks'

ores:
  - 'minecraft:diamond'
  - 'minecraft:emerald'
  - 'minecraft:iron_ingot'
  - 'minecraft:gold_ingot'
```

物品组中可以包含tag或定义在它上面的物品组, 例如:

```yaml
pack1:
  - 'minecraft:stone'
pack2:
  - 'item_pack:pack1'
  - 'tag:minecraft:leaves'
```

## 在配方中使用

使用 `item_pack:<name>` 前缀引用物品组：

```yaml
type: 'vanilla_shaped'
result: 'minecraft:crafting_table'
shape:
  - 'AA'
  - 'AA'
ingredients:
  A: 'item_pack:all_wood'  # 接受任何木材
```

## 用途

- **多材料兼容**：一个配方接受多种同类材料（如所有颜色的羊毛、所有木材类型）
- **简化配置**：避免为每种材料变体创建单独配方
- **易于维护**：新增材料只需在物品组中添加一行

## 注意事项

- 物品组只在 `ingredient`、`base`、`addition` 等输入字段中有效
- `result`（产出）字段不支持物品组
- 物品组中的物品 ID 必须是有效的原版 ID 或已注册的外部插件物品
