---
id: getting-started-mcp
title: "Playwright MCP"
---

> 🌐 本文档由 [microsoft/playwright](https://github.com/microsoft/playwright) 翻译,英文原版见原项目。

## 简介

Playwright MCP 服务器通过 [模型上下文协议(Model Context Protocol)](https://modelcontextprotocol.io) 提供浏览器自动化能力,使 LLM 能够基于结构化的无障碍快照与网页交互。它兼容 VS Code、Cursor、Windsurf、Claude Desktop 以及任何其他 MCP 客户端——无需视觉模型。

## 前置条件

开始之前,请确保已安装:

- [Node.js](https://nodejs.org/) 20 或更新版本
- 一个 MCP 客户端:VS Code、Cursor、Windsurf、Claude Code、Claude Desktop 或类似工具

## 起步

### 安装

使用下面的标准配置,把 Playwright MCP 服务器添加到你的客户端:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

#### VS Code

点击下方按钮之一直接安装:

[<img src="https://img.shields.io/badge/VS_Code-VS_Code?style=flat-square&label=Install%20Server&color=0098FF" alt="Install in VS Code" />](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522playwright%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522%2540playwright%252Fmcp%2540latest%2522%255D%257D) [<img alt="Install in VS Code Insiders" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Server&color=24bfa5" />](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522playwright%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522%2540playwright%252Fmcp%2540latest%2522%255D%257D)

或通过 VS Code CLI 安装:

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

#### Cursor

[<img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Install in Cursor" />](https://cursor.com/en/install-mcp?name=Playwright&config=eyJjb21tYW5kIjoibnB4IEBwbGF5d3JpZ2h0L21jcEBsYXRlc3QifQ%3D%3D)

或者进入 `Cursor Settings` → `MCP` → `Add new MCP Server`,选择 command 类型并填入 `npx @playwright/mcp@latest`。

#### Claude Code

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

#### Claude Desktop

按照 MCP 安装[指南](https://modelcontextprotocol.io/quickstart/user)操作,并使用上面的标准配置。

#### 其他客户端

标准配置适用于大多数 MCP 客户端,包括 Windsurf、Cline、Goose、Kiro、Codex、Copilot CLI 等。配置放置位置请查阅你所用客户端的 MCP 文档。

### 第一次交互

服务器连接成功后,让你的 AI 助手去操作一个网页:

```txt
Navigate to https://demo.playwright.dev/todomvc and add a few todo items.
```

助手会使用 Playwright MCP 工具打开浏览器、导航到页面并操作元素——全程基于结构化无障碍快照,而不是截图。

## 核心功能

### 无障碍快照

Playwright MCP 基于页面的无障碍树而非像素运行。工具执行时会返回一个结构化快照,展示页面元素、它们的角色(role)和文本内容。LLM 使用快照中的元素引用(ref)来与页面交互:

```txt
- heading "todos" [level=1]
- textbox "What needs to be done?" [ref=e5]
- listitem:
  - checkbox "Toggle Todo" [ref=e10]
  - text: "Buy groceries"
```

LLM 读取该快照后,用 `ref=e5` 向文本框输入内容,或用 `ref=e10` 勾选复选框。

### 与页面交互

Playwright MCP 为所有常见的浏览器交互提供了工具:

-   **导航**:打开 URL、前进/后退、刷新页面。
-   **点击与输入**:点击元素、键入文本、填写表单、选择下拉项。
-   **截图**:截取当前页面或特定元素,用于视觉验证。
-   **键盘与鼠标**:按键、悬停、拖放。
-   **对话框**:接受或关闭浏览器对话框。
-   **标签页**:创建、关闭和切换浏览器标签页。

### 运行 Playwright 代码

对于超出单个工具调用能力的复杂交互,可使用 `browser_run_code_unsafe` 工具直接执行 Playwright 脚本。该工具在 Playwright 服务器进程中运行任意 JavaScript,效果等同于 RCE——仅对可信的 MCP 客户端启用:

```txt
Run this Playwright code to verify the todo count:
async (page) => {
  const count = await page.getByTestId('todo-count').textContent();
  return count;
}
```

### 网络监控与 Mock

检查网络流量并 mock API 响应:

-   **查看网络请求**:列出页面加载以来的所有请求。
-   **Mock 路由**:设置 URL 模式匹配并返回自定义响应。
-   **控制台消息**:读取浏览器控制台输出以便调试。

### 存储状态

保存和恢复浏览器的 cookies 与 localStorage 等状态:

-   **保存状态**:将认证和会话数据持久化到文件。
-   **恢复状态**:把先前保存的状态加载进新会话。
-   **Cookie 管理**:列出、读取、设置和删除单个 cookie。

## 配置

### 有头模式

默认情况下,Playwright MCP 以有头模式运行浏览器,方便你看到正在发生的事情。要无头运行:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--headless"
      ]
    }
  }
}
```

### 浏览器选择

选择要使用的浏览器:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser=firefox"
      ]
    }
  }
}
```

支持的取值:`chrome`、`firefox`、`webkit`、`msedge`。

### 用户配置文件

Playwright MCP 支持三种 profile 模式:

-   **持久化(默认)**:登录状态和 cookies 在会话之间保留。配置文件存储在平台缓存目录的 `ms-playwright/mcp-{channel}-{workspace-hash}` 中,不同项目会自动获得独立的配置文件。可用 `--user-data-dir` 覆盖。
-   **隔离**:每个会话全新开始。传入 `--isolated` 启用;可用 `--storage-state` 加载初始状态。
-   **浏览器扩展**:通过 [Playwright Extension](https://github.com/microsoft/playwright/blob/main/packages/extension/README.md) 连接你已有的浏览器标签页。传入 `--extension` 启用。

### 配置文件

高级配置使用 JSON 配置文件:

```bash
npx @playwright/mcp@latest --config path/to/config.json
```

配置文件支持浏览器选项、上下文选项、网络规则、超时设置等。完整 schema 见 [Playwright MCP 仓库](https://github.com/microsoft/playwright-mcp/blob/main/config.d.ts)。

### 独立服务器

在无显示器的系统上或从 IDE 工作进程中有头运行浏览器时,可以用 HTTP 传输单独启动 MCP 服务器:

```bash
npx @playwright/mcp@latest --port 8931
```

HTTP 会话使用 5 秒的心跳超时。如果你的 MCP 客户端或代理不响应服务器发起的 ping,可将 `PLAYWRIGHT_MCP_PING_TIMEOUT_MS` 设置为更长的毫秒超时。设为 `0` 可禁用心跳。

然后将 MCP 客户端指向该 HTTP 端点:

```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931/mcp"
    }
  }
}
```

## 快速参考

| 操作                      | 如何操作                                                      |
| ------------------------- | ------------------------------------------------------------- |
| **安装服务器**            | 将标准配置添加到你的 MCP 客户端                                |
| **导航到页面**            | 提问:"Go to https://example.com"                              |
| **点击元素**              | 提问:"Click the Submit button"                                |
| **填写表单**              | 提问:"Fill in the email field with test@example.com"          |
| **截图**                  | 提问:"Take a screenshot of the page"                          |
| **运行 Playwright 代码**  | 提问:"Run this Playwright code: ..."                          |
| **Mock API**              | 提问:"Mock the /api/users endpoint to return ..."             |
| **使用有头模式**          | 默认即有头;传入 `--headless` 关闭                              |
| **选择浏览器**            | 在 args 中传入 `--browser=firefox`                             |

## 下一步

-   [使用 web-first 断言、page fixture 和定位器编写测试](./writing-tests.md)
-   [在 CI 上运行测试](./ci-intro.md)
-   [进一步了解 Trace Viewer](./trace-viewer.md)
