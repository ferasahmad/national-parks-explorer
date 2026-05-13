import { useQuery } from '@tanstack/react-query';
import { getParkByCode } from '../api/nps';

export function useParkDetail(parkCode: string | undefined) {
  return useQuery({
    queryKey: ['park', parkCode],
    queryFn: () => {
      if (!parkCode) {
        throw new Error('parkCode is required');
      }

      return getParkByCode(parkCode);
    },
    enabled: !!parkCode,
  });
}
