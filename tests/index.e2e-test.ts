import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('/', () => {
  test('見出しと画像が正しく表示されている', async ({ page }) => {
    // `/` ページにアクセス
    await page.goto('/');

    // テキストと画像を取得
    const title = page.locator('h1', { hasText: '第33回茨香祭 2024年10月26日,27日' });
    const externalLink = page.locator('a', { hasText: '茨城工業高等専門学校' });
    const logo = page.locator('img');

    // テキストと画像が正しく表示されていることを確認
    expect(await title.isVisible()).toBeTruthy();
    expect(await externalLink.isVisible()).toBeTruthy();
    expect(await logo.getAttribute('alt')).toEqual('第33回茨香祭のロゴ');
  });

  test('アクセシビリティの侵害がない', async ({ page }) => {
    // `/` ページにアクセス
    await page.goto('/');

    // Axe を使用してアクセシビリティの侵害を検査
    // 参照: https://playwright.dev/docs/accessibility-testing
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // アクセシビリティの侵害がないことを確認
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
