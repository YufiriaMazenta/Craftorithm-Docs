---
title: API Overview
---

# API Overview

Craftorithm provides a Java API for plugin developers.

## Adding Dependencies

### Maven

```xml
<repository>
  <id>jitpack.io</id>
  <url>https://jitpack.io</url>
</repository>

<dependency>
  <groupId>com.github.YufiriaMazenta</groupId>
  <artifactId>Craftorithm</artifactId>
  <version>Tag</version>
</dependency>
```

### Gradle

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.YufiriaMazenta:Craftorithm:Tag'
}
```

## API Entry Point

```java
import pers.yufiria.craftorithm.Craftorithm;
import pers.yufiria.craftorithm.api.CraftorithmApi;

CraftorithmApi api = Craftorithm.api();
```

Since 1.15.2.0, the API entry point has been split from a single class into a top-level entry plus domain sub-APIs. The entry point `CraftorithmApi` exposes the sub-APIs via `item()` / `recipe()` / `menu()` / `trigger()`, and the methods previously gathered on the entry class have been moved into the corresponding sub-API:

```java
ItemApi itemApi = api.item();
RecipeApi recipeApi = api.recipe();
MenuApi menuApi = api.menu();
TriggerApi triggerApi = api.trigger();

// You can also reference each sub-API's enum instance directly
ItemApi itemApi = ItemApi.INSTANCE;
```

## API Modules

| Module | Description |
|--------|-------------|
| [Item API](/en/api/items) | Item management, registration, lookup |
| [Recipe API](/en/api/recipes) | Recipe management, type registration |
| [Trigger API](/en/api/triggers) | Trigger management, event firing |
| [Menu API](/en/api/menus) | Opening, registering and unregistering the creator / editor / display menus |
| [Script API](/en/api/scripts) | Script execution, custom function registration |
| [Integrating Your Own Item Plugin](/en/api/hooks) | External item plugin integration |

## Thread Safety

- Recipe operations (read/register/remove) are thread-safe
- Trigger operations are thread-safe
- Script execution uses isolated VM instances, supporting concurrency
