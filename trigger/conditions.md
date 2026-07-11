---
title: 条件
---
`
# 条件

在每个触发器中，可以通过编写条件来决定是否执行这个触发器

条件写在触发器的 `conditions` 列表中，条件列表中每个字符串是一个条件表达式，多个条件之间隐式使用 `&&` 连接（全部满足才通过）。

## 写法

### 1.11.4.0及后续版本

conditions支持多种写法, 分别如下:

#### 1.兼容旧版本的写法:

在这种写法中, conditions是一个列表, 每个列表中的表达式都必须返回bool类型的变量, 否则会报错

当所有的条件都满足时, conditions才会通过

例如:

```yaml
conditions:
  - 'perm("craftorithm.vip")'
  - 'level >= 10'
  - 'world("world_nether")'
```

#### 2.新版本写法

在新版本的写法中, conditions的结构如下:

```yaml
conditions:
  mode: and / script
  body:
    - '...'
    - '...'
```

mode用于设定如何解析body中所写的内容, 有`and`和`script`两种类型

在`and`模式下, body中所写的内容和旧版本的解析方式相同, 也就是每一条都是一个表达式, 需要全部满足才能放行

在`script`模式下, body中所写的内容会被识别为一个完整的script代码块, 你需要手动使用`return`返回结果

例如:

```yaml
script_conditions:
  type: crafting
  recipes:
    - 'craftorithm:shaped_01'
  conditions:
    mode: 'script'
    body:
      - 'if !perm("craftorithm.recipe.1")'
      - '  tell("&c你没有权限!")'
      - '  close'
      - '  return false'
      - 'elseif context("ingredient_0_0_amount") < 2'
      - '  tell("&c材料数量不足!")'
      - '  close'
      - '  return false'
      - 'elseif context("ingredient_0_0") == "items:example_item:1"'
      - '  tell("&c不能使用这个材料!")'
      - '  close'
      - '  return false'
      - 'else'
      - '  return true'
      - 'endif'
  actions:
    - 'tell "&a合成成功！消耗10级经验"'
```