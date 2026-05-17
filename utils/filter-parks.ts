import { type Park } from '@/api/types';

export function filterParksByState(
  parks: Park[],
  selectedCodes: string[],
): Park[] {
  if (selectedCodes.length === 0) return parks;

  const selected = new Set(selectedCodes);

  return parks.filter((park) =>
    park.states.split(',').some((code) => selected.has(code.trim())),
  );
}

export function filterParksBySearch(parks: Park[], query: string): Park[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return parks;

  const terms = normalized.split(/\s+/);

  return parks.filter((park) => {
    const haystack = [park.fullName, park.states].join(' ').toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}
