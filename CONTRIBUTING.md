> 🌐 本文档由 [microsoft/playwright](https://github.com/microsoft/playwright) 翻译,英文原版见原项目。

# 贡献指南

## 选择 Issue

为了保持项目质量与专注度,除小型文档修复外,Playwright **要求每一项贡献都对应一个 Issue**。

如果你想处理一个当前未列出的 bug 或功能,请**先提交一个新 Issue**。这样社区和维护者可以尽早给出反馈,也能在你投入时间开发 Pull Request 之前先展开讨论。

提交 Issue 时,请明确说明你是否打算亲自处理。经过分类审批后,维护者会决定最佳处理路径——是由**核心团队**处理、由**自动化代理**处理,还是交给**社区贡献者**。一旦 Issue 分配给你,你就可以开始修改并提交 PR。

### 提交政策

为了保证项目的可维护性,请注意以下几点:

* **未经请求的 PR:** 没有关联 Issue 或未事先获得批准的 Pull Request 将被直接关闭。
* **低质量 AI 贡献:** 不符合我们质量标准或缺乏人工把关的 PR(包括低质量的智能体提交)将被无解释关闭。
* **必须先获批准:** 只有在 Issue 被正式分配给你或被批准接受社区贡献后,才能开始提交 PR。

## 进行修改

确保你使用的是 Node.js 20 或更高版本。
```bash
node --version
```

克隆仓库。如果你计划提交 Pull Request,建议先 [fork 仓库](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)。
```bash
git clone https://github.com/microsoft/playwright
cd playwright
```

安装依赖并以 watch 模式运行构建。
```bash
npm ci
npm run watch
npx playwright install
```

Playwright 是一个使用 npm workspaces 的多包仓库。浏览器相关 API 见 [`packages/playwright-core`](https://github.com/microsoft/playwright/blob/main/packages/playwright-core);测试运行器见 [`packages/playwright`](https://github.com/microsoft/playwright/blob/main/packages/playwright)。

注意,部分文件是由构建生成的,如果改错了文件,watch 进程可能会覆盖你的修改。例如,API 的 TypeScript 类型是由 [`docs/src`](https://github.com/microsoft/playwright/blob/main/docs/src) 生成的。

编码风格完整定义在 [eslint.config.mjs](https://github.com/microsoft/playwright/blob/main/eslint.config.mjs) 中。在创建 Pull Request 之前,或开发过程中的任意时刻,都可以运行 lint 来检查各种问题:
  ```bash
  npm run lint
  ```

注释应当有明确的目的,应当提升而非妨碍可读性。如果一段代码不加注释就无法被理解,请考虑重写代码,使其本身就能自解释。

### 编写文档

公共 API 的每一部分都应在 [`docs/src`](https://github.com/microsoft/playwright/blob/main/docs/src) 中记录,并且与新增/修改 API 的改动放在同一次变更里。我们使用带有自定义结构的 markdown 文件来描述 API,可参考现有文件作为示例。

其他许多文件都是由 API 规范生成的。如果你正在运行 `npm run watch`,它们会自动重新生成。

较大的改动还需要同步更新文档指南,这一点会在代码评审中明确指出。

## 添加测试

Playwright 几乎要求所有新增或修改的功能都附带测试。纯重构是例外,但你的改动很可能不止于此。

Playwright 中有多个[测试套件](https://github.com/microsoft/playwright/blob/main/tests)会在 CI 上执行。你需要在本地运行的两个最重要的套件是:

- Library 测试覆盖与测试运行器无关的 API。
  ```bash
  # 快速路径在 Chromium 中运行所有测试
  npm run ctest

  # 慢速路径在三个浏览器中运行所有测试
  npm run test
  ```

- 测试运行器测试。
  ```bash
  npm run ttest
  ```

由于 Playwright 的测试在底层使用了 Playwright 自身,我们文档中的所有内容都适用,例如[这份运行与调试测试的指南](https://playwright.dev/docs/running-tests#running-tests)。

注意,测试应当是*封闭的(hermetic)*,不依赖外部服务。测试必须在三个平台上都能运行:macOS、Linux 和 Windows。

## 撰写 Commit Message

Commit message 应遵循[语义化提交信息](https://www.conventionalcommits.org/en/v1.0.0/)格式:

```
label(namespace): title

description

footer
```

1. *label* 是以下之一:
    - `fix` - bug 修复
    - `feat` - 新功能
    - `docs` - 仅文档变更
    - `test` - 仅测试变更
    - `devops` - CI 或构建相关变更
    - `chore` - 不属于以上分类的其他变更
2. *namespace* 写在 label 后的圆括号内,可选,必须为小写。
3. *title* 是变更的简要总结。
4. *description* **可选**,与 title 用换行分隔,使用现在时态。
5. *footer* **可选**,与 *description* 用换行分隔,包含 "fixes" / "references" 以及对应的 GitHub issue 编号。

示例:

```
feat(trace viewer): network panel filtering

This patch adds a filtering toolbar to the network panel.
<link to a screenshot>

Fixes #123, references #234.
```

## 提交 Pull Request

所有提交(包括项目成员的提交)都需要经过评审。我们使用 GitHub Pull Request 完成这一流程。
请务必保持你的 PR(diff)小巧且易读。如有必要,可以把贡献拆分成多个 PR。
更多关于 Pull Request 的用法,请参阅 [GitHub 帮助文档](https://help.github.com/articles/about-pull-requests/)。

代码评审通过后,会由一位维护者合并你的 Pull Request。恭喜!

## 更多细节

**不引入新依赖**

对新依赖(包括升级现有依赖到新版本)的门槛非常高。我们建议先在 Issue 中明确讨论并获得维护者的首肯,再创建更新依赖的 Pull Request。

**自定义浏览器构建**

要使用自定义浏览器可执行文件运行测试,请指定指向浏览器可执行文件的 `CRPATH`、`WKPATH` 或 `FFPATH` 环境变量:
```bash
CRPATH=<path-to-executable> npm run ctest
```

调试自定义构建时,`DEBUG=pw:browser` 也会很有用。

**构建文档站点**

[playwright.dev](https://playwright.dev/) 文档站点位于一个单独的仓库中,[`docs/src`](https://github.com/microsoft/playwright/blob/main/docs/src) 中的文档会定期同步(roll)到那里。

大多数情况下你无需关心这一点。但如果你在文档中做了不寻常的改动,可以在本地构建并验证改动的实际效果:
1. 克隆 [microsoft/playwright.dev](https://github.com/microsoft/playwright.dev) 仓库。
1. 按照 [playwright.dev README 中 "roll docs" 的说明](https://github.com/microsoft/playwright.dev/#roll-docs),针对你本地带有进行中改动的 `playwright` 仓库执行同步。
1. 按照 [playwright.dev README 中 "run dev server" 的说明](https://github.com/microsoft/playwright.dev/#run-dev-server)启动开发服务器查看你的改动。

## 贡献者许可协议(CLA)

本项目欢迎贡献与建议。大多数贡献要求你同意一份贡献者许可协议(CLA),声明你有权且确实授予我们使用你的贡献的权利。详情请访问 https://cla.opensource.microsoft.com。

当你提交 Pull Request 时,CLA 机器人会自动判断你是否需要提供 CLA,并相应地装饰该 PR(例如状态检查、评论)。只需按照机器人给出的指引操作即可。在所有使用我们 CLA 的仓库中,你只需做一次。

### 行为准则

本项目已采用 [Microsoft 开源行为准则](https://opensource.microsoft.com/codeofconduct/)。
更多信息请参阅[行为准则 FAQ](https://opensource.microsoft.com/codeofconduct/faq/),
或联系 [opencode@microsoft.com](mailto:opencode@microsoft.com) 提出任何其他问题或意见。
