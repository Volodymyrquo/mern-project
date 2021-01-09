import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = 'GET',
      mode,
      body = null,
      headers = { 'Access-Control-Allow-Origin': '*' }
    ) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          mode,
          body,
          headers,
        });
        const data = await response.json;
        if (!response.ok) {
          throw new Error(data.message || 'Something go wrong !');
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );
  const clearError = () => setError(null);
  return { loading, request, error, clearError };
};
