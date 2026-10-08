import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aleccarruthers.github.io',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
