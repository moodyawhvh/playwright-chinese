---
id: intro
title: "安装"
---

> 🌐 本文档由 [microsoft/playwright](https://github.com/microsoft/playwright) 翻译,英文原版见原项目。

## 简介

Playwright 是专为满足端到端测试需求而创建的。它支持所有现代渲染引擎,包括 Chromium、WebKit 和 Firefox。可在 Windows、Linux 和 macOS 上测试,本地或 CI 中运行,支持无头或有头模式,并提供原生移动端模拟。

[Playwright 库](./library.md)也可以作为通用浏览器自动化工具使用,为同步和异步 Python 提供一套强大的 API 来自动化 Web 应用。

本入门文档介绍 Playwright Pytest 插件,这是编写端到端测试的推荐方式。

**你将学到**

- [如何安装 Playwright Pytest](/intro.md#installing-playwright-pytest)
- [如何运行示例测试](/intro.md#running-the-example-test)

## 安装 Playwright Pytest

Playwright 推荐使用官方的 [Playwright Pytest 插件](./test-runners.md)编写端到端测试。它开箱即用地提供上下文隔离,并支持在多种浏览器配置上运行。

先安装 Playwright 并运行示例测试,直观感受它的能力。

安装 [Pytest 插件](https://pypi.org/project/pytest-playwright/):

<Tabs
  groupId="package-managers"
  defaultValue="pip"
  values={[
    {label: 'Pip', value: 'pip'},
    {label: 'Poetry', value: 'poetry'},
    {label: 'uv', value: 'uv'}
  ]
}>

<TabItem value="pip">

```bash
pip install pytest-playwright
```

</TabItem>

<TabItem value="poetry">

```bash
poetry add pytest-playwright
```

</TabItem>

<TabItem value="uv">

```bash
uv add pytest-playwright
```

</TabItem>

</Tabs>

安装所需的浏览器:

```bash
playwright install
```

## 添加示例测试

在当前工作目录或子目录中,创建一个遵循 `test_` 前缀约定的文件(例如 `test_example.py`),写入以下代码。注意测试函数名同样要遵循 `test_` 前缀约定。

```py title="test_example.py"
import re
from playwright.sync_api import Page, expect

def test_has_title(page: Page):
    page.goto("https://playwright.dev/")

    # Expect a title "to contain" a substring.
    expect(page).to_have_title(re.compile("Playwright"))

def test_get_started_link(page: Page):
    page.goto("https://playwright.dev/")

    # Click the get started link.
    page.get_by_role("link", name="Get started").click()

    # Expects page to have a heading with the name of Installation.
    expect(page.get_by_role("heading", name="Installation")).to_be_visible()
```

## 运行示例测试

默认情况下,测试会在 Chromium 上运行,可通过 [CLI 选项](./running-tests.md)配置。测试以无头模式运行,即运行测试时不会打开浏览器界面。测试结果和日志会显示在终端中。

```bash
pytest
```

## 更新 Playwright

要将 Playwright 更新到最新版本,运行以下命令:

<Tabs
  groupId="package-managers"
  defaultValue="pip"
  values={[
    {label: 'pip', value: 'pip'},
    {label: 'Poetry', value: 'poetry'},
    {label: 'uv', value: 'uv'}
  ]
}>
<TabItem value="pip">

```bash
pip install pytest-playwright playwright -U
```

</TabItem>
<TabItem value="poetry">

```bash
poetry update pytest-playwright playwright
```

</TabItem>
<TabItem value="uv">

```bash
uv add --upgrade pytest-playwright playwright
```

</TabItem>
</Tabs>

## 系统要求

- Python 3.8 或更高版本。
- Windows 11+、Windows Server 2019+ 或适用于 Linux 的 Windows 子系统(WSL)。
- macOS 14(Sonoma)或更高版本。
- Debian 12 / 13,Ubuntu 22.04 / 24.04 / 26.04(x86-64 或 arm64)。

## 下一步

- [使用 web-first 断言、page fixture 和定位器编写测试](./writing-tests.md)
- [运行单个/多个测试、有头模式](./running-tests.md)
- [使用 Codegen 生成测试](./codegen.md)
- [查看测试 trace](./trace-viewer-intro.md)
