import { useQuery } from '@tanstack/react-query';
import { getParksByCodes } from '../api/nps';

export function useSavedParks(savedParkCodes: string[]) {
  return useQuery({
    queryKey: ['savedParks', savedParkCodes],
    queryFn: () => {
      if (savedParkCodes.length === 0) {
        return [];
      }

      return getParksByCodes(savedParkCodes);
    },
    enabled: savedParkCodes.length > 0,
    initialData: savedParkCodes.length === 0 ? [] : undefined,
  });
}
