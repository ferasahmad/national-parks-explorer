import { type Park } from '@/api/types';
import { US_STATES, type UsState } from '@/constants/us-states';

export function getStatesForFilter(parks: Park[]): UsState[] {
  const codes = new Set(
    parks.flatMap((park) =>
      park.states.split(',').map((code) => code.trim()),
    ),
  );

  return US_STATES.filter((state) => codes.has(state.code)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}
