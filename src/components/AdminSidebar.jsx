import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button 
        className="admin-hamburger" 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>
      
      <div className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="admin-brand">
          <h2>🛠️ Admin Panel</h2>
          <p>Cosmetics Store</p>
        </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h4>Main</h4>
          <Link 
            to="/admin" 
            className={location.pathname === "/admin" ? "nav-link active" : "nav-link"}
            onClick={() => setIsMobileOpen(false)}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </Link>
        </div>
        
        <div className="nav-section">
          <h4>Products</h4>
          <Link 
            to="/admin/add-product" 
            className={location.pathname === "/admin/add-product" ? "nav-link active" : "nav-link"}
            onClick={() => setIsMobileOpen(false)}
          >
            <span className="nav-icon">➕</span>
            <span className="nav-text">Add Product</span>
          </Link>
          <Link 
            to="/admin/products" 
            className={location.pathname === "/admin/products" ? "nav-link active" : "nav-link"}
            onClick={() => setIsMobileOpen(false)}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Product List</span>
          </Link>
        </div>
        
        <div className="nav-section">
          <Link to="/" className="back-to-site" onClick={() => setIsMobileOpen(false)}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Back to Site</span>
          </Link>
        </div>
      </nav>
      </div>
    </>
  );
}

export default AdminSidebar;