---
title: Custom Fuels
---

# Custom Fuels

## Configuration File

`plugins/Craftorithm/custom_fuels.yml`

## Format

```yaml
minecraft:command_block:
  burn_time: 100
minecraft:bedrock:
  burn_time: 200
```

| Field | Type | Description |
|-------|------|-------------|
| `burn_time` | integer | Burn time in ticks (20 ticks = 1 second) |

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
