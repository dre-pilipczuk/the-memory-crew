// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Custom domain serves the site at the domain root (not /the-memory-crew).
// https://docs.astro.build/en/guides/deploy/github/#github-pages-with-a-custom-domain
export default defineConfig({
	site: 'https://thememorycrew.com',
	base: '/',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => !page.includes('/design-system'),
		}),
	],
	image: {
		domains: [],
	},
});
