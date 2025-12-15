import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      alert("Admin Login Successful!");
    } else {
      alert("Invalid Admin Credentials!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    setUsername("");
    setPassword("");
  };

  // Check if already logged in
  useState(() => {
    const adminStatus = localStorage.getItem("adminLoggedIn");
    if (adminStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="auth-layout">
        <div className="auth-side-image">
          <div className="auth-side-content">
            <h2>🔧 Admin Portal</h2>
            <p>Secure access to store management and product control.</p>
          </div>
        </div>
        
        <div className="auth-form-side">
          <div className="form-container compact">
            <h2 className="form-title">Admin Login</h2>

            <form onSubmit={handleLogin}>
            
            <div className="input-group">
              <label>Admin Username:</label>
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Admin Password:</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  👁️
                </span>
              </div>
            </div>

            <button type="submit" className="submit-btn login-btn">
              Access Admin Portal
            </button>

            <p className="small-text">
              <a href="/" onClick={() => navigate("/")}>← Back to Store</a>
            </p>
          </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-layout">
      <div className="admin-portal-header">
        <div className="admin-portal-nav">
          <h1>🔧 Admin Portal</h1>
          <div className="admin-nav-actions">
            <button onClick={() => navigate("/admin")} className="admin-dashboard-btn">
              Dashboard
            </button>
            <button onClick={() => navigate("/admin/products")} className="admin-products-btn">
              Products
            </button>
            <button onClick={() => navigate("/admin/add-product")} className="admin-add-btn">
              Add Product
            </button>
            <button onClick={handleLogout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-portal-content">
        <div className="admin-welcome">
          <h2>Welcome to Admin Portal</h2>
          <p>Manage your cosmetics store from here</p>
          
          <div className="admin-quick-actions">
            <div className="admin-action-card" onClick={() => navigate("/admin")}>
              <h3>📊 Dashboard</h3>
              <p>View store statistics and overview</p>
            </div>
            
            <div className="admin-action-card" onClick={() => navigate("/admin/products")}>
              <h3>📦 Manage Products</h3>
              <p>View, edit, and delete products</p>
            </div>
            
            <div className="admin-action-card" onClick={() => navigate("/admin/add-product")}>
              <h3>➕ Add Product</h3>
              <p>Add new products to your store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPortal;