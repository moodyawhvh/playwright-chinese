# playwright 中文文档

<div align="center">

[![原项目](https://img.shields.io/badge/原项目-microsoft--playwright-blue?style=flat-square&logo=github)](https://github.com/microsoft/playwright)
[![中文简介](https://img.shields.io/badge/中文简介-README.md-orange?style=flat-square)](README.md)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

</div>

> 本文是 [microsoft/playwright](https://github.com/microsoft/playwright) 官方 README 的中文翻译版本,供中文开发者学习参考。
> 英文原版与最新文档以 https://github.com/microsoft/playwright 与 https://playwright.dev 为准。

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

## 🎭 项目简介

Playwright 是一个 Web 自动化与测试框架。它通过统一的一套 API 驱动 Chromium、Firefox 和 WebKit——可用于你的测试、你的脚本,也可以作为 AI Agent 的工具。

原 README 提供了几条入口,按你的工作流选择:

| 组件 | 最适合 | 安装 |
|---|---|---|
| **Playwright Test** | 端到端(E2E)测试 | `npm init playwright@latest` |
| **Playwright CLI** | 编码智能体(Claude Code、Copilot) | `npm i -g @playwright/cli@latest` |
| **Playwright MCP** | AI 智能体与 LLM 驱动的自动化 | `npx @playwright/mcp@latest` |
| **Playwright Library** | 浏览器自动化脚本 | `npm i playwright` |
| **VS Code 扩展** | 在 VS Code 中编写与调试测试 | [从插件市场安装](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) |

## 🧪 Playwright Test

Playwright Test 是为端到端测试打造的全功能测试运行器:跨 Chromium、Firefox、WebKit 运行用例,具备完整的浏览器隔离、自动等待和 Web 优先断言。

### 安装

```bash
npm init playwright@latest
```

或手动添加:

```bash
npm i -D @playwright/test
npx playwright install
```

### 编写测试

```TypeScript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

### 运行测试

```bash
npx playwright test
```

测试默认以无头模式在所有已配置的浏览器上并行执行。每个测试都会获得一个全新的浏览器上下文——完全隔离,开销近乎为零。

### 核心能力(摘要汉化)

- **自动等待与 Web 优先断言**:不需要人为设置超时;Playwright 会等待元素可交互,断言也会自动重试直到条件满足。
- **定位器(Locators)**:用贴近用户视角的弹性定位器找元素,如 `page.getByRole('button', { name: 'Submit' })`、`page.getByLabel('Email')`、`page.getByTestId('login-form')`。
- **测试隔离**:每个测试运行在独立浏览器上下文中(相当于全新的浏览器档案)。登录状态保存一次即可复用:

```TypeScript
// 登录后保存状态
await page.context().storageState({ path: 'auth.json' });
// 其他测试中复用
test.use({ storageState: 'auth.json' });
```

- **追踪(Tracing)**:失败时捕获执行轨迹、截图和视频,在 [Trace Viewer](https://playwright.dev/docs/trace-viewer) 中检查每一步操作、DOM 快照、网络请求和控制台消息。配置 `trace: 'on-first-retry'` 后用 `npx playwright show-trace trace.zip` 查看。
- **并行执行**:默认跨所有已配置浏览器并行运行。

完整测试文档:https://playwright.dev/docs/intro

## ⌨️ Playwright CLI

[Playwright CLI](https://github.com/microsoft/playwright-cli) 是面向编码智能体的浏览器自动化命令行工具。相比 MCP 更省 token——命令无需把大型工具 Schema 和无障碍树载入模型上下文。

```bash
# 安装
npm install -g @playwright/cli@latest
# 可选:安装技能包,获得更丰富的智能体集成
playwright-cli install --skills

# 直接执行命令
playwright-cli open https://demo.playwright.dev/todomvc/ --headed
playwright-cli type "Buy groceries"
playwright-cli press Enter
playwright-cli screenshot

# 可视化看板:实时串流预览所有运行中的浏览器会话
playwright-cli show
```

完整 CLI 文档:https://playwright.dev/agent-cli/introduction

## 🤖 Playwright MCP

[Playwright MCP 服务器](https://github.com/microsoft/playwright-mcp)通过 [Model Context Protocol](https://modelcontextprotocol.io) 赋予 AI 智能体完整的浏览器控制能力。智能体基于结构化的无障碍快照与页面交互——无需视觉模型或截图。

在 MCP 客户端(VS Code、Cursor、Claude Desktop、Windsurf 等)中添加:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Claude Code 一键添加:`claude mcp add playwright npx @playwright/mcp@latest`

工作方式:智能体把页面看作结构化无障碍树(带 `e5`、`e10` 等元素引用),据此确定性地完成点击、输入等操作,没有视觉歧义。工具覆盖导航、表单填写、截图、网络 Mock、存储管理等。

完整 MCP 文档:https://playwright.dev/mcp/introduction

## 📚 Playwright Library

把 `playwright` 当作浏览器自动化脚本库使用——网页抓取、PDF 生成、截图,以及一切需要程序化控制浏览器的场景(无需测试运行器)。

```bash
npm i playwright
```

代表性示例(移动设备模拟 + 截图):

```TypeScript
import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext(devices['iPhone 15']);
const page = await context.newPage();
await page.goto('https://playwright.dev/');
await page.screenshot({ path: 'mobile.png' });
await browser.close();
```

其余示例:用 `page.pdf({ path: 'page.pdf', format: 'A4' })` 生成 PDF;用 `page.route('**/*.{png,jpg,jpeg}', route => route.abort())` 拦截网络请求。

库文档:https://playwright.dev/docs/library | API 参考:https://playwright.dev/docs/api/class-playwright

## 🧩 VS Code 扩展

[Playwright VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)把测试运行、调试和代码生成直接搬进编辑器:

- **运行与调试测试**:编辑器内一键运行,支持断点、变量检查、单步执行,并附带实时浏览器视图。
- **Codegen 生成测试**:点击 "Record new" 打开浏览器,边操作边自动生成测试代码。
- **挑选定位器**:悬停浏览器中的任意元素即可看到最佳定位器,点击复制。
- **Trace Viewer 集成**:侧边栏开启 "Show Trace Viewer",每次运行后得到完整执行轨迹——DOM 快照、网络请求、控制台日志与逐步截图。

## 🌐 跨浏览器支持

|          | Linux | macOS | Windows |
|   :---   | :---: | :---: | :---:   |
| Chromium<sup>1</sup> | ✅ | ✅ | ✅ |
| WebKit | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |

全平台支持有头/无头运行。<sup>1</sup> 默认使用 [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing)。

## 🗂 其他语言版本

Playwright 还提供 [Python](https://playwright.dev/python/docs/intro)、[.NET](https://playwright.dev/dotnet/docs/intro) 和 [Java](https://playwright.dev/java/docs/intro) 版本。

## 🔗 资源

* [官方文档](https://playwright.dev)
* [API 参考](https://playwright.dev/docs/api/class-playwright)
* [MCP 服务器](https://github.com/microsoft/playwright-mcp)
* [面向编码智能体的 CLI](https://github.com/microsoft/playwright-cli)
* [VS Code 扩展](https://github.com/microsoft/playwright-vscode)
* [贡献指南](https://github.com/microsoft/playwright/blob/main/CONTRIBUTING.md)
* [更新日志](https://github.com/microsoft/playwright/releases)
* [Discord 社区](https://aka.ms/playwright/discord)

---

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

本项目为 [microsoft/playwright](https://github.com/microsoft/playwright) 的中文翻译文档,原文版权归微软及原项目作者所有,遵循原项目 Apache-2.0 许可证。

**如果对你有帮助,请给原项目 [microsoft/playwright](https://github.com/microsoft/playwright) 点个 Star!** ⭐
