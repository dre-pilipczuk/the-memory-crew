// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Project site on GitHub Pages until a custom domain is connected.
export default defineConfig({
	site: 'https://dre-pilipczuk.github.io/the-memory-crew',
	base: '/the-memory-crew',
	integrations: [
		sitemap({
			filter: (page) => !page.includes('/design-system'),
		}),
	],
	image: {
		// Prefer modern formats in <Image /> / content images
		domains: [],
	},
});
