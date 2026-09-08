---
id: getting-started-cli
title: "编程智能体(Coding agents)"
---

> 🌐 本文档由 [microsoft/playwright](https://github.com/microsoft/playwright) 翻译,英文原版见原项目。
>
> 📝 注:本文超过 10000 字符,按约定仅翻译核心章节;命令行示例与代码块保持英文原样。

## 简介

Playwright 自带 `playwright-cli`,一个专为编程智能体(coding agents)设计的浏览器自动化命令行界面。它通过简洁的 CLI 命令和可安装的技能(skills)提供省 token 的浏览器控制,非常适合需要在有限上下文窗口内平衡浏览器自动化、大型代码库与推理任务的智能体。

### `playwright-cli` 与 Playwright MCP 对比

- **`playwright-cli`** 最适合偏好省 token、基于技能工作流的**编程智能体**(Claude Code、GitHub Copilot 等)。CLI 命令避免了向模型上下文加载庞大的工具 schema 和冗长的无障碍树。
- **MCP** 最适合需要持久状态、对页面结构进行迭代推理的专用智能体循环,例如探索式自动化或长时间运行的自主工作流。参见 [MCP 入门指南](./getting-started-mcp.md)。

## 前置条件

开始之前,请确保已安装:

- [Node.js](https://nodejs.org/) 20 或更新版本
- 一个编程智能体:Claude Code、GitHub Copilot 或类似工具

## 安装

全局安装 `playwright-cli`:

```bash
npm install -g @playwright/cli@latest
playwright-cli --help
```

或者将 `@playwright/cli` 安装为本地依赖并通过 `npx` 使用:

```bash
npm install -D @playwright/cli@latest
npx playwright cli --help
```

### 安装技能

Claude Code、GitHub Copilot 等编程智能体可以使用本地安装的技能,以获得关于可用命令的更丰富上下文:

```bash
playwright-cli install --skills
```

要在所有项目之间共享技能,加 `-g` 标志将其安装到用户主目录(`~/.claude/skills`,或使用 `--skills=agents` 安装到 `~/.agents/skills`):

```bash
playwright-cli install --skills -g
```

### 不用技能的用法

你也可以让智能体直接调用 CLI,由它自行探索可用命令:

```txt
Test the "add todo" flow on https://demo.playwright.dev/todomvc using playwright-cli.
Check playwright-cli --help for available commands.
```

## 起步

### 交互式演示

试着向你的编程智能体提问:

```txt
Use playwright skills to test https://demo.playwright.dev/todomvc/.
Take screenshots for all successful and failing scenarios.
```

### 手动演练

你也可以手动运行命令,直观感受 CLI 的工作方式:

```bash
playwright-cli open https://demo.playwright.dev/todomvc/ --headed
playwright-cli type "Buy groceries"
playwright-cli press Enter
playwright-cli type "Water flowers"
playwright-cli press Enter
playwright-cli check e21
playwright-cli screenshot
```

每条命令执行后,CLI 都会输出当前页面状态的快照:

```txt
### Page
- Page URL: https://demo.playwright.dev/todomvc/#/
- Page Title: React • TodoMVC
### Snapshot
[Snapshot](.playwright-cli/page-2026-02-14T19-22-42-679Z.yml)
```

## 核心命令

### 与页面交互

```bash
playwright-cli open [url]               # open browser, optionally navigate to url
playwright-cli goto <url>               # navigate to a url
playwright-cli click <ref> [button]     # click an element
playwright-cli type <text>              # type text into editable element
playwright-cli fill <ref> <text>        # fill text into editable element
playwright-cli select <ref> <value>     # select an option in a dropdown
playwright-cli check <ref>              # check a checkbox or radio button
playwright-cli uncheck <ref>            # uncheck a checkbox
playwright-cli hover <ref>              # hover over element
playwright-cli drag <startRef> <endRef> # drag and drop between elements
playwright-cli upload <files...>        # upload one or multiple files
playwright-cli close                    # close the page
```

### 定位元素

使用快照中的元素 ref 来定位元素:

```bash
playwright-cli snapshot                 # get snapshot with element refs
playwright-cli click e15                # click using a ref
```

也可以使用 CSS 或 role 选择器:

```bash
playwright-cli click "#main > button.submit"
playwright-cli click "role=button[name=Submit]"
playwright-cli click "#footer >> role=button[name=Submit]"
```

### 截图与快照

```bash
playwright-cli snapshot                 # capture page snapshot
playwright-cli snapshot --filename=f    # save snapshot to specific file
playwright-cli screenshot               # screenshot of the current page
playwright-cli screenshot [ref]         # screenshot of a specific element
playwright-cli screenshot --filename=f  # save with specific filename
playwright-cli screenshot --hires       # capture using device pixels
playwright-cli pdf                      # save page as PDF
```

### 导航

```bash
playwright-cli go-back                  # go back
playwright-cli go-forward               # go forward
playwright-cli reload                   # reload the page
```

### 键盘与鼠标

```bash
playwright-cli press <key>              # press a key (e.g. Enter, ArrowLeft)
playwright-cli keydown <key>            # key down
playwright-cli keyup <key>              # key up
playwright-cli mousemove <x> <y>        # move mouse
playwright-cli mousedown [button]       # mouse button down
playwright-cli mouseup [button]         # mouse button up
playwright-cli mousewheel <dx> <dy>     # scroll
```

### 标签页

```bash
playwright-cli tab-list                 # list all tabs
playwright-cli tab-new [url]            # create a new tab
playwright-cli tab-select <index>       # select a tab
playwright-cli tab-close [index]        # close a tab
```

### 网络

```bash
playwright-cli requests                 # list network requests since page load
playwright-cli request <num>            # show full details of a single request
playwright-cli route <pattern> [opts]   # mock network requests
playwright-cli route-list               # list active routes
playwright-cli unroute [pattern]        # remove routes
```

### 存储

```bash
playwright-cli state-save [filename]    # save storage state (cookies, localStorage)
playwright-cli state-load <filename>    # load storage state

# Cookies
playwright-cli cookie-list [--domain]   # list cookies
playwright-cli cookie-get <name>        # get a cookie
playwright-cli cookie-set <name> <val>  # set a cookie
playwright-cli cookie-delete <name>     # delete a cookie
playwright-cli cookie-clear             # clear all cookies

# localStorage
playwright-cli localstorage-list        # list entries
playwright-cli localstorage-get <key>   # get value
playwright-cli localstorage-set <k> <v> # set value
playwright-cli localstorage-delete <k>  # delete entry
playwright-cli localstorage-clear       # clear all
```

### DevTools

```bash
playwright-cli console [min-level]      # list console messages
playwright-cli eval <func> [ref]        # evaluate JavaScript on page
playwright-cli run-code <code>          # run Playwright code snippet
playwright-cli tracing-start            # start trace recording
playwright-cli tracing-stop             # stop trace recording
playwright-cli video-start              # start video recording
playwright-cli video-chapter <title>    # add chapter marker to video
playwright-cli video-stop --filename=f  # stop video recording
```

## 会话管理

CLI 默认将浏览器配置文件(profile)保存在内存中——同一会话内多次调用之间会保留 cookies 和存储状态,但浏览器关闭后即丢失。使用 `--persistent` 可将配置文件保存到磁盘。

### 命名会话

为不同项目运行多个浏览器实例:

```bash
playwright-cli open https://playwright.dev
playwright-cli -s=example open https://example.com --persistent
playwright-cli list                     # list all sessions
```

你可以让编程智能体使用特定会话:

```bash
PLAYWRIGHT_CLI_SESSION=todo-app claude .
```

### 会话管理命令

```bash
playwright-cli list                     # list all sessions
playwright-cli close-all                # close all browsers
playwright-cli kill-all                 # forcefully kill all browser processes
playwright-cli -s=name delete-data      # delete user data for a named session
```

## 监控

使用 `playwright-cli show` 打开可视化面板,观察并控制所有正在运行的浏览器会话:

```bash
playwright-cli show
```

该面板提供:

- **会话网格** — 按工作区分组展示所有活跃会话,每个会话带有实时屏幕预览、会话名称、当前 URL 和页面标题。点击任意会话可放大查看。
- **会话详情** — 所选会话的实时视图,包含标签页栏、导航控件和完整远程控制。点击视口即可接管鼠标和键盘,按 Escape 释放。

## 配置

### 有头模式

CLI 默认无头(headless)运行。要看到浏览器界面:

```bash
playwright-cli open https://playwright.dev --headed
```

### 浏览器选择

```bash
playwright-cli open --browser=chrome    # use specific browser
playwright-cli open --browser=firefox
playwright-cli open --browser=webkit
playwright-cli open --browser=msedge
```

### 配置文件

高级设置可使用 JSON 配置文件:

```bash
playwright-cli --config path/to/config.json open example.com
```

若存在 `.playwright/cli.config.json`,CLI 也会自动加载。配置文件支持浏览器选项、上下文选项、网络规则、超时设置等。运行 `playwright-cli --help` 查看完整选项列表。

### 浏览器扩展

连接到你已有的浏览器标签页,而不是启动新浏览器:

```bash
playwright-cli attach --extension
```

这需要先安装 [Playwright Extension](https://github.com/microsoft/playwright/blob/main/packages/extension/README.md)。

## 快速参考

| 操作                      | 命令                                                |
| ------------------------- | --------------------------------------------------- |
| **安装 CLI**              | `npm install -g @playwright/cli@latest`             |
| **安装技能**              | `playwright-cli install --skills`                   |
| **打开页面**              | `playwright-cli open https://example.com`           |
| **点击元素**              | `playwright-cli click e15`                          |
| **输入文本**              | `playwright-cli type "hello world"`                 |
| **截图**                  | `playwright-cli screenshot`                         |
| **获取页面快照**          | `playwright-cli snapshot`                           |
| **有头模式运行**          | `playwright-cli open https://example.com --headed`  |
| **使用 Firefox**          | `playwright-cli open --browser=firefox`             |
| **监控会话**              | `playwright-cli show`                               |

## 下一步

- [使用 web-first 断言、page fixture 和定位器编写测试](./writing-tests.md)
- [在 CI 上运行测试](./ci-intro.md)
- [进一步了解 Trace Viewer](./trace-viewer.md)
