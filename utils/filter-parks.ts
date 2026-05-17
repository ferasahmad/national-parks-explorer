import { type Park } from '@/api/types';

export function filterParksBySearch(parks: Park[], query: string): Park[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return parks;

  const terms = normalized.split(/\s+/);

  return parks.filter((park) => {
    const haystack = [park.fullName, park.states].join(' ').toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}
