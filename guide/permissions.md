---
title: 权限节点
---

# 权限节点

## 默认权限

| 权限节点 | 说明 | 默认 |
|---------|------|------|
| `craftorithm.command` | 所有基础命令 | OP |
| `craftorithm.command.reload` | 重载插件 | OP |
| `craftorithm.command.version` | 查看版本 | OP |
| `craftorithm.command.create` | 创建配方 | OP |
| `craftorithm.command.disable` | 禁用配方 | OP |
| `craftorithm.command.display` | 展示配方 | OP |
| `craftorithm.command.recipebook` | 打开配方书 | OP |
| `craftorithm.command.openmenu` | 打开自定义菜单 | OP |
| `craftorithm.command.script` | 执行脚本 | OP |
| `craftorithm.command.item` | 物品管理 | OP |
| `craftorithm.edit_recipe` | 编辑配方 | OP |
| `craftorithm.recipe.remove` | 删除配方 | OP |

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
