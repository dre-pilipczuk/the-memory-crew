/**
 * Brand logo — locked.
 * Polaroid frame + signature caption (md/lg) + slight tilt.
 * Small sizes: frame only, no squiggle, no tilt.
 *
 * @see src/components/brand/Logo.astro
 * @see docs/brand-logo.md
 */
import type { LogoVariant } from '../components/brand/Logo.astro';

/** Site-wide logo (navbar, footer, wordmark alias) */
export const logoVariant: LogoVariant = 'lockup-polaroid';

/** Primary lockup + mark-only (favicon uses public/favicon.svg) */
export const logoOptions: {
	id: LogoVariant;
	title: string;
	description: string;
}[] = [
	{
		id: 'lockup-polaroid',
		title: 'Primary lockup',
		description:
			'Polaroid mark + stacked wordmark. Caption squiggle and tilt on md/lg only.',
	},
	{
		id: 'mark-polaroid',
		title: 'Mark only',
		description: 'Icon alone — same rules for squiggle/tilt by size.',
	},
];
