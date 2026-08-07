---
title: Script API
---

# Script API

## 脚本执行

```java
ScriptEngine engine = ScriptEngine.INSTANCE;

// 执行脚本表达式
ScriptContext context = new ScriptContext(BukkitPlayer.byPlayer(player), variables);
ScriptValue result = engine.execute("perm(\"craftorithm.vip\")", context);
```

## ScriptContext

```java
// 创建脚本上下文
Map<String, ScriptValue> vars = new HashMap<>();
vars.put("key", new ScriptValue.Str("value"));
ScriptContext context = new ScriptContext(BukkitPlayer.byPlayer(player), vars);

// 获取变量
ScriptValue val = ctx.getVariable("key");
```

## ScriptValue 类型

```java
// 创建值
ScriptValue.Str str = new ScriptValue.Str("hello");
ScriptValue.Num num = new ScriptValue.Num(100.0);
ScriptValue.Bool bool = new ScriptValue.Bool(true);
ScriptValue.NullValue nil = ScriptValue.NullValue.INSTANCE;

// 获取原始值
String s = str.getString();
double n = num.getNumber();
boolean b = bool.getBoolean();

// 比较（自动类型转换）
int cmp = num.compare(otherValue); // -1, 0, 1
```

## 注册自定义函数

```java
ScriptFunctionRegistry registry = ScriptFunctionRegistry.INSTANCE;

registry.register("my_condition", (context, vm, args) -> {
    if (args.isEmpty()) return ScriptValue.Bool.FALSE;
    String key = args.get(0).getString();
    boolean result = checkCondition(context.getPlayer(), key);
    return result ? ScriptValue.Bool.TRUE : ScriptValue.Bool.FALSE;
});
```

注册后即可在触发器中使用：

```yaml
conditions:
  - 'my_condition("key")'
actions:
  - 'my_action("hello ", "world")'
```

## 自定义模块

实现 `ScriptModule` 接口批量注册函数：

```java
public class MyModule implements ScriptModule {
    @Override
    public void registerFunctions(ScriptFunctionRegistry registry) {
        registry.register("module", "func1", this::func1);
        registry.register("module", "func2", this::func2);
    }

    private ScriptValue func1(ScriptContext ctx, ScriptVM vm, ScriptValue... args) {
        // ...
    }

    private ScriptValue func2(ScriptContext ctx, ScriptVM vm, ScriptValue... args) {
        // ...
    }
}
```

## 相关类

| 类 | 说明 |
|----|------|
| `ScriptEngine` | 脚本引擎入口 |
| `ScriptContext` | 执行上下文 |
| `ScriptValue` | 值类型 (sealed interface) |
| `ScriptFunction` | 函数接口 |
| `ScriptModule` | 模块接口 |
| `ScriptFunctionRegistry` | 函数注册表 |
| `CompiledScript` | 编译后的脚本 |
