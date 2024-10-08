import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

/**
 * Astroの環境変数を使ってサイトのオリジンを取得する。
 * @returns サイトのオリジン `http://localhost:4321`, `https://33.shikosai.net/` など
 * @see https://docs.astro.build/ja/guides/environment-variables/
 */
const getSite = (): URL => {
  // デプロイ先がCloudflare Pagesの場合
  // @see https://developers.cloudflare.com/pages/configuration/build-configuration/
  if (typeof import.meta.env.CF_PAGES_URL === 'string') {
    return new URL(import.meta.env.CF_PAGES_URL);
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
  output: 'server',
  prefetch: true,
  site: getSite().origin,
  integrations: [react(), sitemap(), tailwind(), cloudflare()],
});
