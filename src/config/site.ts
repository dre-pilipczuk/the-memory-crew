/**
 * Site-wide brand and business configuration.
 * Single source of truth for name, tagline, service area, and nav later.
 */
export const site = {
	name: 'The Memory Crew',
	tagline: 'Bringing people together for memories that last',
	taglineShort: 'Gather. Play. Remember.',
	description:
		'Event hire across South Wales and Bristol — photo booths, garden games, and more that get every generation involved.',
	serviceArea: ['South Wales', 'Bristol'] as const,
	serviceAreaLabel: 'South Wales and Bristol',
	/** Set when custom domain is live; used for canonical/OG later */
	url: 'https://dre-pilipczuk.github.io/the-memory-crew',
	email: '', // Phase 8
	phone: '', // Phase 8
} as const;

export type SiteConfig = typeof site;
