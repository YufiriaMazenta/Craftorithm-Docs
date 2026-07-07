---
title: 命令参考
---

# 命令参考

## 主命令

```
/craftorithm <子命令> [参数]
```

别名：`/cra`、`/craft`、`/crafto`

## 子命令列表

### 配方管理

| 命令 | 参数 | 说明 |
|------|----|------|
| `create` | `<type> [recipe_id] [filename]` | 打开配方创建 GUI |
| `edit` | `<recipe_id>` | 打开配方编辑 GUI |
| `remove` | `<recipe_name>` | 删除配方文件并注销 |
| `disable` | `<recipe_id>` | 禁用配方（含原版配方） |
| `display` | `<recipe_id> [player]` | 以 GUI 形式展示配方 |
| `recipebook` | `[--player <name>] [--type <type>]` | 打开配方书浏览界面 |

### 物品管理

| 命令 | 参数 | 说明 |
|------|------|------|
| `item save` | — | 保存手持物品为自定义物品 |
| `item give` | `<item> [player]` | 给予自定义物品 |
| `item fuel add` | `<burn_time>` | 将手持物品添加为燃料 |
| `item fuel remove` | `<fuel_id>` | 移除自定义燃料 |

### 系统命令

| 命令 | 参数 | 说明 |
|------|------|------|
| `reload` | — | 重载插件配置 |
| `version` | — | 显示插件版本 |
| `openmenu` | `<name> [player]` | 打开指定自定义菜单 |
| `script` | `<expression>` | 执行脚本表达式 |

## 配方类型参数

`create` 命令支持以下类型值：

| 类型 | 说明 |
|------|------|
| `vanilla_shaped` | 有序配方 |
| `vanilla_shapeless` | 无序配方 |
| `vanilla_smelting_furnace` | 熔炉烧炼 |
| `vanilla_smelting_blast` | 高炉烧炼 |
| `vanilla_smelting_smoker` | 烟熏炉烧炼 |
| `vanilla_smelting_campfire` | 营火烧炼 |
| `vanilla_smithing_transform` | 锻造台改造 |
| `vanilla_stonecutting` | 切石机 |
| `vanilla_brewing` | 酿造台 (仅 Paper) |
| `anvil` | 铁砧 |

## 使用示例

```bash
# 创建一个有序配方，ID 为 my_sword，保存到 weapons.yml
/cra create vanilla_shaped my_sword weapons.yml

# 编辑配方
/cra edit craftorithm:my_sword

# 禁用原版钻石剑配方
/cra disable minecraft:diamond_sword

# 向其他玩家展示配方
/cra display craftorithm:my_sword PlayerName

# 打开配方书
/cra recipebook --player Steve --type vanilla_shaped

# 执行脚本
/cra script perm("craftorithm.vip")
```

## Tab 补全

所有命令支持 Tab 补全：
- 配方类型自动补全
- 已注册配方 ID 自动补全
- 在线玩家名自动补全
- 自定义菜单名自动补全
