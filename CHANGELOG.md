# Changelog

## 1.0.0 (2025-12-03)

First stable release.

### Changes

- Improved `search_icons` tool description to clarify usage with `@fluentui/svg-icons` npm package
- Updated README with note about API server

## 1.0.0-rc01 (2025-12-03)

Initial release candidate.

### Features

- **search_icons** - Search FluentUI icons by name with optional filters:
  - `query` - Search term (required)
  - `style` - Filter by "regular" or "filled"
  - `size` - Filter by icon size (16, 20, 24, 28, 32, 48)
  - `limit` - Maximum results (default: 20, max: 100)

- **get_icon_svg** - Fetch raw SVG content of a specific icon by URL

- **api-docs** - Resource providing API documentation from llms.txt

### Configuration

Works with Claude Desktop and Claude Code via:

```json
{
  "mcpServers": {
    "fluentui-icons": {
      "command": "npx",
      "args": ["@keenmate/fluentui-icons-mcp@rc"]
    }
  }
}
```

Or via CLI:

```bash
claude mcp add fluentui-icons -- npx @keenmate/fluentui-icons-mcp@rc
```
