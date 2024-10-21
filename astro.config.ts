import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

/**
 * Astroの環境変数を使ってサイトのオリジンを取得する。
 * `import.meta.env`はViteにより上書きされて、Shell由来の環境変数にアクセスできない。
 * そのため、Viteが提供する`.env*`ファイルからの読み込みとNODE_ENV相当の値は`import.meta.env`から、Shell由来の環境変数は`process.env`から読み込む
 * @returns サイトのオリジン `http://localhost:4321`, `https://33.shikosai.net/` など
 * @see https://docs.astro.build/ja/guides/environment-variables/
 * @see https://ja.vite.dev/guide/env-and-mode
 * @see https://bun.sh/docs/api/import-meta
 */
const getSite = (): URL => {
  // デプロイ先がCloudflare Pagesの場合
  // @see https://developers.cloudflare.com/pages/configuration/build-configuration/
  if (typeof process.env.CF_PAGES_URL === 'string') {
    return new URL(process.env.CF_PAGES_URL);
  }
  // ローカル開発環境の場合
  if (import.meta.env.DEV) {
    return new URL('http://localhost:4321');
  }
  // わからない時
  return new URL('https://33.shikosai.net');
};

console.info('🌐 The site origin was set to:', getSite().origin);

export default defineConfig({
  output: 'hybrid',
  prefetch: true,
  site: getSite().origin,
  integrations: [react(), sitemap(), tailwind(), cloudflare()],
});
