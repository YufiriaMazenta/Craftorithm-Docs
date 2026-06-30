---
title: 动作
---

# 动作

动作写在触发器的 `actions` 列表中，在所有条件通过后按顺序执行。

## 写法

```yaml
actions:
  - 'tell("&a条件通过！")'
  - 'give-level(100)'
  - 'command("give %player_name% diamond 1")'
```