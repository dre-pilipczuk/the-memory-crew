/**
 * Primary and footer navigation trees.
 * Href values are site paths (no base); apply withBase() when rendering.
 */
import { hireCategories } from './hire';
import { occasions } from './occasions';
import { paths } from './routes';

export type NavLink = {
	label: string;
	href: string;
};

export type NavGroup = {
	label: string;
	href: string;
	children: readonly NavLink[];
};

export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
	return 'children' in item;
}

/** Main header navigation (Contact rendered as CTA separately if desired). */
export const primaryNav: readonly NavItem[] = [
	{
		label: 'Hire',
		href: paths.hire,
		children: hireCategories.map((c) => ({
			label: c.title,
			href: paths.hireCategory(c.slug),
		})),
	},
	{
		label: 'Occasions',
		href: paths.occasions,
		children: occasions.map((o) => ({
			label: o.title,
			href: paths.occasion(o.slug),
		})),
	},
	{ label: 'Gallery', href: paths.gallery },
	{ label: 'About', href: paths.about },
	{ label: 'FAQ', href: paths.faq },
	{ label: 'Contact', href: paths.contact },
] as const;

/** Emphasise in header as button-style CTA. */
export const primaryCta: NavLink = {
	label: 'Contact',
	href: paths.contact,
};

export type FooterColumn = {
	title: string;
	links: readonly NavLink[];
};

export const footerNav: readonly FooterColumn[] = [
	{
		title: 'Hire',
		links: [
			{ label: 'All hire', href: paths.hire },
			...hireCategories.map((c) => ({
				label: c.title,
				href: paths.hireCategory(c.slug),
			})),
		],
	},
	{
		title: 'Occasions',
		links: [
			{ label: 'All occasions', href: paths.occasions },
			...occasions.map((o) => ({
				label: o.title,
				href: paths.occasion(o.slug),
			})),
		],
	},
	{
		title: 'Company',
		links: [
			{ label: 'Gallery', href: paths.gallery },
			{ label: 'About', href: paths.about },
			{ label: 'FAQ', href: paths.faq },
			{ label: 'Contact', href: paths.contact },
		],
	},
] as const;
