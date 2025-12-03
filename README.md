# FluentUI Icons MCP Server

An MCP (Model Context Protocol) server that provides FluentUI icon search capabilities to AI assistants like Claude.

> **Note:** This MCP server uses the [FluentUI Icons Search](https://fluentui-icons.keenmate.dev) API by Keenmate. It's a free service - please don't abuse it.

## Features

- **search_icons** - Search for icons by name, with optional style and size filters
- **get_icon_svg** - Fetch the raw SVG content of a specific icon
- **api-docs** - Resource providing API documentation

## Quick Start

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "fluentui-icons": {
      "command": "npx",
      "args": ["@keenmate/fluentui-icons-mcp"]
    }
  }
}
```

### Claude Code

Add to your MCP settings (via `/mcp` command or settings file):

```json
{
  "mcpServers": {
    "fluentui-icons": {
      "command": "npx",
      "args": ["@keenmate/fluentui-icons-mcp"]
    }
  }
}
```

Then restart Claude and you're ready to go!

## Environment Variables

- `FLUENTUI_ICONS_API` - API base URL (default: `https://fluentui-icons.keenmate.dev`)

## Example Queries

Once connected, you can ask Claude:

- "Find me a calendar icon"
- "Search for arrow icons in filled style"
- "Get the SVG for a 24px pen icon"
- "Find icons related to user or person"

## Development

```bash
npm run dev    # Watch mode
npm run build  # Build for production
npm start      # Run the server
```

## License

MIT
