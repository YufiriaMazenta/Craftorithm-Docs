---
title: Custom Fuels
---

# Custom Fuels

## Configuration File

`plugins/Craftorithm/custom_fuels.yml`

## Format

```yaml
fuels:
  - item: "minecraft:command_block"
    burn_time: 100
  - item: "minecraft:bedrock"
    burn_time: 200
```

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Item id. Namespaced ids are supported; defaults to vanilla (the id is the Material name) |
| `burn_time` | integer | Burn time in ticks (20 ticks = 1 second). Must be greater than 0 |

::: tip Old Format
Versions before 1.16.2.0 used top-level keys as item ids:

```yaml
minecraft:command_block:
  burn_time: 100
```

The old format is migrated automatically to the new `fuels` list format on load; no manual changes are needed.
:::

## Add Command

```bash
/cra item fuel add <burn_time>
```

Hold the item you want to set as fuel, then run the command.

## Remove Command

```bash
/cra item fuel remove <fuel_id>
```

## Time Reference

| Ticks | Seconds | Reference |
|-------|---------|-----------|
| 200 | 10 | Vanilla stick |
| 1600 | 80 | Vanilla coal |
| 100 | 5 | Example |
