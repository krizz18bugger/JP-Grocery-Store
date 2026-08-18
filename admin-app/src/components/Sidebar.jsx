import { NavLink } from 'react-router-dom';
import { Home, Package, ShoppingCart, LogOut, Leaf } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import './Sidebar.css';

const NAV = [
  { to: '/',         label: 'Dashboard', icon: Home        },
  { to: '/products', label: 'Products',  icon: Package     },
  { to: '/orders',   label: 'Orders',    icon: ShoppingCart },
];

const Sidebar = () => {
  const { adminUser, logout } = useAdminAuth();

  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <Leaf size={18} strokeWidth={2.5} />
        </div>
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">JP Farm</span>
          <span className="sidebar__brand-sub">Admin</span>
        </div>
      </div>

      {/* User pill */}
      {adminUser && (
        <div className="sidebar__user">
          <div className="sidebar__user-avatar">
            {adminUser.name?.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">{adminUser.name}</p>
            <p className="sidebar__user-role">Administrator</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sidebar__nav">
        <p className="sidebar__nav-label">MENU</p>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button className="sidebar__logout" onClick={logout}>
        <LogOut size={16} strokeWidth={2} />
        <span>Logout</span>
      </button>

    </aside>
  );
};

export default Sidebar;
