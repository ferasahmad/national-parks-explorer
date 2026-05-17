import { fetchNPS } from './client';
import { NPSResponse, Park } from './types';

interface GetParksParams {
  q?: string;
  stateCode?: string;
  parkCode?: string;
  start?: number;
  limit?: number;
}

export async function getParks(
  params: GetParksParams,
): Promise<NPSResponse<Park>> {
  return fetchNPS<NPSResponse<Park>>(
    '/parks',
    params as Record<string, string | number>,
  );
}

export async function getParkByCode(parkCode: string): Promise<Park> {
  const response = await fetchNPS<NPSResponse<Park>>('/parks', { parkCode });

  if (!response.data || response.data.length === 0) {
    throw new Error(`Park with code ${parkCode} not found`);
  }

  return response.data[0];
}
