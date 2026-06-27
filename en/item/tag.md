---
title: Item Tags
---

# Item Tags (tag)

Item tags are a vanilla labeling feature that groups multiple items together.

Item tags can be used as ingredients in recipes, allowing a single slot to accept different types of items.

Typical example: A crafting table recipe that accepts any type of wood planks.

## Using in Recipes

Reference item tags with the `tag:<name>` prefix:

```yaml
type: 'vanilla_shaped'
result: 'minecraft:iron_ingot'
shape:
  - 'AA'
  - 'AA'
ingredients:
  A: 'tag:leaves'  # Accepts any leaves
```

## Use Cases

- **Multi-material compatibility**: One recipe accepts multiple variants of the same material (e.g., all wool colors, all wood types)
- **Simplified configuration**: Avoids creating separate recipes for each material variant

## Notes

Available item tags can be viewed at:

https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Tag.html

https://bukkit.windit.net/javadoc/org/bukkit/Tag.html
