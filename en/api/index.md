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
import pers.yufiria.craftorithm.api.CraftorithmAPI;

CraftorithmAPI api = CraftorithmAPI.INSTANCE;
```

## API Modules

| Module | Description |
|--------|-------------|
| [Item API](/en/api/items) | Item management, registration, lookup |
| [Recipe API](/en/api/recipes) | Recipe management, type registration |
| [Trigger API](/en/api/triggers) | Trigger management, event firing |
| [Script API](/en/api/scripts) | Script execution, custom function registration |
| [Hook Development](/en/api/hooks) | External item plugin integration |

## Thread Safety

- Recipe operations (read/register/remove) are thread-safe
- Trigger operations are thread-safe
- Script execution uses isolated VM instances, supporting concurrency
