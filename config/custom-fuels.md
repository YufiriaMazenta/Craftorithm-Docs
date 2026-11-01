---
title: 自定义燃料
---

# 自定义燃料

## 配置文件

`plugins/Craftorithm/custom_fuels.yml`

## 格式

```yaml
fuels:
  - item: "minecraft:command_block"
    burn_time: 100
  - item: "minecraft:bedrock"
    burn_time: 200
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `item` | string | 物品 id，支持命名空间，默认原版（id 即 Material 名） |
| `burn_time` | integer | 燃烧时间（ticks），20 ticks = 1 秒，必须大于 0 |

::: tip 旧版格式
1.16.2.0 之前的版本使用以物品 id 为顶层键的写法：

```yaml
minecraft:command_block:
  burn_time: 100
```

旧格式会在加载时自动迁移为新版 `fuels` 列表格式，无需手动修改。
:::

## 添加命令

```bash
/cra item fuel add <burn_time>
```

手持想要设为燃料的物品，执行命令即可。

## 移除命令

```bash
/cra item fuel remove <fuel_id>
```

## 时间参考

| ticks | 秒 | 物品参考 |
|-------|-----|---------|
| 200 | 10 | 原版木棍 |
| 1600 | 80 | 原版煤炭 |
| 100 | 5 | 示例 |
