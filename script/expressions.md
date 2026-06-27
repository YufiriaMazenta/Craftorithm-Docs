---
title: 表达式与运算符
---

# 表达式与运算符

## 字面量

```yaml
# 字符串 — 双引号包裹
"hello world"

# 数字 — 整数或浮点
100
3.14
-5

# 布尔值
true
false
```

## 比较运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `==` | 等于 | `level == 10` |
| `!=` | 不等于 | `level != 0` |
| `>` | 大于 | `level > 5` |
| `>=` | 大于等于 | `level >= 10` |
| `<` | 小于 | `money < 100` |
| `<=` | 小于等于 | `money <= 100` |

当其中一个操作数为数字时，自动使用数值比较；否则使用字符串比较。

## 逻辑运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `&&` | 逻辑与（短路） | `level >= 10 && money >= 100` |
| `\|\|` | 逻辑或（短路） | `perm("a") \|\| perm("b")` |
| `!` | 逻辑非 | `!perm("banned")` |

`&&` 和 `||` 均支持短路求值：`&&` 左侧为 false 时不再求值右侧，`||` 左侧为 true 时不再求值右侧。

## 函数调用

### 括号调用（推荐）

```
perm("craftorithm.vip")
tell("&aHello!")
title("&aTitle", "&bSubtitle")
```

### 裸参数调用

```
perm "craftorithm.vip"
tell "&aHello!"
level >= 10
```

参数以空格分隔，遇到运算符（`==`、`>=`、`&&` 等）停止收集。

### 无参调用

```
level
money
in_water
```

标识符后跟运算符、换行或文件结尾时，作为无参函数调用。

## 条件控制流

```
if perm "craftorithm.admin"
    tell "&c管理员你好"
elseif level >= 10
    tell "&a高级玩家"
else
    tell "&7普通玩家"
endif
```

- `if` / `elseif` 后跟条件表达式
- `else` 分支可选
- `endif` 结束条件块

## return 语句

```
if level < 10
    return
endif
tell "&a你已达到 10 级"
```

提前终止脚本执行。

## 运算符优先级

从高到低：

1. `()` 括号
2. `!` 逻辑非
3. 比较运算符：`==`、`!=`、`>`、`>=`、`<`、`<=`
4. `&&` 逻辑与
5. `||` 逻辑或

## 表达式组合示例

```
// 多条件组合
level >= 10 && money >= 1000 && perm("craftorithm.vip")

// 带括号的复杂逻辑
(perm("a") || perm("b")) && level >= 5

// 函数返回值比较
papi("%player_level%") >= "10"
```
