---
title: 禁用配方
---

# 禁用配方

Craftorithm 支持禁用任意配方，包括原版配方和其他插件注册的配方。

## 方式一：命令禁用

```bash
/cra disable <recipe_id>
```

示例：

```bash
# 禁用原版钻石剑配方
/cra disable minecraft:diamond_sword

# 禁用 Craftorithm 配方
/cra disable craftorithm:my_recipe
```

禁用后配方会自动记录到 `disabled_recipes.yml` 中。

## 方式二：编辑配置文件

编辑 `plugins/Craftorithm/disabled_recipes.yml`：

```yaml
recipes:
  - 'minecraft:diamond_sword'
  - 'minecraft:golden_apple'
  - 'minecraft:enchanted_golden_apple'
```

## 注意事项

- 禁用的配方在服务器启动或 `/cra reload` 时生效
- 禁用 ≠ 删除：禁用只是移除配方注册，不影响配方定义文件
- Craftorithm 注册的配方也可以被禁用
- 使用 `/cra disable` 命令禁用的配方会自动写入 `disabled_recipes.yml`
