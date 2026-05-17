import { useQuery } from '@tanstack/react-query';
import { getParks } from '../../api/nps';
import { Park } from '../../api/types';

interface UseParksProps {
  search?: string;
  stateCode?: string;
  parkCode?: string;
  enabled?: boolean;
}

export function useParks({
  search,
  stateCode,
  parkCode,
  enabled = true,
}: UseParksProps = {}) {
  const query = useQuery({
    queryKey: ['parks', { search, stateCode, parkCode }],
    queryFn: async () => {
      return getParks({
        q: search,
        stateCode: stateCode,
        parkCode,
        start: 0,
        limit: 1000,
      });
    },
    enabled,
  });

  const parks: Park[] = query.data?.data ?? [];

  return {
    ...query,
    parks,
  };
}
