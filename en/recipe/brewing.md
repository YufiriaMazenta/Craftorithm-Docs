---
title: Brewing Recipes
---

# Brewing Recipes

::: warning Prerequisite
On Minecraft versions below 26.2, brewing recipes are **Paper only**.

On Minecraft 26.3 and above, Spigot servers can also use brewing recipes.
:::

## YAML Example

```yaml
type: 'vanilla_brewing'
result: 'minecraft:potion'
input: 'minecraft:potion'
ingredient: 'minecraft:glistering_melon_slice'
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `vanilla_brewing` |
| `result` | string | Yes | Output item ID |
| `input` | string | Yes | Input item in the brewing stand (typically a potion bottle) |
| `ingredient` | string | Yes | Brewing ingredient added to the top slot |
