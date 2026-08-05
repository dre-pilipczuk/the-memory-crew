/**
 * Public config barrel — import from `../config` or `../../config`.
 */
export { site } from './site';
export type { SiteConfig } from './site';

export { paths, withBase } from './routes';

export {
	hireCategories,
	hireCategorySlugs,
	getHireCategory,
	isHireCategorySlug,
} from './hire';
export type { HireCategory, HireCategorySlug } from './hire';

export {
	occasions,
	occasionSlugs,
	getOccasion,
	isOccasionSlug,
} from './occasions';
export type { Occasion, OccasionSlug } from './occasions';

export {
	primaryNav,
	primaryCta,
	footerNav,
	isNavGroup,
} from './navigation';
export type { NavLink, NavGroup, NavItem, FooterColumn } from './navigation';
