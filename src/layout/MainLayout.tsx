import React from 'react';
import NavigationMenu from '../components/NavigationMenu/NavigationMenu';
import TopMenu from '../components/TopMenu/TopMenu';
import './MainLayout.scss';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <TopMenu />
      </header>

      <div className="main-layout__container">
        <aside className="main-layout__aside">
          <NavigationMenu />
        </aside>

        <main className="main-layout__main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
