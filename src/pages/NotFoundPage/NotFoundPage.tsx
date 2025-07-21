import { Link } from 'react-router-dom';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import TopMenu from '../../components/TopMenu/TopMenu';

const NotFoundPage = () => {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <TopMenu />
      </header>

      <div className="main-layout__container d-flex">
        <aside className="main-layout__aside">
          <NavigationMenu />
        </aside>

        <main className="main-layout__main w-100">
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <h1 className="display-1 text-danger">404</h1>
            <p className="fs-4 mb-4 text-muted">Page not found</p>
            <Link to="/products" className="btn btn-primary">
              Go to Products
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
