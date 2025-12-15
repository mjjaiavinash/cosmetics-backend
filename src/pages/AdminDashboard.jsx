import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const totalRevenue = products.reduce((sum, product) => sum + product.price, 0);
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your cosmetics store</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Products</h3>
            <div className="stat-number">{products.length}</div>
          </div>
          <div className="stat-card">
            <h3>Categories</h3>
            <div className="stat-number">{categories.length}</div>
          </div>
          <div className="stat-card">
            <h3>Total Value</h3>
            <div className="stat-number">₹{totalRevenue}</div>
          </div>
          <div className="stat-card">
            <h3>Avg Price</h3>
            <div className="stat-number">₹{products.length ? Math.round(totalRevenue / products.length) : 0}</div>
          </div>
        </div>

        <div className="recent-products">
          <h2>Recent Products</h2>
          <div className="product-grid">
            {products.slice(-6).map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <span className="category-tag">{product.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;