> 🌐 本文档由 [microsoft/playwright](https://github.com/microsoft/playwright) 翻译,英文原版见原项目。

# 如何提交一个能真正被解决的 Bug 报告

提交之前,请确保你使用的是最新版 Playwright,并先检索现有 GitHub issues 以避免重复。

## 使用模板

请遵循 **Bug Report** 模板,它会一步步引导你:

- 完整填写所有字段。
- 清晰列出复现该 bug 所需的步骤。
- 写明你期望看到的结果与实际发生的结果。
- 附上 `npx envinfo --preset playwright` 输出的系统信息。

## 保持复现用例最小化

我们无法解析你的整个代码库。请把问题精简到绝对必要的程度:

- 新建一个全新项目(`npm init playwright@latest new-project`)。
- 只添加能展示该问题的代码/DOM。
- 仅在必要时使用主流框架(React、Angular、静态 HTTP 服务器等)。
- 除非绝对必要,不要添加额外的库。注意,我们不会安装任何可疑的依赖。

## 为什么这很重要

- 大多数缺少复现用例的 issue 最终都被证明是配置错误或使用不当。
- 如果我们自己无法复现问题,就无法修复它。
- 我们无法调试整个私有项目,也不会处理敏感凭据。
- 每个被确认的 bug 都会在我们的仓库中有一个对应测试,所以你的复现用例必须尽可能干净。

## 更多帮助

- [Stack Overflow 最小可复现示例指南](https://stackoverflow.com/help/minimal-reproducible-example)
- [Playwright 调试工具](https://playwright.dev/docs/debug)

## 底线

一个隔离良好的 bug 能显著加快验证与解决速度。请提供最小化、可公开的复现,否则我们大概率无法提供帮助。
