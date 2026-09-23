---
title: 更新日志
---

# 更新日志

本页记录自 1.11.1.0 起的版本更新内容，更早版本请见 [GitHub Releases](https://github.com/YufiriaMazenta/Craftorithm/releases)。

## 1.14.2.0 <Badge type="info" text="2026-09-24" />

### 更新内容

1. 新增PostgreSQL支持
2. 脚本函数`discover_recipe`和`undiscover_recipe`现在可以也使用正则表达式匹配配方
3. 新增脚本函数`recipe_discovered`，返回玩家是否解锁了某个配方
4. 优化插件代码结构和性能

## 1.14.1.1 <Badge type="info" text="2026-09-17" />

### 更新内容

1. 优化插件在禁用时的资源释放策略

## 1.14.1.0 <Badge type="info" text="2026-09-17" />

### 破坏性更新

1. 插件提供的 `ItemProvider` 接口发生了改变，因此为旧版本编写的物品源插件需要额外适配才能兼容此版本
2. 物品组内不再能设置物品数量，所有数量都必须在配方文件中定义

### 常规更新

1. 兼容Minecraft 26.3
2. 铁砧配方材料使用物品组时现在支持指定数量，例如 `item_pack:物品组名 4`
3. 新增插件重载与服务器启动完成后从数据库恢复在线玩家已解锁配方的功能
4. 修复玩家在配方未注册完毕时加入服务器会导致已经解锁的配方被取消解锁的问题
5. 修复重载期间合成限制规则会短暂失效，导致本应被拦截的合成得以进行的问题
6. 修复 `item_packs.yml` 中使用 `tag:` 或嵌套引用其他物品组（`item_pack:组名`）的条目无法解析的问题
7. 修复 `/craftorithm item fuel add` 在手持多个物品时会向 `custom_fuels.yml` 写入带数量的无效配置键的问题，历史无效键需手动清理
8. 修复数据库连接池的连接数上限、心跳启动时机与空闲连接驱逐逻辑，以及 DAO 语句与结果集未关闭导致的资源泄漏
9. 修复特定情况下保存物品时出现并发修改异常的问题
10. 修复假结果预览功能在特定时序下可能报空指针的问题
11. 修复自定义菜单加载失败时打开回调会被执行两次的问题
12. 修复重载时触发器数据在异步线程与主线程之间存在的并发问题
13. 优化内部代码结构，清理无引用代码

## 1.14.0.0 <Badge type="info" text="2026-09-09" />

### 更新内容

1. 新增基于数据库的跨服配方解锁数据同步功能
2. 修复铁砧配方在没有铁砧类型触发器情况下无法合成的问题

## 1.13.7.3 <Badge type="info" text="2026-09-05" />

### 更新内容

1. 修复在插件重载时, 如果被禁用的配方数量非常多, 可能会导致服务器网络带宽被瞬间占满的问题

## 1.13.7.2 <Badge type="info" text="2026-09-05" />

### 更新内容

1. 修复`crafting`触发器无法作用于合成器的问题
2. 修复在`crafting`, `smithing`和`anvil`类型触发器的conditions里执行close动作关闭容器会吞掉物品的问题
3. 触发器的enabled配置键更名为enable(保留对旧版enabled的兼容)

## 1.13.7.1 <Badge type="info" text="2026-09-02" />

### 更新内容

1. 修复MMOItems物品无法在异步线程加载的问题
2. 优化配方创建和编辑页面配方加载流程

## 1.13.7.0 <Badge type="info" text="2026-09-01" />

### 更新内容

1. 优化插件重载代码，通过多线程并行加载的方式降低性能占用
2. 新增命令`/craftorithm restore <recipe_id>`，用于恢复被禁用的配方
3. 新增配置项`ingredient_use_set_threshold`，用于配置配方材料的匹配方式
4. 优化重载提示消息
5. 优化插件代码结构
6. 优化配方材料匹配性能
7. 优化无序配方性能表现
8. 优化触发器性能表现
9. 修复被禁用的配方在reload后无法恢复的问题

## 1.13.6.0 <Badge type="info" text="2026-08-26" />

**注意，从旧版本升级到此版本建议删除`menus/internal/display`文件夹让其重新生成**

**Note: If upgrading from a previous version, please delete the `menus/internal/display` folder to let it regenerate**

### 更新内容

1. 结果处理器现在允许第三方插件注册新的操作类型
2. Craftorithm物品源现在也可以在`item_plugin_hook_priority`配置项里配置优先级
3. 修复切石机配方在插件自带的查看页面材料显示错误的问题
4. 修复熔炉、烟熏炉、营火、锻造转化配方展示页面的错误文本

## 1.13.5.2 <Badge type="info" text="2026-08-20" />

### 更新内容

1. 修复1.13.5.1版本插件在Folia端无法启动的问题
2. 修复结果处理器对于`display_name`, `item_name`和`lore`的add操作不能解析颜色代码的问题
3. 现在`lore`、`display_name`和`item_name`类型的结果处理器支持在add时解析PlaceholderAPI变量

## 1.13.5.1 <Badge type="info" text="2026-08-19" />

**此版本没有任何新增特性，只是对插件的整体性能表现进行了大幅度优化**

**This version does not introduce any new features; it is solely focused on significantly optimizing the plugin's overall performance**

### 更新内容

1. 优化ItemManager匹配物品id的性能
2. 优化CraftorithmItemProvider匹配物品id的性能
3. 优化触发器冷却的内存消耗
4. 优化NamespacedItemId.toString性能开销
5. 优化配方加载性能
6. 优化UI创建、编辑配方性能开销
7. 修复一些可能导致内存泄漏的问题

## 1.13.5.0 <Badge type="info" text="2026-08-18" />

### 更新内容

1.  `blocked_crafting_lore_rules`配置项由`ingredient_restriction_rules`替代，用于配置规则拦截物品用于合成
2. 修复[#142](https://github.com/YufiriaMazenta/Craftorithm/issues/142)

## 1.13.4.0 <Badge type="info" text="2026-08-17" />

**⚠️重要：不建议使用此版本，此版本因为删除了cannot_craft_items导致可能出现严重问题，请直接使用1.13.5.0**

**⚠️Important: It is not recommended to use this version. Due to the removal of the cannot_craft_items configuration, this version may cause serious issues. Please use version 1.13.5.0 instead.**

### 更新内容

1.  新增`blocked_crafting_lore_rules`配置项, 用于配置包含指定lore的物品不能用于合成
2. 删除`cannot_craft_items`配置项，功能由`blocked_crafting_lore_rules`替代
3. 新增PlaceholderAPI变量`%craftorithm_discovered_<recipe_key>%`和`%craftorithm_discovered%`, 返回玩家是否发现(配方书解锁)了该配方和玩家总共已发现配方的数量
4. 修复 #140

## 1.13.3.0 <Badge type="info" text="2026-08-13" />

### 更新内容

1. 新增`prepare_grindstone`和`trade_select`类型的触发器
2. 脚本系统新增函数`match_item_id`，用于识别物品的id
3. 脚本系统新增全局变量`server`、`recipe_manager`、`item_manager`，可在触发器、script命令、UI中使用
4. 现在script子命令返回使用的纳秒数而不是毫秒数
5. 新增CustomFishing物品源适配（[#138](https://github.com/YufiriaMazenta/Craftorithm/pull/138)）
6. 适配EmakiItem 2.7.0版本
7. 修复[#136](https://github.com/YufiriaMazenta/Craftorithm/issues/136)
8. 修复[#139](https://github.com/YufiriaMazenta/Craftorithm/issues/139)

## 1.13.2.0 <Badge type="info" text="2026-08-07" />

### 更新内容

1. 现在切石机配方也可以使用结果处理器（仅paper及其衍生端）
2. 结果处理器新增支持一个组件类型里定义多个处理器
3. 修复属性的结果处理器不支持1.20-1.20.4的问题
4. 修复服务器重载、启用、禁用数据包时会导致插件配方失效的问题（仅paper及其衍生端）
5. 修复create命令和配方创建菜单无法使用/符号作为配方名字的bug

## 1.13.1.0 <Badge type="info" text="2026-08-06" />

### 更新内容

1. 现在物品组可以导入tag或其他物品组的物品
2. 修复https://github.com/YufiriaMazenta/Craftorithm/issues/135
3. 将配方书UI的配置文件目录从`menus/internal/recipeBook`修改为`menus/internal/recipe_book`

## 1.13.0.0 <Badge type="info" text="2026-08-03" />

### 更新内容

1. 新增配方结果后处理器(result_processor)功能，用于合成时为配方结果增加额外效果
2. 所有类型的触发器的上下文中新增event对象，用于操作相关事件行为
3. 新增命令`/craftorithm discover <target> <recipe_key_pattern>`和`/craftorithm undiscover <target> <recipe_key_pattern>`，分别用于为玩家解锁、取消在配方书内解锁配方，其中`<recipe_key_pattern>`支持正则表达式
4. 修复触发器中`sound`函数在遇到无法解析的声音时会报错的问题
5. 修复`/craftorithm display`命令的补全内容中只含有插件自己的配方的问题
6. 修复1.21.3以上Minecraft版本环境下锻造台配方在一些情况下无法将材料放入对应位置的问题
7. 优化代码结构和性能

## 1.12.2.0 <Badge type="info" text="2026-07-31" />

### 更新内容

1. 脚本语法大幅度更改，现在不再支持形如 `tell "hello world"` 这样的简单写法，必须使用 `tell("hello world")` 这样的完整语法写法
2. 对调酿造配方创建/编辑UI里材料和输入的位置
3. 修复26.1版本酿造配方无法正确得到结果的bug
4. 修复酿造配方结果刷新在一些情况下无法刷新所有槽位和覆盖结果数量的问题

## 1.12.1.0 <Badge type="info" text="2026-07-28" />

### 更新内容

1. 更改set_inv_item函数行为，现在其会在容器对应位置已经存在物品时尝试将物品放在其他位置或丢出物品
2. 现在script默认不再允许裸参数语法，必须开启`enable_script_bare_args`配置项才能使用
3. 添加EmakiItem插件物品源适配
4. 修复铁砧配方在更改物品名字时，不能正确显示出结果的问题
5. 修复附魔复制规则未使用base更高附魔等级的问题
6. 修复铁砧配方中带数量的tag材料解析错误的问题
7. 修复1.21以下版本铁砧在配方不再匹配时NPE的问题
8. 修复配方展示图标编辑点击时自定义动作执行两次的问题
9. 修复因为未将1.21.11的配方注册器实现打包导致的1.21.11的spigot端无法注册配方的问题
11. 优化代码结构和性能表现

## 1.12.0.3 <Badge type="info" text="2026-07-24" />

### 更新内容

1. 修复1.20.1-1.20.2酿造配方创建报错的问题
2. 修复在1.21以上版本，特定摆放方式下，多个材料的无序配方可以绕过部分材料检测，使用非法物品进行合成的bug

## 1.12.0.2 <Badge type="info" text="2026-07-23" />

### 更新内容

1. 修复存在trim类型的锻造配方时,打开所有配方的recipe book页面会报错的问题
2. 修复酿造配方展示页面无法正确打开的问题
3. 修复folia环境下，command和console函数会报错的问题

## 1.12.0.1 <Badge type="info" text="2026-07-22" />

### 更新内容

1. 修复disable命令无法正确禁用特殊配方的问题
2. 优化插件内存占用

## 1.12.0.0 <Badge type="info" text="2026-07-21" />

### 更新内容

1. 现在除1.21.3以上的切石机配方外，所有配方的材料判断都通过ID进行判断，不会再出现加了个附魔、改了个名字就不能合成的情况
2. 修复SmithingTrimRecipe无法正确使用的问题，现在锻造纹饰配方在1.21.5以上必须设置trim_pattern
3. 新增配方注册、材料识别等相关api
4. 优化插件重载性能，修复插件重载时卡网络、卡客户端的问题
5. 修复无序配方创建页面会创建出null物品材料的问题
6. 优化UI文本显示
7. script命令现在可以在控制台执行
8. 兼容VaultUnlocked

## 1.11.4.1 <Badge type="info" text="2026-07-11" />

### 更新内容

1. 修复recipe_list菜单的排序按钮文本解析错误的问题
2. recipebook命令支持传入all类型以查看所有的配方
3. tag现在支持`tag:<命名空间>:<key>`的写法以支持读取数据包新增的tag

## 1.11.4.0 <Badge type="info" text="2026-07-11" />

### 更新内容

1. tag现在支持`tag:<命名空间>:<key>`的写法,以支持读取数据包中新增的物品tag
2. 触发器的conditions现在支持两种写法: 简单表达式和完整脚本
3. 脚本模块新增int函数和float函数,用于强制某数字类型变量为整形或浮点型
4. 修复https://github.com/YufiriaMazenta/Craftorithm/issues/124
5. 修复更新检测报错的问题

## 1.11.3.0 <Badge type="info" text="2026-07-08" />

### 更新内容

1. 修复 BackIcon 在无父级页面时使用异步关闭页面导致异常报错的问题
2. script 模块新增一些数学运算的函数
3. 优化更新检测的方式

## 1.11.2.0 <Badge type="info" text="2026-07-07" />

### 更新内容

1. 新增script函数`set_inv_item`, 用于设置玩家打开容器指定位置的物品
2. 现在合成事件相关触发器上下文中会包含合成材料的ID和数量本次事件一次性合成的次数
3. 如果配方的某个触发器正在冷却，那么本次合成以及所有相关触发器将被阻止
4. 优化recipebook命令的参数解析,现在的使用格式为`/craftorithm recipebook [--player <name>] [--type <type>]`
5. 修复RecipeDisplayIcon的lore会重复的问题

## 1.11.1.1 <Badge type="info" text="2026-07-05" />

### 更新内容

1. 修复ProtocolLib挂钩在某些情况下会抛出异常的问题

## 1.11.1.0 <Badge type="info" text="2026-07-04" />

### 兼容性提醒

- **最低Minecraft版本提升**: 最低支持版本从 1.19 提升至 **1.20**
- **配方文件格式变动**: 配方文件会自动转换, 但`random_cooking`类型的配方在新版本已经去除
- **脚本系统**: 旧版脚本系统已移除, `function.yml`文件已失去作用
- **packetevents / ProtocolLib**: 配方更新导致客户端卡顿的优化和虚拟配方预览功能需要安装其中之一才能生效

---

### 全新插件文档

https://yufiriamazenta.github.io/Craftorithm-Docs/

---

### 新增功能

#### 全新脚本引擎
- 新增完整的 DSL 脚本引擎: 词法分析 → AST → 编译器 → 栈式虚拟机
- 支持条件判断 (`if/elseif/else`)、算术运算 (`+` `-` `*` `/` `%`)、字符串拼接、取反运算 (`!`)
- 支持变量 (`set`/`get`)、延迟执行 (`delay`)、日志输出 (`log`)、播放音效 (`sound`)
- 内置条件函数: `game_mode`、`permission`、`item`、`compare` 等
- 内置动作函数: `tell`、`give`、`run_cmd`、`take_item`、`play_sound` 等
- 新增 `/craftorithm script` 子命令用于执行脚本

#### 全新触发器系统
- 新增 Trigger 模块, 支持数十种触发器类型, 可监听配方合成、物品使用等多种事件

#### UI优化
- 优化配方列表页面: 配方列表页面、配方类型选择菜单、支持按时间/名称排序, 通过`/craftorithm recipebook` 命令打开
- 配方创建器 UI 重写
- 配方编辑器 UI 重写
- 配方展示页面改为可自定义, 支持通过 YAML 配置文件自定义布局和图标
- 新增自定义菜单功能, 通过 YAML 配置文件创建自定义界面
- 菜单按钮支持按点击类型绑定脚本动作 (`actions` 配置)
- 菜单按钮支持 `item_model` 字段

#### 其他新功能
- 新增旧配方格式自动转换功能 (`LegacyRecipeMigrator`)
- 基于 packetevents 或 ProtocolLib 的虚拟配方预览功能
- 新增 `main_command_aliases` 配置项, 用于设置主命令别名
- 新增分 tick 加载功能, 将配方加载分散到多个 tick 以减少卡服
- 新增 `ItemPack` 物品包功能, 用于一个材料槽位允许多种物品, 类似原版tag
- 新增 SX-Item 挂钩
- 新增适用于铁砧配方和锻造台配方的物品组件复制系统 (`copy_components_rules`), 支持以下规则: `all`、`item_name`、`item_model`、`trim`、`unbreakable`、`tool`、`hide_tooltip`、`fire_resistance`、`custom_model_data_component`、`display_name`、`lore`、`enchantments`、`attributes`、`item_flag`、`max_stack_size`、`rarity`、`food`、`custom_model_data`、`custom_persistent_data`

#### API扩展
- 新增 `RecipeRegisterEvent` 事件
- 扩展 `CraftorithmAPI` 公开 API (新增物品管理、配方管理、触发器管理等方法)
---

### Bug 修复

- 修复服务器配方缓存和禁用配方可能出问题的 bug
- 修复 `disable_recipes.yml` 会重复记录的问题
---

### 优化

- 优化配方更新时客户端的卡顿问题
- 优化重载时其他插件监听器的恢复逻辑

---

