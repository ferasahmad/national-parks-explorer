import { useInfiniteQuery } from '@tanstack/react-query';
import { getParks } from '../../api/nps';
import { Park } from '../../api/types';

interface UseParksProps {
  search?: string;
  stateCode?: string;
}

export function useParks({ search, stateCode }: UseParksProps = {}) {
  const limit = 20;

  const query = useInfiniteQuery({
    queryKey: ['parks', { search, stateCode }],
    queryFn: async ({ pageParam = 0 }) => {
      return getParks({
        q: search,
        stateCode: stateCode,
        start: pageParam,
        limit,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const total = parseInt(lastPage.total, 10);
      const start = parseInt(lastPage.start, 10);
      const currentLimit = parseInt(lastPage.limit, 10);

      const nextStart = start + currentLimit;
      
      if (nextStart < total) {
        return nextStart;
      }
      
      return undefined;
    },
  });

  // Flatten the pages array into a single array of parks for easier consumption
  const parks: Park[] = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    ...query,
    parks,
  };
}
