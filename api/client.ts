import { QueryClient } from '@tanstack/react-query';

// Shared QueryClient instance for the entire app
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const API_KEY = 'DLePRuHlvNOL0Qn50UTyc1pOyZ6CB9FbnkhSB3hT';
const BASE_URL = 'https://developer.nps.gov/api/v1';

export async function fetchNPS<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // Attach API key
  url.searchParams.append('api_key', API_KEY);
  
  // Attach query parameters
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
