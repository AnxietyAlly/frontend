import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
  extensions: ['.svelte'],
  preprocess: [vitePreprocess()],
  kit: {
    // Specify the base path if necessary, for example:
    // basePath: '/your-subdirectory',

    // Add the following `files` section to serve the "static" directory.
    files: {
      assets: 'static',
    },

    // Specify the adapter as adapter-auto.
    adapter: adapter(),
  },
};

export default config;
