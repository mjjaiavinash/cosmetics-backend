import { Link, useLocation } from "react-router-dom";

function AdminNavbar() {
  const location = useLocation();

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-brand">
        <h2>🛠️ Admin Dashboard</h2>
        <span className="admin-subtitle">Cosmetics Store Management</span>
      </div>
      
      <div className="admin-nav-links">
        <Link 
          to="/admin" 
          className={location.pathname === "/admin" ? "admin-nav-link active" : "admin-nav-link"}
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/admin/add-product" 
          className={location.pathname === "/admin/add-product" ? "admin-nav-link active" : "admin-nav-link"}
        >
          ➕ Add Product
        </Link>
        <Link 
          to="/admin/products" 
          className={location.pathname === "/admin/products" ? "admin-nav-link active" : "admin-nav-link"}
        >
          📦 Products
        </Link>
      </div>

      <div className="admin-nav-actions">
        <Link to="/" className="back-to-site-btn">
          🏠 Back to Site
        </Link>
      </div>
    </nav>
  );
}

export default AdminNavbar;