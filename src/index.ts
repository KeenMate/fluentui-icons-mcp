#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = process.env.FLUENTUI_ICONS_API || "https://fluentui-icons.keenmate.dev";

const server = new McpServer({
  name: "fluentui-icons",
  version: "1.0.0",
});

// Tool: Search for icons
server.tool(
  "search_icons",
  "Search FluentUI icons by name. Filter by style (regular/filled) and size (16-48px). Use the icon names with Microsoft's @fluentui/svg-icons npm package, or download SVGs from the provided URLs (do not hotlink).",
  {
    query: z.string().describe("Search term (e.g., 'pen', 'calendar', 'user', 'arrow')"),
    style: z.enum(["regular", "filled"]).optional().describe("Icon style filter"),
    size: z.enum(["16", "20", "24", "28", "32", "48"]).optional().describe("Icon size filter"),
    limit: z.number().min(1).max(100).optional().describe("Maximum results (default: 20)"),
  },
  async ({ query, style, size, limit }) => {
    const params = new URLSearchParams({
      q: query,
      format: "text",
      limit: String(limit || 20),
    });

    if (style) params.append("style", style);
    if (size) params.append("size", size);

    try {
      const response = await fetch(`${API_BASE}/api/icons/search?${params}`);

      if (!response.ok) {
        return {
          content: [{ type: "text", text: `Error: API returned ${response.status}` }],
          isError: true,
        };
      }

      const text = await response.text();

      if (!text.trim()) {
        return {
          content: [{ type: "text", text: `No icons found for "${query}"` }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Found icons for "${query}":\n\n${text}\n\nUse the SVG URLs directly in <img> tags or fetch the SVG content.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error fetching icons: ${error}` }],
        isError: true,
      };
    }
  }
);

// Tool: Get icon SVG content
server.tool(
  "get_icon_svg",
  "Fetch the raw SVG content of a specific icon. Use this when you need the actual SVG markup.",
  {
    url: z.string().describe("The SVG URL from search results (e.g., /icons/regular/ic_fluent_pen_24_regular.svg)"),
  },
  async ({ url }) => {
    try {
      // Handle relative URLs
      const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;
      const response = await fetch(fullUrl);

      if (!response.ok) {
        return {
          content: [{ type: "text", text: `Error: Could not fetch SVG (${response.status})` }],
          isError: true,
        };
      }

      const svg = await response.text();

      return {
        content: [{ type: "text", text: svg }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error fetching SVG: ${error}` }],
        isError: true,
      };
    }
  }
);

// Resource: API documentation
server.resource(
  "api-docs",
  "fluentui://docs",
  async () => {
    try {
      const response = await fetch(`${API_BASE}/llms.txt`);
      const text = await response.text();
      return {
        contents: [{ uri: "fluentui://docs", mimeType: "text/plain", text }],
      };
    } catch {
      return {
        contents: [
          {
            uri: "fluentui://docs",
            mimeType: "text/plain",
            text: "FluentUI Icons API: GET /api/icons/search?q=<query>&format=text",
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("FluentUI Icons MCP server running");
}

main().catch(console.error);
