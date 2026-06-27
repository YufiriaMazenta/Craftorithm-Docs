---
title: 配方创建器
---

# 配方创建器

## 打开方式

```bash
/cra create <type> [recipe_id] [filename]
```

### 参数说明

| 参数 | 必填 | 说明                                          |
|------|------|---------------------------------------------|
| `type` | 是 | 配方类型（如 `vanilla_shaped`）                    |
| `recipe_id` | 否 | 自定义配方 ID（若留空则为文件名）                          |
| `filename` | 否 | 保存文件名（如果recipe_id已经配置，那么文件名字可以为任意文件系统允许的字符） |

### 示例

```bash
# 创建有序配方
/cra create vanilla_shaped

# 指定 ID 和文件名
/cra create vanilla_shaped my_sword weapons.yml

# 创建熔炉配方
/cra create vanilla_smelting_furnace
```

## GUI 交互流程

### 有序配方

1. 打开 GUI，看到 3x3 材料格和结果槽
2. 将材料按所需形状放入材料格
3. 在结果槽放入产出物品
4. 可选：选择配方书分类（misc/building/redstone/equipment）
5. 点击确认按钮保存

### 无序配方

1. 将材料放入任意材料格
2. 在结果槽放入产出物品
3. 点击确认

### 烧炼配方

1. 放入输入材料
2. 放入产出物品
3. 设置烧炼时间和经验
4. 点击确认

### 锻造配方

1. 放入 base（基础物品）
2. 放入 addition（添加材料）
3. 放入 template（模板）
4. 放入产出物品
5. 点击确认

## 保存位置

配方自动保存到 `plugins/Craftorithm/recipes/<filename>.yml`。
