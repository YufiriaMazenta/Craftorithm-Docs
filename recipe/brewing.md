---
title: 酿造配方
---

# 酿造配方 (Brewing Recipe)

::: warning 前置条件
26.2以下版本，酿造配方仅支持 **Paper** 服务端
26.3及以上版本，Spigot服务端也可以使用酿造配方
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
