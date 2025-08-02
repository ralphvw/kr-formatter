---
# K&R Formatter VSCode Extension

A simple Visual Studio Code extension that enforces **Kernighan & Ritchie (K&R)** C style formatting globally, without requiring per-project configuration.
---

## Features

- Automatically formats C code using the K&R brace style
- Works globally, no need for `.clang-format` in every directory
- Format on Save or manually via Command Palette

---

## Usage

1. Install the extension from the VSCode Marketplace (or sideload locally)
2. Open any `.c` or `.h` file
3. Formatting will occur on save, or trigger manually via:
   - `Cmd+Shift+P` → `Format Document`

---

## Testing Locally

To test the extension locally, follow these steps:

1. **Compile the extension:**
   ```bash
   npm run vscode:prepublish
   ```

2. **Package the extension:**
   ```bash
   vsce package
   ```

3. **Install the .vsix file:**
   - Open the command palette (`Cmd+Shift+P`).
   - Search for "Extensions: Install from VSIX...".
   - Select the generated `.vsix` file.

4. **Reload VS Code** to activate the extension.

---


## File Structure

```
kr-formatter/
├── src/
│   └── extension.ts         # Extension activation logic
├── package.json             # Extension manifest
├── tsconfig.json            # TypeScript config
├── README.md                # You're reading it
```

---

## License

MIT
