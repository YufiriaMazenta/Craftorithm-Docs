---
title: Recipe Book
---

# Recipe Book

The Recipe Book provides a graphical interface for players to browse all Craftorithm recipes on the server.

## Opening the Recipe Book

```bash
/cra recipebook [type]
```

Without specifying a type, it opens the type selection screen. With a type, it goes directly to that category's recipe list.

## Type Selection Screen

Displays a grid of all available recipe types. Click on one to enter that category's recipe list.

## Recipe List Screen

- **Pagination**: A fixed number of recipes per page
- **Sort modes**: Click the sort button to cycle through:
  - A→Z: Name ascending
  - Z→A: Name descending
  - Old→New: Creation time ascending
  - New→Old: Creation time descending
- **Recipe details**: Click a recipe icon to view its crafting pattern
- **Page navigation**: Use previous / next page buttons

## Permissions

```
craftorithm.command.recipebook
```

## Custom Recipe Book

You can create more personalized recipe books through the custom menu system. See Custom Menus for details.
