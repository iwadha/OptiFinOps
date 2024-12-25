import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://optifinops.com',
  base: '/',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
