/**
 * Hire category taxonomy — stable slugs power URLs and content frontmatter.
 * Display titles may change; slugs should not.
 */
export const hireCategories = [
	{
		title: 'Photo Booths',
		slug: 'photo-booths',
		description: 'Classic and mirror booths that get every guest in the frame.',
	},
	{
		title: 'Crazy Golf',
		slug: 'crazy-golf',
		description: 'Playful mini-golf for gardens, venues, and team days.',
	},
	{
		title: 'Garden Games',
		slug: 'garden-games',
		description: 'Giant favourites that bring all ages onto the lawn.',
	},
	{
		title: 'Giant LED Letters',
		slug: 'giant-led-letters',
		description: 'Light-up letters and numbers for unforgettable photos.',
	},
	{
		title: 'Dance Floors',
		slug: 'dance-floors',
		description: 'Floors that turn any space into the party.',
	},
	{
		title: 'Gazebos',
		slug: 'gazebos',
		description: 'Cover and structure for outdoor celebrations.',
	},
] as const;

export type HireCategorySlug = (typeof hireCategories)[number]['slug'];
export type HireCategory = (typeof hireCategories)[number];

const bySlug = Object.fromEntries(hireCategories.map((c) => [c.slug, c])) as Record<
	HireCategorySlug,
	HireCategory
>;

export function getHireCategory(slug: string): HireCategory | undefined {
	return bySlug[slug as HireCategorySlug];
}

export function isHireCategorySlug(slug: string): slug is HireCategorySlug {
	return slug in bySlug;
}

export const hireCategorySlugs = hireCategories.map((c) => c.slug);
