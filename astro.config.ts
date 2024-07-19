import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import { defineConfig } from 'astro/config';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  prefetch: true,
  site:
    process.env.VERCEL_ENV === 'production'
      ? 'https://shikosai.net/'
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/`
        : 'https://localhost:3000/',
  integrations: [
    react(),
    // NOTE: Sentry SDK is installed to use Spotlight in the local environment, so it is disabled in the production environment.
    sentry({ enabled: !isProduction }),
    sitemap(),
    spotlightjs(),
    tailwind(),
  ],
});
