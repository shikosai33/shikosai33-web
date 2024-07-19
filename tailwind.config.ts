import type { Config } from 'tailwindcss';
import tailwindcssAnimatePlugin from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  plugins: [tailwindcssAnimatePlugin],
};

export default config;
