import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	test: {
		coverage: {
		  	provider: 'v8', // or 'istanbul', 'v8' is default
			reporter: ['cobertura', 'text'],
		},
		/* for example, use global to avoid globals imports (describe, test, expect): */
		// globals: true,
	},
});
