/* eslint-disable notice/notice */

/**
 * 本文件是 TodoMVC 示例的自定义测试夹具(fixtures)。
 *
 * 作用:
 * - 基于官方的 @playwright/test 扩展内置的 page 夹具;
 * - 每个测试开始前自动导航到 TodoMVC 演示页面,
 *   因此各测试文件无需重复编写 page.goto(...) 前置步骤;
 * - 通过 `use(page)` 把页面实例交给测试函数,测试结束后自动清理;
 * - 重新导出官方 `expect`,让所有测试统一从本文件导入。
 */

import { test as baseTest } from '@playwright/test';

// 重新导出官方断言工具,测试文件应从本夹具文件导入 { test, expect }。
export { expect } from '@playwright/test';

// 扩展基础 test 对象,覆盖 page 夹具:在测试主体运行前先完成导航。
export const test = baseTest.extend({
  page: async ({ page }, use) => {
    // 测试前置:打开 TodoMVC 演示站点。
    await page.goto('https://demo.playwright.dev/todomvc');
    // 将准备好的 page 交给测试函数;use(...) 返回后 Playwright 自动执行清理。
    await use(page);
  },
});
