---
title: Script Engine
---

# Script Engine Overview

Craftorithm includes a compiled script engine used for trigger condition evaluation and action execution.

## Usage

[Trigger](/en/trigger/index.md)'s `conditions` and `actions` are essentially script expressions.

[Menu](/en/ui/index.md) icon actions and custom page's open_actions and close_actions.

## Documentation Navigation

- [Built-in Functions](/en/script/functions.md)

## Syntax

### Global Variables (1.13.3.0+)

Starting from version 1.13.3.0, the script system has global variables that can be used anywhere scripts are used, such as triggers and UI.

There are currently three global variables: `server`, `recipe_manager`, and `item_manager`.

`server` is the server's Server instance, typically CraftServer.

`recipe_manager` is the plugin's recipe manager.

`item_manager` is the plugin's item system manager.

### Data Types

Craftorithm's script system has five data types as follows:

| Type | Description | Example |
|------|-------------|---------|
| `Str` | String | `"hello"` |
| `Num` | Floating-point number | `100.0`, `3.14`, `-5.0` |
| `Int` | Integer | `10` `5` `7` |
| `Bool` | Boolean | `true`, `false` |
| `NullValue` | Null | — |

When parsing, strings must be enclosed in double quotes, otherwise unexpected errors will occur.

### Usage Examples

#### 1. Data Types

```
// String
var greeting = "Hello World"
var name = "Steve"

// Integer
var level = 10
var health = 20

// Floating-point number
var pi = 3.14
var speed = 1.5

// Boolean
var alive = true
var online = false

```

#### 2. Variables

```
// Declaration (var keyword)
var x = 10
var y = 20

// Reassignment (no var needed, but variable must be declared)
x = 30
y = x + 10

// Accessing variables
var sum = x + y
var message = "value is " + x

// String interpolation (${ } syntax, only inside strings)
var text = "x=${x}, y=${y}"
```

#### 3. Operators

```
// Arithmetic operations
var a = 10 + 3      // 13
var b = 10 - 3      // 7
var c = 10 * 3      // 30
var d = 10 / 3      // 3 (integer division)
var e = 10 % 3      // 1 (modulus)

// Comparison operations (return boolean)
var eq = (10 == 10)   // true
var neq = (10 != 5)   // true
var gt = (10 > 5)     // true
var gte = (10 >= 10)  // true
var lt = (5 < 10)     // true
var lte = (5 <= 10)   // true

// Logical operations
var and = (true && true)    // true
var or = (true || false)    // true
var not = (!true)           // false

// Unary operations
var neg = -100
var notFlag = !false
```

#### 4. Strings

```
// Normal strings
var s1 = "Hello"
var s2 = "World"

// String concatenation
var s3 = s1 + " " + s2    // "Hello World"

// String interpolation (${ } syntax, only inside strings)
var player = "Steve"
var msg1 = "Hello ${player}"           // "Hello Steve"
var msg2 = "Level: ${level}"           // "Level: 10"
var msg3 = "${s1} ${s2}!"              // "Hello World!"

// Escape characters
var s4 = "He said \"Hi\""             // Double quotes
var s5 = "Line1\nLine2"               // Newline
var s6 = "Path\\to\\file"             // Backslash
var s7 = "Tab\there"                  // Tab
```

#### 5. Conditional Statements

```
// Basic if
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

// Nested conditions
if online == true
  if level >= 10
    tell("Online high level player")
  else
    tell("Online low level player")
  endif
endif

// Compound conditions
if level >= 10 && online == true
  tell("Qualified")
endif

if health <= 0 || online == false
  tell("Not available")
endif

// Logical NOT
if !online
  tell("Offline")
endif
```

#### 6. Function Calls
```
// Module function calls (colon : separator)
math:sqrt(144)
math:random()
math:random_int(100)
math:abs(-100)
math:max(10, 20)
math:pow(2, 8)
math:floor(3.7)
math:ceil(3.2)
math:round(3.5)

// Parameterless functions
level()
```