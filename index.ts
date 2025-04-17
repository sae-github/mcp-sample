import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// MCPサーバーを作成
export const server = new McpServer({
  name: 'addition-tool',
  version: '0.0.1',
});

// 足し算ツールを追加
server.tool(
  'add',
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: 'text', text: String(a + b) }],
  })
);

// 標準入出力で起動
export const startServer = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

// 起動する
startServer();
