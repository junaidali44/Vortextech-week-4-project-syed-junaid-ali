import { useState, useEffect, useCallback } from 'react';
import { tmdb } from '../api/tmdb';

export const useFetch = (endpoint, params = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await tmdb.get(endpoint, { params });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.status_message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;