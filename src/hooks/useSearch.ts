// src/hooks/useSearch.ts
import { useState } from 'react';
import { apiClient } from '@/utils/api';
import { Service } from '@/types/api';

interface SearchParams {
  service_name?: string;
  location_id?: string;
  price_range?: string;
  review_score?: number[];
  orderby?: string;
  limit?: number;
}

export const useSearch = () => {
  const [results, setResults] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (type: string, params: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Service[]>(`api/${type}/search`, params);
      if (response.data) {
        setResults(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};