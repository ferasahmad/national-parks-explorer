const API_KEY = 'DLePRuHlvNOL0Qn50UTyc1pOyZ6CB9FbnkhSB3hT';
const BASE_URL = 'https://developer.nps.gov/api/v1';

export async function fetchNPS<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.append('api_key', API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`NPS API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data as T;
}
