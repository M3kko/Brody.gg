// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  outDir: './dist',
  publicDir: './public',
  build: {
    format: 'directory'
  }
});
