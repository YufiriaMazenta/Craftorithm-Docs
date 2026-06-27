---
title: 函数参考
---

# 函数参考

## 条件函数

| 函数 | 语法 | 返回 | 说明 |
|------|------|------|------|
| `perm` | `perm("node")` | Bool | 权限检查 |
| `papi` | `papi("%var%")` | Num/Str | PlaceholderAPI 变量 |
| `level` | `level` / `level >= N` | Num/Bool | 玩家等级 |
| `money` | `money` / `money >= N` | Num/Bool | Vault 金币 |
| `points` | `points` / `points >= N` | Num/Bool | PlayerPoints 积分 |
| `world` | `world` / `world("name")` | Str/Bool | 世界名检查 |
| `game_mode` | `game_mode` / `game_mode("MODE")` | Str/Bool | 游戏模式 |
| `item` | `item("id")` / `item("id") >= N` | Bool | 物品 ID 检查 |
| `biome` | `biome("name")` | Bool | 群系检查 |
| `in_water` | `in_water` | Bool | 水中检查 |
| `in_rain` | `in_rain` | Bool | 雨中检查 |
| `light_level` | `light_level` / `light_level >= N` | Num/Bool | 光照等级 |
| `context` | `context("key")` | Any | 上下文变量 |

## 动作函数

| 函数 | 语法 | 说明 |
|------|------|------|
| `tell` | `tell("msg")` | 发送聊天消息 |
| `actionbar` | `actionbar("msg")` | 发送动作栏 |
| `title` | `title("main", "sub")` | 发送标题 |
| `command` | `command("cmd")` | 以玩家执行命令 |
| `console` | `console("cmd")` | 以控制台执行命令 |
| `take-money` | `take-money(N)` | 扣除金币 |
| `give-money` | `give-money(N)` | 增加金币 |
| `take-level` | `take-level(N)` | 扣除等级 |
| `give-level` | `give-level(N)` | 增加等级 |
| `give-exp` | `give-exp(N)` | 增加经验 |
| `take-points` | `take-points(N)` | 扣除积分 |
| `give-points` | `give-points(N)` | 增加积分 |
| `close` | `close` | 关闭背包 |
| `discover-recipe` | `discover-recipe("key")` | 解锁配方 |
| `undiscover-recipe` | `undiscover-recipe("key")` | 锁定配方 |
| `set` | `set("key", value)` | 设置上下文变量 |

## 自定义函数注册

插件开发者可通过 `ScriptFunctionRegistry` 注册自定义函数：

```java
ScriptFunctionRegistry.INSTANCE.register("my_func", (context, args) -> {
    // args 是 ScriptValue 列表
    // context 包含 Player 和变量
    String msg = args.get(0).getString();
    context.getPlayer().sendMessage(msg);
    return ScriptValue.NullValue.INSTANCE;
});
```

注册后即可在触发器中使用：

```yaml
actions:
  - 'my_func("hello")'
```

详细 API 参见 [Script API](/api/scripts)。
