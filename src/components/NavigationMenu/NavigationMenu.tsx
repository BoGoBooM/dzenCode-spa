import { NavLink } from 'react-router-dom';
import './NavigationMenu.scss';

const NavigationMenu = () => {
  return (
    <nav className="navigation-menu">
      <ul className="nav flex-column px-3">
        <li className="nav-item mb-2">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active fw-semibold text-primary' : 'text-dark'}`
            }
          >
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active fw-semibold text-primary' : 'text-dark'}`
            }
          >
            Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
