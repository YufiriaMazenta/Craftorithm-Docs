---
title: 权限节点
---

# 权限节点

::: tip 权限结构说明
从 1.15.1.0 起，插件权限采用「能力导向」命名，格式为 `craftorithm.<域>.<能力>`，命令与图形界面复用同一条权限。若你之前通过权限插件配置过旧节点（如 `craftorithm.command.create`、`craftorithm.edit_recipe`），需要按新节点进行迁移。
:::

## 默认权限

| 权限节点 | 说明 | 默认 |
|---------|------|------|
| `craftorithm.command` | 所有基础命令（根命令） | OP |
| `craftorithm.command.reload` | 重载插件 | OP |
| `craftorithm.command.version` | 查看版本 | OP |
| `craftorithm.command.script` | 执行脚本 | OP |
| `craftorithm.command.openmenu` | 打开自定义菜单 | OP |
| `craftorithm.command.recipebook` | 打开配方书 | OP |
| `craftorithm.recipe.create` | 创建配方 | OP |
| `craftorithm.recipe.remove` | 删除配方 | OP |
| `craftorithm.recipe.edit` | 编辑配方 | OP |
| `craftorithm.recipe.display` | 展示配方 | OP |
| `craftorithm.recipe.disable` | 禁用配方 | OP |
| `craftorithm.recipe.restore` | 恢复被禁用的配方 | OP |
| `craftorithm.recipe.discover` | 为玩家解锁配方 | OP |
| `craftorithm.recipe.undiscover` | 取消解锁玩家的配方 | OP |
| `craftorithm.item` | 物品管理 | OP |

## 触发器权限

触发器中可使用自定义权限节点进行条件判断：

```yaml
my_trigger:
  type: crafting
  recipes: ['craftorithm:my_recipe']
  conditions:
    - 'perm("craftorithm.trigger.vip")'
  actions:
    - 'tell("&aVIP 专属配方！")'
```

权限节点名称可自由定义，在触发器的 `perm()` 函数中引用即可。

## 通配符权限

使用权限管理插件（如 LuckPerms）可设置通配符权限：

```
craftorithm.*          # 授予所有权限
craftorithm.command.*  # 授予所有命令权限
```
