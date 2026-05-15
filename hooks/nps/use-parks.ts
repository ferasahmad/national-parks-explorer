import { useQuery } from "@tanstack/react-query";
import { getParks } from "../../api/nps";
import { Park } from "../../api/types";

interface UseParksProps {
  search?: string;
  stateCode?: string;
}

export function useParks({ search, stateCode }: UseParksProps = {}) {
  const limit = 1000;

  const query = useQuery({
    queryKey: ["parks", { search, stateCode }],
    queryFn: async () => {
      return getParks({
        q: search,
        stateCode: stateCode,
        start: 0,
        limit,
      });
    },
  });

  const parks: Park[] = query.data?.data ?? [];

  return {
    ...query,
    parks,
  };
}
