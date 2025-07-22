import { useState, useEffect } from 'react';

export const useSessionStats = () => {
  const [activeSessions, setActiveSessions] = useState(1 + Math.floor(Math.random() * 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSessions(1 + Math.floor(Math.random() * 5));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { activeSessions };
};