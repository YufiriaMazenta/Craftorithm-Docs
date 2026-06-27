---
title: 动作函数
---

# 动作函数

动作函数一般用于触发器的 `actions` 列表中，条件通过后按顺序执行。

## 语法

```yaml
actions:
  - 'tell("&a条件通过！")'
  - 'give-level(100)'
  - 'command("give %player_name% diamond 1")'
```

## 消息与通知

### tell — 发送聊天消息

```yaml
- 'tell("&aHello!")'
- 'tell("&aHello ", "&bWorld!")'
```

- 多个参数会自动拼接
- 支持 `&` 颜色代码

### actionbar — 发送动作栏

```yaml
- 'actionbar("&e提示信息")'
```

### title — 发送标题

```yaml
- 'title("&a主标题", "&b副标题")'
```

- 参数1：主标题
- 参数2：副标题
- 淡入/停留/淡出：10/70/20 ticks

## 命令执行

### command — 以玩家身份执行

```yaml
- 'command("give %player_name% diamond 1")'
- 'command("spawn")'
```

- 以玩家权限执行

### console — 以控制台执行

```yaml
- 'console("say 服务器公告")'
- 'console("give %player_name% diamond 1")'
```

- 以控制台权限执行

## 经济系统

### take-money / give-money

```yaml
- 'take-money(100)'
- 'give-money(1000)'
```

- 需安装 Vault
- 参数为金额

### take-level / give-level

```yaml
- 'take-level(5)'
- 'give-level(10)'
```

- 参数为经验等级数

### give-exp

```yaml
- 'give-exp(50)'
```

- 参数为经验值（非等级）

### take-points / give-points

```yaml
- 'take-points(50)'
- 'give-points(100)'
```

- 需安装 PlayerPoints
- 参数为积分数

## 配方管理

### discover-recipe / undiscover-recipe

```yaml
- 'discover-recipe("craftorithm:my_recipe")'
- 'undiscover-recipe("minecraft:diamond_sword")'
```

- 解锁/锁定配方（对玩家可见/不可见）

## 背包操作

### close — 关闭背包

```yaml
- 'close'
```

- 关闭玩家当前打开的背包界面

## 变量操作

### set — 设置上下文变量

```yaml
- 'set("key", "value")'
- 'set("count", 100)'
```

- 在脚本上下文中设置变量，供后续条件或动作使用

## 组合示例

```yaml
actions:
  - 'take-money(100)'
  - 'take-level(5)'
  - 'give-level(10)'
  - 'command("give %player% diamond_sword 1")'
  - 'tell("&a合成成功！消耗 100 金币和 5 等级")'
  - 'actionbar("&e+1 钻石剑")'
```
