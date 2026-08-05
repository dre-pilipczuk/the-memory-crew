/**
 * Site-relative path builders and base-aware URLs.
 * Path helpers return paths starting with `/` (no base prefix).
 * Use withBase() when emitting hrefs in components.
 */

/** Join base (e.g. `/the-memory-crew/`) with a site path (`/hire`). */
export function withBase(path = '/'): string {
	const base = import.meta.env.BASE_URL || '/';
	const normalisedBase = base.endsWith('/') ? base.slice(0, -1) : base;
	if (!path || path === '/') {
		return `${normalisedBase}/`;
	}
	const normalisedPath = path.startsWith('/') ? path : `/${path}`;
	return `${normalisedBase}${normalisedPath}`;
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
