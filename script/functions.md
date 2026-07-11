---
title: 函数
---

# 内置函数

### `perm`

这个函数它的作用是判断玩家是否有某权限

它接受一个参数，当输入多个参数时，后续的参数将会被忽略

### `papi`

这个函数的作用是解析一个PlaceholderAPI变量

它接受一个参数，当输入多个参数时，后续的参数将会被忽略

### `level`/`money`/`points`/`light_level`

这四个函数的作用类似，都是用于返回玩家的某项数值

`level`返回玩家当前的等级

`money`返回玩家当前的Vault钱数

`points`返回玩家当前的PlayerPoints点数

`light_level`返回玩家当前所处位置的光照等级

### `world`/`gamemode`/`biome`

这三个函数都有两种用法

`world`在无参数时会返回玩家当前所在世界的名字，而如果有输入参数，它会判断玩家是否在第一个参数所对应的世界

`gamemode`在无参数时会返回玩家当前的游戏模式（返回的字符串为全大写），而如果有输入参数，它会判断玩家是否是第一个参数对应的模式（无所谓大小写）

`biome`在无参数时会返回玩家当前所属群系的key，而如果有输入参数，它会判断玩家是否在第一个参数对应的群系

### `item`

这个函数实际上只在物品相关的触发器里有效，它的作用是判断事件涉及的物品是否是某个物品

它接受一个参数，这个参数是物品ID，和在配方里的物品系统相同

### `in_rain`/`in_water`

这两个函数的作用类似，`in_rain`返回玩家是否在雨中，`in_water`返回玩家是否在水中，他们都不接受任何参数

### `context`

这个函数的作用是从上下文获取一个变量的值，所以它可能会返回任何类型的值

它接受一个参数，这个参数就是想要获取变量的名字

从1.13.3.0版本开始，你也可以使用形如`${变量名字}`的方式，来获取上下文变量

`${变量名字}`也可以用在字符串中，例如
```yaml
set("player_name", "Steve")
tell("Hello, ${player_name}")
```

### `tell`/`actionbar`/`title`/`log`

这四个函数的作用都是输出内容，并且都会自动解析PlaceholderAPI变量

但是用法有略微不同

`tell` `actionbar` `log`都接受所有的参数，它们会将所有参数拼接在一起输出

`tell`是发送消息给玩家聊天栏

`actionbar`是发送消息给玩家动作栏

`log`是发送消息给服务器后台

`title`它只接受两个参数，第一个参数发送给玩家的主标题栏，第二个参数发送给玩家的副标题栏

### `command`/`console`

这两个函数的作用都是执行命令，并且都会自动解析PlaceholderAPI变量，都接受所有的参数，它们会将所有参数拼接在一起作为一个命令

`command`是以玩家身份执行命令

`console`是以服务器后台身份执行命令

### `take_money`/`give_money`/`take_level`/`give_level`/`give_exp`/`take_points`/`give_points`

这七个函数的用法都差不多，他们都接受一个数字类型的变量

`take_money` `take_level` `take_points`分别是扣除玩家Vault钱数、等级和PlayerPoints点数

`give_money` `give_level` `give_exp` `give_points`分别是给予玩家Vault钱数、等级、经验和PlayerPoints点数

### `close`/`back`

这两个函数都是在菜单里使用的，且他们都不接受任何参数

`close`是直接关闭玩家当前打开的页面

`back`在玩家有上一个菜单的大部分情况下将会返回到上一个菜单，如果没有上一个菜单则直接关闭页面

### `openmenu`

这个函数用于打开Craftorithm的自定义菜单

它接受一个参数，会打开对应名字的菜单

### `discover_recipe`/`undiscover_recipe`

这两个函数都是用于配方书管理的，它们都只接受一个参数

`discover_recipe`是为玩家在配方书解锁一个配方

`undiscover_recipe`则是取消解锁指定配方

### `sound`

这个函数是用于给玩家播放音频的，它最多接受三个参数

第一个参数是音频的key，格式为`<namespace>:<key>`

第二个参数是音频的音量

第三个参数是音频的音高

### `set_inv_item`(1.11.2.0+)

这个函数的作用是设置玩家当前打开页面的指定位置的物品, 它必须接受两个参数

第二个参数为物品的id, 和在配方里的物品系统相同, 并且它可以指定数量

示例: `set_inv_item(0, "minecraft:bucket 1")`

它的替换是强制的。并且为了防止出现一些意外的情况, 替换物品的操作会延迟1tick进行 

### `set`

这个函数的功能类似于声明变量，它一般情况下是配合`context`函数使用的

它接受两个参数，第一个参数是变量的名字，为字符串类型。第二个参数为变量的内容，可以是任意类型

### `delay`

这是一个特殊的函数，他的作用是暂停当前的脚本运行，并在指定tick后运行

它接受一个参数，这个参数必须是整数

### `abs`(1.11.3.0+)

这个函数的用途是返回传入值的绝对值，例如`abs(-1)`的返回值为1

### `min`(1.11.3.0+)

这个函数的用途是返回传入两个值中的较小值, 例如`min(1, 0)`的返回值为0

### `max`(1.11.3.0+)

这个函数的作用是返回传入两个值中的较大值, 例如`max(1, 0)`的返回值是1

### `round`(1.11.3.0+)

这个函数的作用是四舍五入, 例如`round(10.6)`的返回值是11

### `floor` `ceil`(1.11.3.0+)

`floor`的作用是向下取整, `ceil`的作用是向上取整

例如`floor(6.1)`的值为6, 而`ceil(6.8)`的值为7

### `pow`(1.11.3.0+)

它的作用是进行幂运算, 必须输入两个数字变量, 可以是浮点数

例如`pow(2, 4)`返回的值为2的四次方, 也就是16

### `random`(1.11.3.0+) / `random_int`(1.11.4.0+)

这两个函数的作用是返回一个随机数, 区别在于`random`返回的是浮点数, 而`random_int`返回的是整数

`random`输入的变量数可以是0个,1个或2个, 而`random_int`必须输入至少一个变量

当没有变量输入时, 会返回0到1之间的一个随机数, 这个随机数可能是0, 但不会是1

当输入一个变量时, 会返回0到你输入的这个数之间的一个随机数, 这个随机数可能为0, 但不会是你输入的数

当输入两个变量时, 会返回从第一个数到第二个数之间的一个随机数, 这个随机数可能会等于较小的值, 但不会是较大的值

### `int` / `float`(1.11.4.0+)

这两个函数的作用是强制类型转换, `int`强制让数字为整数, `float`强制让数字为浮点数

他们都必须接受一个变量

例如`set("num_var", int(1.1))`, 虽然传入的是1.1, 但是实际设置的值是1

# 自定义函数注册

插件开发者可通过 `ScriptFunctionRegistry` 注册自定义函数：

```java
ScriptFunctionRegistry.INSTANCE.register("my_func", (context, vm, args) -> {
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

### 函数命名限制

自定义函数的名称**只能包含字母、数字和下划线**（`[a-zA-Z0-9_]`），**不允许使用连字符 `-`**。

这是因为 `-` 在脚本引擎中被解析为减法运算符，会导致函数名被拆分为多个 token，从而无法正确识别。

✅ 合法的函数名：`my_func`、`take_money`、`giveExp2`、`check_level`

❌ 不合法的函数名：`my-func`、`take-money`、`give-exp`

详细 API 参见 [Script API](/api/scripts.md)。
