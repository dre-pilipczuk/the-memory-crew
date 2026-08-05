/**
 * Site-wide brand and business configuration.
 * Navigation and taxonomies live in navigation.ts, hire.ts, occasions.ts.
 * @see docs/site-architecture.md
 */
export const site = {
	name: 'The Memory Crew',
	tagline: 'Bringing people together for memories that last',
	taglineShort: 'Gather. Play. Remember.',
	description:
		'Event hire across South Wales and Bristol — photo booths, garden games, and more that get every generation involved.',
	serviceArea: ['South Wales', 'Bristol'] as const,
	serviceAreaLabel: 'South Wales and Bristol',
	/** Deployed site origin (no trailing slash). Update when custom domain is live. */
	url: 'https://dre-pilipczuk.github.io/the-memory-crew',
	email: '', // Phase 8
	phone: '', // Phase 8
} as const;

export type SiteConfig = typeof site;
