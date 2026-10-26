---
title: 合成剩余材料
---

# 合成剩余材料 (Remainders)

`remainders` 用于控制工作台配方中**每个输入槽**在合成之后留下什么物品。

原版只会让少数物品（例如桶、熔岩桶）留下固定的剩余物，`remainders` 则允许你对任意材料指定行为：扣除工具耐久、替换成另一种物品，或者原样保留。

## 支持的配方类型

| 配方类型 | type 值 | 支持状态 |
|----------|---------|-----------|
| 有序配方 | `vanilla_shaped` | ✅ 支持 |
| 无序配方 | `vanilla_shapeless` | ✅ 支持 |
| 其他配方类型 | — | ❌ 不支持 |

只有工作台配方会在取出产物时逐槽处理输入物品，其余配方类型（烧炼、锻造、酿造、铁砧、切石）的输入消耗是写死的，因此不支持 `remainders`。若在不支持的配方里写了 `remainders`，插件会在加载时输出一条警告并跳过该字段，配方本身仍然正常加载。

## 基本语法

```yaml
type: 'vanilla_shaped'
result: '<物品ID>'
# ... 其他配方字段

remainders:
  - ingredient: <材料>
    action: <动作>
    # ... 动作参数
```

`remainders` 必须是一个列表，每个列表元素是一条规则。

| 字段 | 必填 | 说明 |
|------|------|------|
| `ingredient` | 是 | 要匹配的材料，写法与配方材料一致：原版物品 ID、自定义物品 ID、`tag:`、`item_pack:` |
| `action` | 是 | 动作名。内置 `damage` / `replace` / `keep`，其他插件也可以注册自定义动作 |
| 动作参数 | 视动作而定 | 见下文各动作说明 |

## 动作类型

### damage

保留被消耗的物品，并在其当前耐久损耗上累加指定数值。

```yaml
remainders:
  - ingredient: 'minecraft:flint_and_steel'
    action: damage
    damage: 1
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `damage` | 是 | 扣除的耐久值，必须为正整数 |

- 累计损耗达到物品的最大耐久时，物品直接消失，该槽位不再留下任何东西。
- 对没有耐久条的物品使用 `damage`，物品会被原样保留（等同于 `keep`）。

### replace

把被消耗的物品替换为配置中指定的物品。

```yaml
remainders:
  - ingredient: 'my_items:magic_water_bucket'
    action: replace
    item: 'minecraft:iron_ingot 2'
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `item` | 是 | 替换后的物品，格式为 `<物品ID> [数量]`，数量省略时默认为 1 |

- 数量不能超过该物品的最大堆叠数，否则规则会被判定为无效。
- 合成时若该物品已无法解析（例如提供它的物品源插件被卸载），该槽位返回空物品，相当于这个材料被正常消耗。

### keep

原样保留被消耗的物品。

```yaml
remainders:
  - ingredient: 'my_items:reusable_catalyst'
    action: keep
```

返回一件与被消耗物品完全相同的物品，耐久、附魔、NBT 等全部数据都会保留，数量固定为 1。适合做「催化剂」「可重复使用的模具」这类设计。

## 匹配与执行规则

- **逐槽独立处理**：合成格里的每个非空槽位各自匹配规则，而不是按材料种类统一处理。同一个材料摆在两个槽位里，两个槽位都会被处理。
- **同一槽只应用第一条命中的规则**：规则按列表顺序从上到下匹配，第一条 `ingredient` 匹配成功的规则生效，其后的规则不再尝试。
- **未命中的槽位保持原版行为**：没有任何规则匹配的槽位沿用原版剩余物（例如桶留下空桶）。
- **无效规则会被跳过**：`ingredient` 无法解析、`action` 未注册、动作参数缺失或非法时，该条规则不会生效，加载时输出警告，同一配方里的其他规则不受影响。

## 与结果处理器的区别

| | `remainders` | `result_processors` |
|---|---|---|
| 作用对象 | 合成格里的输入物品 | 产出的结果物品 |
| 生效时机 | 取出产物后，逐槽写回输入格 | 生成产物时 |
| 典型用途 | 工具扣耐久、桶换回空桶、催化剂保留 | 复制 / 添加 / 移除产物的组件 |

两者互不干扰，可以在同一个配方里同时使用。关于结果处理器的用法参见 [结果处理器](/recipe/result-processor.md)。

## 完整示例

```yaml
type: 'vanilla_shaped'
result: 'my_items:charged_crystal'
group: 'magic'

shape:
  - 'ABA'
  - 'BCB'
  - 'ABA'

ingredients:
  A: 'minecraft:amethyst_shard'
  B: 'minecraft:gold_ingot'
  C: 'my_items:crystal_core'

remainders:
  # 作为催化剂的核心，合成后原样保留
  - ingredient: 'my_items:crystal_core'
    action: keep
  # 打火石每次合成损耗 2 点耐久
  - ingredient: 'minecraft:flint_and_steel'
    action: damage
    damage: 2
  # 任意木板被消耗后变成木棍
  - ingredient: 'tag:minecraft:planks'
    action: replace
    item: 'minecraft:stick'
```

## 自定义动作

`action` 是一个开放注册表，其他插件可以注册自己的动作，注册后即可在配方配置里直接使用。

```java
RemainderActionRegistry.INSTANCE.register("my_action", (section, recipeKey) -> {
    String arg = section.getString("my_arg");
    if (arg == null) {
        // 返回 null 表示配置无效，这条规则会被跳过
        return null;
    }
    // 返回的动作会在每次合成时对命中槽位的单件物品调用
    return source -> {
        ItemStack remainder = source.clone();
        remainder.setAmount(1);
        return remainder;
    };
});
```

- 动作名不区分大小写，同名注册会覆盖之前的动作。
- `RemainderAction#createRemainder` 的入参是本次被消耗的原物品，插件保证数量为 1；返回空物品（`Material.AIR`）表示该槽位不留下任何东西。
- 工厂方法返回 `null` 时视为配置无效，规则会被跳过，建议在工厂里自行输出警告说明原因。
