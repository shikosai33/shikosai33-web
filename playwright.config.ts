import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // テストファイルをこの設定ファイルからの相対パスである "tests" ディレクトリ内で検索する
  testDir: 'tests',
  testMatch: '**/*.e2e-test.ts',

  // すべてのテストを並列実行します。
  fullyParallel: true,

  // CI 環境で test.only をソースコードに残してしまった場合、ビルドを失敗させる
  forbidOnly: !!process.env.CI,

  // CI 環境でのみリトライする
  retries: process.env.CI ? 2 : 0,

  // CI 環境では並列テストをオフする
  workers: process.env.CI ? 1 : 3,

  // 使用するレポーター
  reporter: 'html',

  use: {
    // `await page.goto('/')` のようなアクションで使用するベースURL
    baseURL: 'http://localhost:4321',

    // 失敗したテストをリトライする際にトレースを収集する
    trace: 'on-first-retry',
  },
  // 主要なブラウザのためのプロジェクトの設定
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // テストを開始する前にローカルの開発サーバーを実行するための設定
  webServer: {
    command: 'bun preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
