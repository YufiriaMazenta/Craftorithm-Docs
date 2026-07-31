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

| 类型          | 说明  | 示例                    |
|-------------|-----|-----------------------|
| `Str`       | 字符串 | `"hello"`             |
| `Num`       | 浮点数 | `100.0`、`3.14`、`-5.0` |
| `Int`       | 整数  | `10` `5` `7`          |
| `Bool`      | 布尔值 | `true`、`false`        |
| `NullValue` | 空值  | —                     |

在解析时，字符串一定要使用双引号包裹，否则将出现意外的错误

### 写法示例

#### 1. 数据类型

```
// 字符串
var greeting = "Hello World"
var name = "Steve"

// 整数
var level = 10
var health = 20

// 浮点数
var pi = 3.14
var speed = 1.5

// 布尔
var alive = true
var online = false

```

#### 2. 变量

```
// 声明（var 关键字）
var x = 10
var y = 20

// 重新赋值（不需要 var，但变量必须已声明）
x = 30
y = x + 10

// 访问变量
var sum = x + y
var message = "value is " + x

// 字符串内插值（${} 语法，仅限字符串内）
var text = "x=${x}, y=${y}"
```

#### 3. 运算符

```
// 算术运算
var a = 10 + 3      // 13
var b = 10 - 3      // 7
var c = 10 * 3      // 30
var d = 10 / 3      // 3（整数除法）
var e = 10 % 3      // 1（取模）

// 比较运算（返回布尔值）
var eq = (10 == 10)   // true
var neq = (10 != 5)   // true
var gt = (10 > 5)     // true
var gte = (10 >= 10)  // true
var lt = (5 < 10)     // true
var lte = (5 <= 10)   // true

// 逻辑运算
var and = (true && true)    // true
var or = (true || false)    // true
var not = (!true)           // false

// 一元运算
var neg = -100
var notFlag = !false
```

#### 4. 字符串

```
// 普通字符串
var s1 = "Hello"
var s2 = "World"

// 字符串拼接
var s3 = s1 + " " + s2    // "Hello World"

// 字符串插值（${} 语法，仅限字符串内）
var player = "Steve"
var msg1 = "Hello ${player}"           // "Hello Steve"
var msg2 = "Level: ${level}"           // "Level: 10"
var msg3 = "${s1} ${s2}!"              // "Hello World!"

// 转义字符
var s4 = "He said \"Hi\""             // 双引号
var s5 = "Line1\nLine2"               // 换行
var s6 = "Path\\to\\file"             // 反斜杠
var s7 = "Tab\there"                  // 制表符
```

#### 5. 条件判断

```
// 基本 if
if level >= 10
  tell("High level")
endif

// if-else
if health > 0
  tell("Alive")
else
  tell("Dead")
endif

// if-elseif-else
if score >= 90
  tell("Grade: A")
elseif score >= 80
  tell("Grade: B")
elseif score >= 70
  tell("Grade: C")
else
  tell("Grade: F")
endif

// 嵌套条件
if online == true
  if level >= 10
    tell("Online high level player")
  else
    tell("Online low level player")
  endif
endif

// 复合条件
if level >= 10 && online == true
  tell("Qualified")
endif

if health <= 0 || online == false
  tell("Not available")
endif

// 逻辑非
if !online
  tell("Offline")
endif
```

#### 6. 函数调用
```
// 模块函数调用（冒号 : 分隔）
math:sqrt(144)
math:random()
math:random_int(100)
math:abs(-100)
math:max(10, 20)
math:pow(2, 8)
math:floor(3.7)
math:ceil(3.2)
math:round(3.5)

// 无参函数
level()
```