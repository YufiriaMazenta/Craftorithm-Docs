---
title: Script Engine
---

# Script Engine Overview

Craftorithm includes a compiled script engine used for trigger condition evaluation and action execution.

## Architecture

```
Source Code → Lexer → Token Stream
           → Parser → AST (Abstract Syntax Tree)
           → Compiler → Bytecode Instructions
           → VM → Execution Result
```

Scripts are not simply interpreted — they are compiled into bytecode and executed on a stack-based virtual machine.

## Data Types

| Type | Description | Example |
|------|-------------|---------|
| `Str` | String | `"hello"` |
| `Num` | Number | `100`, `3.14`, `-5` |
| `Bool` | Boolean | `true`, `false` |
| `NullValue` | Null | — |

## Relationship with Triggers

Trigger `conditions` and `actions` are fundamentally script expressions:

- **conditions**: Multiple expressions connected with `&&`, compiled into a single script returning a boolean
- **actions**: Multiple expressions connected with newlines, compiled into a single script executed sequentially

## Run Script Command

```bash
/cra script <expression>
```

Used to test script expressions. Outputs the execution result and time cost.

## Security

- **Instruction limit**: Maximum 100,000 instructions per execution to prevent infinite loops
- **Script cache**: Compiled scripts are cached by name to avoid recompilation
- **Thread safety**: VM instances are isolated, supporting concurrent execution

## Comments

Scripts support `//` line comments:

```
// This is a comment
level >= 10  // Inline comment
```
