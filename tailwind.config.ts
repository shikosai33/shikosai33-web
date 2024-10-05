import type { Config } from 'tailwindcss';
import tailwindcssAnimatePlugin from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{astro,mdx,tsx}'],
  plugins: [tailwindcssAnimatePlugin],
  theme: {
    fontFamily: {
      Dela: ['"Dela Gothic One"', 'sans-serif'],
    },
  },
};

export default config;
