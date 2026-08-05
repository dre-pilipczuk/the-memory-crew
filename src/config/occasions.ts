/**
 * Occasion taxonomy — event contexts for SEO and cross-linking equipment.
 */
export const occasions = [
	{
		title: 'Weddings',
		slug: 'weddings',
		description: 'Garden games, photo moments, and dance floors for the big day.',
	},
	{
		title: 'Birthdays',
		slug: 'birthdays',
		description: 'Fun for every age — from kids’ parties to milestone celebrations.',
	},
	{
		title: 'Corporate',
		slug: 'corporate',
		description: 'Team days, launches, and client events that people actually enjoy.',
	},
	{
		title: 'Schools',
		slug: 'schools',
		description: 'Fairs, proms, and end-of-term events built for busy sites.',
	},
	{
		title: 'Christmas',
		slug: 'christmas',
		description: 'Seasonal hire that turns winter gatherings into memories.',
	},
] as const;

export type OccasionSlug = (typeof occasions)[number]['slug'];
export type Occasion = (typeof occasions)[number];

const bySlug = Object.fromEntries(occasions.map((o) => [o.slug, o])) as Record<
	OccasionSlug,
	Occasion
>;

export function getOccasion(slug: string): Occasion | undefined {
	return bySlug[slug as OccasionSlug];
}

export function isOccasionSlug(slug: string): slug is OccasionSlug {
	return slug in bySlug;
}

export const occasionSlugs = occasions.map((o) => o.slug);
