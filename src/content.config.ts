/**
 * Content collections — equipment catalogue, occasions, FAQ.
 * @see docs/site-architecture.md
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { hireCategories } from './config/hire';
import type { HireCategorySlug } from './config/hire';

const hireCategorySlugTuple = hireCategories.map((c) => c.slug) as [
	HireCategorySlug,
	...HireCategorySlug[],
];

const imageSourceSchema = z.enum(['ai', 'photo', 'placeholder']).default('placeholder');

const equipment = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/equipment' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			/** Short card / meta description */
			description: z.string(),
			category: z.enum(hireCategorySlugTuple),
			/** Guide price in GBP; omit if POA */
			priceFrom: z.number().nonnegative().optional(),
			featured: z.boolean().default(false),
			/** Sort order within category (lower first) */
			order: z.number().int().optional(),
			/** Local asset via Astro image() — prefer src/assets */
			image: image().optional(),
			imageSource: imageSourceSchema,
			/** Occasion slugs this kit suits (cross-links) */
			suitableFor: z.array(z.string()).default([]),
			whatsIncluded: z.array(z.string()).default([]),
			/** Hide from production listings when true */
			draft: z.boolean().default(false),
		}),
});

const occasions = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/occasions' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			featured: z.boolean().default(false),
			order: z.number().int().optional(),
			image: image().optional(),
			imageSource: imageSourceSchema,
			/** Hire category slugs to feature on this occasion page */
			recommendedCategories: z.array(z.enum(hireCategorySlugTuple)).default([]),
			/** Equipment entry ids (filename slugs) to feature */
			recommendedEquipment: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

const faq = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
	schema: z.object({
		question: z.string(),
		/** Grouping for FAQ page sections */
		group: z
			.enum(['booking', 'delivery', 'setup', 'pricing', 'general'])
			.default('general'),
		order: z.number().int().default(0),
		draft: z.boolean().default(false),
	}),
});

export const collections = { equipment, occasions, faq };
