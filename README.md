<div align="center">

# playwright 中文翻译版

**[中文版] playwright — 微软开源的 Web 测试与自动化框架中文翻译版**

[![原项目](https://img.shields.io/badge/原项目-microsoft--playwright-blue?style=flat-square&logo=github)](https://github.com/microsoft/playwright)
[![中文文档](https://img.shields.io/badge/中文文档-README.zh--CN.md-orange?style=flat-square)](README.zh-CN.md)
[![GitHub Stars](https://img.shields.io/github/stars/microsoft/playwright?style=flat-square&label=原项目Stars)](https://github.com/microsoft/playwright/stargazers)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

</div>

---

> 这是 [microsoft/playwright](https://github.com/microsoft/playwright) 的中文翻译版本。
> 完整源代码请访问原项目:https://github.com/microsoft/playwright

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

## 📖 项目简介

Playwright 是微软开源的新一代 Web 测试与自动化框架,用一套统一的 API 驱动 Chromium、Firefox、WebKit 三大浏览器引擎。它自带自动等待机制,不需要在脚本里写各种 sleep,用例因此更稳定、更可靠。既能跑端到端(E2E)测试,也能做网页抓取、表单自动化、截图、PDF 生成,还能给 AI Agent 提供浏览器控制能力。

## ✨ 主要特性

- **跨浏览器支持**:Chromium、Firefox、WebKit 一次编写,全平台覆盖
- **自动等待**:等元素可交互再操作,告别人为超时和随机失败
- **Web 优先断言**:`expect` 断言自动重试直到条件满足
- **完全隔离**:每个测试独享全新浏览器上下文,登录状态可保存复用
- **并行与分片**:默认并行执行,支持测试分片与失败重试,加速 CI
- **可观测性**:Trace Viewer、逐步截图、录屏、DOM 快照一应俱全
- **多语言 API**:TypeScript/JavaScript、Python、.NET、Java
- **AI 集成**:Playwright MCP 服务器 + 面向编码智能体的 CLI
- **强大工具链**:VS Code 扩展、Codegen 录制、UI Mode 调试

## 📁 文件说明

| 文件 | 说明 |
|:-----|:-----|
| README.md | 本文件(中文简介) |
| README.zh-CN.md | 详细中文文档(完整汉化) |

## 🚀 快速开始

**1. 一键初始化 Playwright Test 项目**

```bash
npm init playwright@latest
```

**2. 或手动安装**

```bash
npm i -D @playwright/test
npx playwright install
```

**3. 编写测试(example.spec.ts)**

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

**4. 运行测试**

```bash
npx playwright test
```

**5. 查看报告**

```bash
npx playwright show-report
```

**6. 录制与调试**

```bash
npx playwright codegen     # 录制测试代码
npx playwright test --ui   # UI 模式调试
```

完整源代码与最新版本请访问原项目:https://github.com/microsoft/playwright

## 📞 联系方式

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

本项目为 [microsoft/playwright](https://github.com/microsoft/playwright) 的中文翻译版本,所有代码版权归原项目作者所有,遵循其原始许可证。

**如果觉得有用,请给原项目点个 Star!** ⭐
