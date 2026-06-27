---
title: Brewing Recipes
---

# Brewing Recipes

::: warning Prerequisite
Brewing recipes are **Paper only**. They use Paper's PotionMix API and cannot work on Spigot servers.
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
| `ingredient` | string | Yes | Brewing material added to the top slot |

## Notes

- Input items are typically potion types: `minecraft:potion`, `minecraft:splash_potion`, `minecraft:lingering_potion`
- Potion effects must be specified through the item's NBT/Component data
- Use `/cra create vanilla_brewing` to create brewing recipes via GUI, avoiding manual NBT editing
