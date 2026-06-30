---
title: 函数
---

# 内置函数

## `perm`

这个函数它的作用是判断玩家是否有某权限

它接受一个参数，当输入多个参数时，后续的参数将会被忽略

## `papi`

这个函数的作用是解析一个PlaceholderAPI变量

它接受一个参数，当输入多个参数时，后续的参数将会被忽略

## `level`/`money`/`points`/`light_level`

这四个函数的作用类似，都是用于返回玩家的某项数值

`level`返回玩家当前的等级

`money`返回玩家当前的Vault钱数

`points`返回玩家当前的PlayerPoints点数

`light_level`返回玩家当前所处位置的光照等级

## `world`/`gamemode`/`biome`

这三个函数都有两种用法

`world`在无参数时会返回玩家当前所在世界的名字，而如果有输入参数，它会判断玩家是否在第一个参数所对应的世界

`gamemode`在无参数时会返回玩家当前的游戏模式（返回的字符串为全大写），而如果有输入参数，它会判断玩家是否是第一个参数对应的模式（无所谓大小写）

`biome`在无参数时会返回玩家当前所属群系的key，而如果有输入参数，它会判断玩家是否在第一个参数对应的群系

## `item`

这个函数实际上只在物品相关的触发器里有效，它的作用是判断事件涉及的物品是否是某个物品

它接受一个参数，这个参数是物品ID，和在配方里的物品系统相同

## `in-rain`/`in-water`

这两个函数的作用类似，`in-rain`返回玩家是否在雨中，`in-water`返回玩家是否在水中，他们都不接受任何参数

## `context`

这个函数的作用是从上下文获取一个变量的值，所以它可能会返回任何类型的值

它接受一个参数，这个参数就是想要获取变量的名字

## `tell`/`actionbar`/`title`/`log`

这四个函数的作用都是输出内容，并且都会自动解析PlaceholderAPI变量

但是用法有略微不同

`tell` `actionbar` `log`都接受所有的参数，它们会将所有参数拼接在一起输出

`tell`是发送消息给玩家聊天栏

`actionbar`是发送消息给玩家动作栏

`log`是发送消息给服务器后台

`title`它只接受两个参数，第一个参数发送给玩家的主标题栏，第二个参数发送给玩家的副标题栏

## `command`/`console`

这两个函数的作用都是执行命令，并且都会自动解析PlaceholderAPI变量，都接受所有的参数，它们会将所有参数拼接在一起作为一个命令

`command`是以玩家身份执行命令

`console`是以服务器后台身份执行命令

## `take-money`/`give-money`/`take-level`/`give-level`/`give-exp`/`take-points`/`give-points`

这七个函数的用法都差不多，他们都接受一个数字类型的变量

`take-money` `take-level` `take-points`分别是扣除玩家Vault钱数、等级和PlayerPoints点数

`give-money` `give-level` `give-exp` `give-points`分别是给予玩家Vault钱数、等级、经验和PlayerPoints点数

## `close`/`back`

这两个函数都是在菜单里使用的，且他们都不接受任何参数

`close`是直接关闭玩家当前打开的页面

`back`在玩家有上一个菜单的大部分情况下将会返回到上一个菜单，如果没有上一个菜单则直接关闭页面

## `openmenu`

这个函数用于打开Craftorithm的自定义菜单

它接受一个参数，会打开对应名字的菜单

## `discover-recipe`/`undiscover-recipe`

这两个函数都是用于配方书管理的，它们都只接受一个参数

`discover-recipe`是为玩家在配方书解锁一个配方

`undiscover-recipe`则是取消解锁指定配方

## `sound`

这个函数是用于给玩家播放音频的，它最多接受三个参数

第一个参数是音频的key，格式为`<namespace>:<key>`

第二个参数是音频的音量

第三个参数是音频的音高

## `set`

这个函数的功能类似于声明变量，它一般情况下是配合`context`函数使用的

它接受两个参数，第一个参数是变量的名字，为字符串类型。第二个参数为变量的内容，可以是任意类型

## `delay`

这是一个特殊的函数，他的作用是暂停当前的脚本运行，并在指定tick后运行

它接受一个参数，这个参数必须是整数

# 自定义函数注册

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

详细 API 参见 [Script API](/api/scripts.md)。
