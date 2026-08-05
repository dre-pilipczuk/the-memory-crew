/**
 * Site-relative path builders and base-aware URLs.
 * Path helpers return paths starting with `/` (no base prefix).
 * Use withBase() when emitting hrefs in components.
 * trailingSlash: 'always' — directory URLs end with `/` for GitHub Pages.
 */

/** Join base with a site path; always trailing slash for app routes. */
export function withBase(path = '/'): string {
	const base = import.meta.env.BASE_URL || '/';
	// BASE_URL is `/` or `/repo/`
	const normalisedBase = base.endsWith('/') ? base : `${base}/`;

	if (!path || path === '/') {
		return normalisedBase;
	}

	const stripped = path.replace(/^\/+/, '').replace(/\/+$/, '');
	return `${normalisedBase}${stripped}/`;
}

export const paths = {
	home: '/',
	hire: '/hire',
	hireCategory: (category: string) => `/hire/${category}`,
	equipment: (category: string, slug: string) => `/hire/${category}/${slug}`,
	occasions: '/occasions',
	occasion: (slug: string) => `/occasions/${slug}`,
	gallery: '/gallery',
	about: '/about',
	faq: '/faq',
	contact: '/contact',
	/** Internal — do not add to public nav */
	designSystem: '/design-system',
} as const;

export type SitePath = (typeof paths)[keyof typeof paths];
