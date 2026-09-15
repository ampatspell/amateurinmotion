import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: {
        runes: true,
        experimental: { async: true },
      },
      adapter: adapter(),
      experimental: { remoteFunctions: true },
    }),
  ],
});
