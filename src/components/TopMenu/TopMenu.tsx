'use client';

import { useEffect, useState } from 'react';
import { useSessionStats } from '../../hooks/useSessionStats';
import './TopMenu.scss';
import dayjs from 'dayjs';

const TopMenu = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const { activeSessions } = useSessionStats();

  useEffect(() => {
    const updateTime = () => setCurrentTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed-top bg-white shadow border-bottom ">
      <div
        className="container-fluid d-flex justify-content-between align-items-center px-4 top-menu-header"
      >
        <h5 className="m-0 fw-semibold">Orders & Products</h5>

        <div className="d-flex align-items-center gap-3">
          {currentTime && (
            <span className="text-muted">{currentTime}</span>
          )}
          <span className="badge bg-primary">Active: {activeSessions}</span>
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
