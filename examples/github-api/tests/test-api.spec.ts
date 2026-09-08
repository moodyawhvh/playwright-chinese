/* eslint-disable notice/notice */

/**
 * 在本脚本中,我们将登录 GitHub,并运行几个使用 GitHub API 的测试。
 *
 * 步骤概要
 * 1. 创建一个新仓库。
 * 2. 运行通过编程方式创建新 issue 的测试。
 * 3. 删除该仓库。
 */

import { test, expect } from '@playwright/test';

const user = process.env.GITHUB_USER;
const repo = 'Test-Repo-1';

// 通过 test.use 定制本文件内所有测试的默认配置:
// baseURL 指向 GitHub API,extraHTTPHeaders 为所有请求附加认证令牌。
test.use({
  baseURL: 'https://api.github.com',
  extraHTTPHeaders: {
    'Accept': 'application/vnd.github.v3+json',
    // 为所有请求添加授权令牌。
    'Authorization': `token ${process.env.API_TOKEN}`,
  }
});

// beforeAll:在本文件所有测试开始前执行一次,用于准备测试环境。
test.beforeAll(async ({ request }) => {
  // 创建仓库
  const response = await request.post('/user/repos', {
    data: {
      name: repo
    }
  });
  expect(response.ok()).toBeTruthy();
});

// afterAll:在本文件所有测试结束后执行一次,用于清理测试环境。
test.afterAll(async ({ request }) => {
  // 删除仓库
  const response = await request.delete(`/repos/${user}/${repo}`);
  expect(response.ok()).toBeTruthy();
});

// 测试:应能创建 bug 报告。
// 流程:POST 创建 issue -> GET 列出 issues -> 校验新 issue 的内容存在。
test('should create bug report', async ({ request }) => {
  const newIssue = await request.post(`/repos/${user}/${repo}/issues`, {
    data: {
      title: '[Bug] report 1',
      body: 'Bug description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`/repos/${user}/${repo}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] report 1',
    body: 'Bug description'
  }));
});

// 测试:应能创建功能请求。
// 流程与上面相同,只是 issue 的标题与描述不同。
test('should create feature request', async ({ request }) => {
  const newIssue = await request.post(`/repos/${user}/${repo}/issues`, {
    data: {
      title: '[Feature] request 1',
      body: 'Feature description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`/repos/${user}/${repo}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Feature] request 1',
    body: 'Feature description'
  }));
});
