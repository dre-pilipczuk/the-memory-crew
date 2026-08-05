/**
 * Structured data helpers (JSON-LD).
 */
import { site } from '../config/site';
import type { Crumb } from '../components/common/Breadcrumb.astro';

const siteOrigin = site.url.replace(/\/$/, '');

function absoluteUrl(path: string): string {
	if (!path || path === '/') return `${siteOrigin}/`;
	const normalised = path.startsWith('/') ? path : `/${path}`;
	return `${siteOrigin}${normalised}`;
}

/** LocalBusiness / event hire business entity */
export function localBusinessJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: site.name,
		description: site.description,
		url: `${siteOrigin}/`,
		areaServed: site.serviceArea.map((name) => ({
			'@type': 'AdministrativeArea',
			name,
		})),
		image: `${siteOrigin}/og-default.png`,
		priceRange: '££',
		...(site.email ? { email: site.email } : {}),
		...(site.phone ? { telephone: site.phone } : {}),
	};
}

/** BreadcrumbList from the same crumbs used in the UI */
export function breadcrumbJsonLd(items: Crumb[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.label,
			...(item.href
				? { item: absoluteUrl(item.href === '/' ? '/' : item.href) }
				: index === items.length - 1
					? {}
					: {}),
		})),
	};
}

/** Product-ish offer for equipment pages */
export function equipmentJsonLd(options: {
	name: string;
	description: string;
	path: string;
	priceFrom?: number;
	image?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: options.name,
		description: options.description,
		url: absoluteUrl(options.path),
		brand: {
			'@type': 'Brand',
			name: site.name,
		},
		...(options.image ? { image: options.image } : {}),
		...(options.priceFrom != null
			? {
					offers: {
						'@type': 'Offer',
						priceCurrency: 'GBP',
						price: options.priceFrom,
						availability: 'https://schema.org/InStock',
						url: absoluteUrl(options.path),
					},
				}
			: {}),
	};
}
