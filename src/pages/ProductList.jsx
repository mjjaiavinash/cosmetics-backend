import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    return filtered;
  }, [products, searchTerm, categoryFilter]);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Product List</h1>
          <p>Manage all your products</p>
          <Link to="/admin/add-product" className="btn-primary">Add New Product</Link>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-filter"
          >
            <option value="all">All Categories</option>
            <option value="skincare">Skin Care</option>
            <option value="makeup">Makeup</option>
            <option value="haircare">Hair Care</option>
            <option value="perfume">Perfume</option>
          </select>
        </div>

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/edit-product/${product.id}`} className="btn-edit">
                        Edit
                      </Link>
                      <Link to={`/admin/delete-product/${product.id}`} className="btn-delete">
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found.</p>
              <Link to="/admin/add-product" className="btn-primary">Add Your First Product</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;