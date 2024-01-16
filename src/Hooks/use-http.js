import { useState, useCallback } from 'react';
import Cookies from 'universal-cookie'

const useHttp = () => {
  const cookies = new Cookies()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let token=cookies?.get('hr_head_token')

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {"Authorization":"Bearer "+token},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;