---
id: intro
title: "安装"
---

> 🌐 本文档由 [microsoft/playwright](https://github.com/microsoft/playwright) 翻译,英文原版见原项目。

## 简介

Playwright 是专为满足端到端测试需求而创建的。它支持所有现代渲染引擎,包括 Chromium、WebKit 和 Firefox。可在 Windows、Linux 和 macOS 上测试,本地或 CI 中运行,支持无头或有头模式,并提供原生移动端模拟。

你可以选择使用 Playwright 提供的 MSTest、NUnit 或 xUnit [基类](./test-runners.md)编写端到端测试。这些类开箱即用地支持:在多种浏览器引擎上运行测试、并行化测试、调整启动/上下文选项,以及为每个测试提供独立的 [Page]/[BrowserContext] 实例。你也可以改用[库](./library.md)自行搭建测试基础设施。

1. 先用 `dotnet new` 创建一个新项目。这会创建包含 `UnitTest1.cs` 文件的 `PlaywrightTests` 目录:

<Tabs
  groupId="test-runners"
  defaultValue="mstest"
  values={[
    {label: 'MSTest', value: 'mstest'},
    {label: 'NUnit', value: 'nunit'},
    {label: 'xUnit', value: 'xunit'},
    {label: 'xUnit v3', value: 'xunit-v3'},
  ]
}>
<TabItem value="nunit">

```bash
dotnet new nunit -n PlaywrightTests
cd PlaywrightTests
```

</TabItem>
<TabItem value="mstest">

```bash
dotnet new mstest -n PlaywrightTests
cd PlaywrightTests
```

</TabItem>
<TabItem value="xunit">

```bash
dotnet new xunit -n PlaywrightTests
cd PlaywrightTests
```

</TabItem>
<TabItem value="xunit-v3">

```bash
dotnet new xunit3 -n PlaywrightTests
cd PlaywrightTests
```

</TabItem>
</Tabs>

2. 安装所需的 Playwright 依赖:

<Tabs
  groupId="test-runners"
  defaultValue="mstest"
  values={[
    {label: 'MSTest', value: 'mstest'},
    {label: 'NUnit', value: 'nunit'},
    {label: 'xUnit', value: 'xunit'},
    {label: 'xUnit v3', value: 'xunit-v3'},
  ]
}>
<TabItem value="nunit">

```bash
dotnet add package Microsoft.Playwright.NUnit
```

</TabItem>
<TabItem value="mstest">

```bash
dotnet add package Microsoft.Playwright.MSTest
```

</TabItem>
<TabItem value="xunit">

```bash
dotnet add package Microsoft.Playwright.Xunit
```

</TabItem>
<TabItem value="xunit-v3">

```bash
dotnet add package Microsoft.Playwright.Xunit.v3
```

</TabItem>
</Tabs>

3. 构建项目,使 `playwright.ps1` 出现在 `bin` 目录中:

```bash
dotnet build
```

1. 安装所需的浏览器。本示例使用 `net8.0`;如果你使用其他版本的 .NET,需要相应调整命令,把 `net8.0` 改成你的版本。

```bash
pwsh bin/Debug/net8.0/playwright.ps1 install
```

如果 `pwsh` 不可用,你需要先[安装 PowerShell](https://docs.microsoft.com/powershell/scripting/install/installing-powershell)。

## 添加示例测试

用下面的代码编辑 `UnitTest1.cs`,创建一个端到端示例测试:

<Tabs
  groupId="test-runners"
  defaultValue="mstest"
  values={[
    {label: 'MSTest', value: 'mstest'},
    {label: 'NUnit', value: 'nunit'},
    {label: 'xUnit', value: 'xunit'},
    {label: 'xUnit v3', value: 'xunit-v3'},
  ]
}>
<TabItem value="nunit">

```csharp title="UnitTest1.cs"
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class ExampleTest : PageTest
{
    [Test]
    public async Task HasTitle()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Expect a title "to contain" a substring.
        await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
    }

    [Test]
    public async Task GetStartedLink()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Click the get started link.
        await Page.GetByRole(AriaRole.Link, new() { Name = "Get started" }).ClickAsync();

        // Expects page to have a heading with the name of Installation.
        await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Installation" })).ToBeVisibleAsync();
    } 
}
```

</TabItem>
<TabItem value="mstest">

```csharp title="UnitTest1.cs"
using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;

namespace PlaywrightTests;

[TestClass]
public class ExampleTest : PageTest
{
    [TestMethod]
    public async Task HasTitle()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Expect a title "to contain" a substring.
        await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
    }

    [TestMethod]
    public async Task GetStartedLink()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Click the get started link.
        await Page.GetByRole(AriaRole.Link, new() { Name = "Get started" }).ClickAsync();

        // Expects page to have a heading with the name of Installation.
        await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Installation" })).ToBeVisibleAsync();
    } 
}
```

</TabItem>
<TabItem value="xunit">

```csharp title="UnitTest1.cs"
using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.Xunit;

namespace PlaywrightTests;

public class UnitTest1: PageTest
{
    [Fact]
    public async Task HasTitle()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Expect a title "to contain" a substring.
        await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
    }

    [Fact]
    public async Task GetStartedLink()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Click the get started link.
        await Page.GetByRole(AriaRole.Link, new() { Name = "Get started" }).ClickAsync();

        // Expects page to have a heading with the name of Installation.
        await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Installation" })).ToBeVisibleAsync();
    } 
}
```
</TabItem>
<TabItem value="xunit-v3">

```csharp title="UnitTest1.cs"
using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.Xunit.v3;

namespace PlaywrightTests;

public class UnitTest1: PageTest
{
    [Fact]
    public async Task HasTitle()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Expect a title "to contain" a substring.
        await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
    }

    [Fact]
    public async Task GetStartedLink()
    {
        await Page.GotoAsync("https://playwright.dev");

        // Click the get started link.
        await Page.GetByRole(AriaRole.Link, new() { Name = "Get started" }).ClickAsync();

        // Expects page to have a heading with the name of Installation.
        await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Installation" })).ToBeVisibleAsync();
    } 
}
```
</TabItem>

</Tabs>

## 运行示例测试

默认情况下,测试会在 Chromium 上运行。可以通过 `BROWSER` 环境变量或调整[启动配置选项](./running-tests.md)来改变。测试以无头模式运行,即运行测试时不会打开浏览器。测试结果和日志会显示在终端中。

```bash
dotnet test
```

关于有头模式运行、运行多个测试、运行特定配置等更多内容,请参阅[运行与调试测试](./running-tests.md)文档。

## 系统要求

- Playwright 以 .NET Standard 2.0 库的形式分发。推荐使用 .NET 8。
- Windows 11+、Windows Server 2019+ 或适用于 Linux 的 Windows 子系统(WSL)。
- macOS 14(Sonoma)或更高版本。
- Debian 12 / 13,Ubuntu 22.04 / 24.04 / 26.04(x86-64 或 arm64)。

## 下一步

- [使用 web-first 断言、page fixture 和定位器编写测试](./writing-tests.md)
- [运行单个/多个测试、有头模式](./running-tests.md)
- [使用 Codegen 生成测试](./codegen-intro.md)
- [查看测试 trace](./trace-viewer-intro.md)
- [在 CI 上运行测试](./ci-intro.md)
- [进一步了解 MSTest、NUnit、xUnit 与 xUnit v3 基类](./test-runners.md)
