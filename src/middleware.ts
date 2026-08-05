/**
 * Redirect leftover /the-memory-crew/* URLs (old GitHub project base)
 * to the site root so local bookmarks and old links still work.
 */
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname, search } = context.url;
	const prefix = '/the-memory-crew';

	if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
		const rest = pathname.slice(prefix.length) || '/';
		const target = rest.endsWith('/') || rest.includes('.') ? rest : `${rest}/`;
		return context.redirect(`${target}${search}`, 301);
	}

	return next();
});
