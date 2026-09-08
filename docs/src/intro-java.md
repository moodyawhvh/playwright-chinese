---
id: intro
title: "安装"
---

> 🌐 本文档由 [microsoft/playwright](https://github.com/microsoft/playwright) 翻译,英文原版见原项目。

## 简介

Playwright 是专为满足端到端测试需求而创建的。它支持所有现代渲染引擎,包括 Chromium、WebKit 和 Firefox。可在 Windows、Linux 和 macOS 上测试,本地或 CI 中运行,支持无头或有头模式,并提供原生移动端模拟。

Playwright 以一组 [Maven](https://maven.apache.org/what-is-maven.html) 模块的形式发布。最简单的用法是按下文所述在项目的 `pom.xml` 中添加一个依赖。如果你不熟悉 Maven,请先阅读它的[文档](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)。

## 用法

先安装 Playwright 并运行示例文件,直观感受它的能力。

<Tabs
  defaultValue="java"
  values={[
    {label: 'App.java', value: 'java'},
    {label: 'pom.xml', value: 'pom'}
  ]
}>
<TabItem value="java">

```java title="src/main/java/org/example/App.java"
package org.example;

import com.microsoft.playwright.*;

public class App {
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().launch();
            Page page = browser.newPage();
            page.navigate("https://playwright.dev");
            System.out.println(page.title());
        }
    }
}
```

</TabItem>
<TabItem value="pom">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.example</groupId>
  <artifactId>examples</artifactId>
  <version>0.1-SNAPSHOT</version>
  <name>Playwright Client Examples</name>
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  <dependencies>
    <dependency>
      <groupId>com.microsoft.playwright</groupId>
      <artifactId>playwright</artifactId>
      <version>%%VERSION%%</version>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.10.1</version>
        <!-- References to interface static methods are allowed only at source level 1.8 or above -->
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

</TabItem>
</Tabs>

准备好以上 App.java 和 pom.xml 后,按如下方式编译并运行你的新程序:

```bash
mvn compile exec:java -D exec.mainClass="org.example.App"
```

首次运行会下载 Playwright 包,并安装 Chromium、Firefox 和 WebKit 的浏览器二进制文件。要修改该行为,参见[安装参数](./browsers.md#install-browsers)。

## 第一个脚本

在第一个脚本中,我们将导航到 `playwright.dev` 并用 WebKit 截图。

```java
package org.example;

import com.microsoft.playwright.*;
import java.nio.file.Paths;

public class App {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      Browser browser = playwright.webkit().launch();
      Page page = browser.newPage();
      page.navigate("https://playwright.dev/");
      page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("example.png")));
    }
  }
}
```

默认情况下,Playwright 以无头模式运行浏览器。要看到浏览器界面,将 [`option: BrowserType.launch.headless`] 选项设为 `false`。你也可以使用 [`option: BrowserType.launch.slowMo`] 减慢执行速度。更多信息见调试工具[章节](./debug.md)。

```java
playwright.firefox().launch(new BrowserType.LaunchOptions().setHeadless(false).setSlowMo(50));
```

## 运行示例脚本

```bash
mvn compile exec:java -D exec.mainClass="org.example.App"
```

默认情况下,由 Playwright 启动的浏览器以无头方式运行,即运行脚本时不会打开浏览器界面。要改变这一点,可在启动浏览器时传入 `new BrowserType.LaunchOptions().setHeadless(false)`。

## 系统要求

- Java 8 或更高版本。
- Windows 11+、Windows Server 2019+ 或适用于 Linux 的 Windows 子系统(WSL)。
- macOS 14(Sonoma)或更高版本。
- Debian 12 / 13,Ubuntu 22.04 / 24.04 / 26.04(x86-64 或 arm64)。

## 下一步

- [使用 web-first 断言、page fixture 和定位器编写测试](./writing-tests.md)
- [运行单个/多个测试、有头模式](./running-tests.md)
- [使用 Codegen 生成测试](./codegen.md)
- [查看测试 trace](./trace-viewer-intro.md)
