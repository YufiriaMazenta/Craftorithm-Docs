---
title: 脚本引擎
---

# 脚本引擎概述

Craftorithm 内置了一个编译型脚本引擎，用于触发器的条件判断和动作执行。

## 用途

[触发器](/trigger/index.md)的`conditions` 和 `actions` 本质上是脚本表达式


[菜单](/ui/index.md)中图标的actions和自定义页面的open_actions和close_actions

## 文档导航

- [内置函数](/script/functions.md)

## 语法

## 数据类型

Craftorithm的脚本系统具有四种数据类型，分别如下：

| 类型 | 说明 | 示例 |
|------|------|------|
| `Str` | 字符串 | `"hello"` |
| `Num` | 数字 | `100`、`3.14`、`-5` |
| `Bool` | 布尔值 | `true`、`false` |
| `NullValue` | 空值 | — |

在解析时，字符串一定要使用双引号包裹，否则将出现意外的错误

### 基础写法

脚本支持两种写法，分别是`tell "你好，世界！"`和`tell("你好，世界！")`

通常来说，建议使用第二种写法，会更加直观一些

### 运算符

脚本支持多种运算符

#### 比较运算符：

`>` `<` `==` `>=` `<=` `!=`

#### 逻辑非运算符

`!`

例如：`!perm("craftorithm.perm")`

#### 二元中缀运算符

`&&` `||`

例如：`if game_mode("creative") && perm("craftorithm")`

### 控制流

脚本系统支持使用if-else进行流程控制，写法如下：

```
if game_mode("creative")
tell "你正在创造模式"
elseif game_mode("survival")
tell "你正在生存模式"
elseif game_mode == "ADVENTURE"
tell "你正在冒险模式"
else
tell "你正在旁观者模式"
endif
```

如果是放在yaml中，可以是这样：

```yaml
left:
  - 'if game_mode("creative")'
  - 'tell "你正在创造模式"'
  - 'elseif game_mode("survival")'
  - 'tell "你正在生存模式"'
  - 'elseif game_mode == "ADVENTURE"'
  - 'tell "你正在冒险模式"'
  - 'else'
  - 'tell "你正在旁观者模式"'
  - 'endif'
```

### 注释

脚本系统是支持行注释的，也就是说，你可以这样写`tell "Hello world" //输出语句`

### 函数嵌套

在脚本系统中，可以进行函数嵌套，例如`tell("玩家是否是创造模式：", game_mode("creative"))`

它会先运行`game_mode("creative")`得到结果，然后再tell输出

当然，也可以更多层的嵌套，例如`tell("玩家是否有权限：", perm(context("perm")))`

这句话会先从上下文中获得名为perm的变量，然后再判断玩家是否有这个权限，最后输出结果