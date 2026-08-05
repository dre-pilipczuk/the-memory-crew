/**
 * Content query helpers — filter drafts, sort, map to routes.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { paths } from '../config/routes';
import type { HireCategorySlug } from '../config/hire';

export type EquipmentEntry = CollectionEntry<'equipment'>;
export type OccasionEntry = CollectionEntry<'occasions'>;
export type FaqEntry = CollectionEntry<'faq'>;

function isPublished<T extends { data: { draft?: boolean } }>(entry: T): boolean {
	if (import.meta.env.PROD) {
		return entry.data.draft !== true;
	}
	return true;
}

function byOrderThenTitle<
	T extends { data: { order?: number; title?: string; question?: string } },
>(a: T, b: T): number {
	const orderA = a.data.order ?? 100;
	const orderB = b.data.order ?? 100;
	if (orderA !== orderB) return orderA - orderB;
	const labelA = a.data.title ?? a.data.question ?? '';
	const labelB = b.data.title ?? b.data.question ?? '';
	return labelA.localeCompare(labelB, 'en-GB');
}

/** Site path for an equipment entry (no base prefix). */
export function equipmentPath(entry: EquipmentEntry): string {
	return paths.equipment(entry.data.category, entry.id);
}

/** Site path for an occasion entry (no base prefix). */
export function occasionPath(entry: OccasionEntry): string {
	return paths.occasion(entry.id);
}

export async function getAllEquipment(): Promise<EquipmentEntry[]> {
	const entries = await getCollection('equipment', isPublished);
	return entries.sort(byOrderThenTitle);
}

export async function getFeaturedEquipment(): Promise<EquipmentEntry[]> {
	const entries = await getAllEquipment();
	return entries.filter((e) => e.data.featured);
}

export async function getEquipmentByCategory(
	category: HireCategorySlug,
): Promise<EquipmentEntry[]> {
	const entries = await getAllEquipment();
	return entries.filter((e) => e.data.category === category);
}

export async function getAllOccasions(): Promise<OccasionEntry[]> {
	const entries = await getCollection('occasions', isPublished);
	return entries.sort(byOrderThenTitle);
}

export async function getFeaturedOccasions(): Promise<OccasionEntry[]> {
	const entries = await getAllOccasions();
	return entries.filter((e) => e.data.featured);
}

export async function getAllFaq(): Promise<FaqEntry[]> {
	const entries = await getCollection('faq', isPublished);
	return entries.sort(byOrderThenTitle);
}

export async function getFaqByGroup(
	group: FaqEntry['data']['group'],
): Promise<FaqEntry[]> {
	const entries = await getAllFaq();
	return entries.filter((e) => e.data.group === group);
}
