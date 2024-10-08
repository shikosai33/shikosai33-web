import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import { defineConfig } from 'astro/config';

/**
 * Astroの環境変数を使ってサイトのオリジンを取得する。
 * @returns サイトのオリジン `http://localhost:4321`, `https://33.shikosai.net/` など
 * @see https://docs.astro.build/ja/guides/environment-variables/
 */
const getSite = (): URL => {
  // デプロイ先がCloudflare Pagesの場合
  // @see https://developers.cloudflare.com/pages/configuration/build-configuration/
  if (import.meta.env.CF_PAGES === '1' && import.meta.env.PAGES_URL) {
    return new URL(import.meta.env.PAGES_URL);
  }
  // ローカル開発環境の場合
  if (import.meta.env.DEV === true) {
    return new URL('https://localhost:4321');
  }
  // わからない時
  return new URL('https://33.shikosai.net');
};

console.info('🌐 The site origin was set to:', getSite().origin);

export default defineConfig({
  prefetch: true,
  site: getSite().origin,
  integrations: [
    react(),
    // NOTE: Sentry SDK is installed to use Spotlight in the local environment, so it is disabled in the production environment.
    sentry({ enabled: import.meta.env.DEV === true }),
    sitemap(),
    spotlightjs(),
    tailwind(),
  ],
});
