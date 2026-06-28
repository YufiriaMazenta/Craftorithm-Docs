---
title: 酿造配方
---

# 酿造配方 (Brewing Recipe)

::: warning 前置条件
酿造配方仅支持 **Paper** 服务端，Spigot 服务端无法使用此功能。
:::

## YAML 示例

```yaml
type: 'vanilla_brewing'
result: 'minecraft:potion'
input: 'minecraft:potion'
ingredient: 'minecraft:glistering_melon_slice'
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 固定为 `vanilla_brewing` |
| `result` | string | 是 | 产出物品 ID |
| `input` | string | 是 | 酿造台中的输入物品（药水瓶） |
| `ingredient` | string | 是 | 添加的酿造材料 |

## 注意事项

- 输入物品通常为药水类型 (`minecraft:potion`、`minecraft:splash_potion`、`minecraft:lingering_potion`)
- 药水效果需要通过物品的 NBT/Component 数据指定
- 使用 `/cra create vanilla_brewing` 命令可通过 GUI 方式创建，避免手动编写 NBT
