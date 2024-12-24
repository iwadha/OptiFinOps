import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://iwadha.github.io',
  base: '/OptiFinOps',  // Remove trailing slash
  output: 'static',
  build: {
    assets: '_assets'
  }
});
