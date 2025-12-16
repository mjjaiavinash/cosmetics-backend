import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/categories', label: 'Categories', icon: '📂' },
    { path: '/admin/orders', label: 'Orders', icon: '🛒' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-layout-horizontal">
      <nav className="admin-navbar-horizontal">
        <div className="admin-brand">
          <h2>Admin Panel</h2>
        </div>
        
        <div className="nav-items-horizontal">
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-item-horizontal ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="nav-actions-horizontal">
          <Link to="/" className="nav-item-horizontal">
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Back to Site</span>
          </Link>
          
          <button onClick={handleLogout} className="nav-item-horizontal logout-btn-horizontal">
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Log Out</span>
          </button>
        </div>
      </nav>

      <div className="admin-content-horizontal">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;