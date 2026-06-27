---
title: 物品Tag
---

# 物品Tag (tag)

物品tag是原版提供的标签功能，一个标签内包含多个物品。

物品tag可以在配方内作为原材料，使得一个槽位允许不同类型的物品

典型案例：箱子合成配方允许所有类型的木板用于合成

## 在配方中使用

使用 `tag:<name>` 前缀引用物品tag：

```yaml
type: 'vanilla_shaped'
result: 'minecraft:iron_ingot'
shape:
  - 'AA'
  - 'AA'
ingredients:
  A: 'tag:leaves'  # 接受任何树叶
```

## 用途

- **多材料兼容**：一个配方接受多种同类材料（如所有颜色的羊毛、所有木材类型）
- **简化配置**：避免为每种材料变体创建单独配方

## 注意事项

目前存在的物品Tag可以在这两个页面查看：

https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Tag.html

https://bukkit.windit.net/javadoc/org/bukkit/Tag.html