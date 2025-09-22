
import { useState, useCallback } from 'react';

export const useNetworkStatus = (initialState = true) => {
  const [isOnline, setIsOnline] = useState(initialState);

  const toggleNetworkStatus = useCallback(() => {
    setIsOnline(prev => !prev);
  }, []);

  return { isOnline, toggleNetworkStatus };
};
