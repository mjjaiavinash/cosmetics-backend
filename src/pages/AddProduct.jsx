import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "skincare"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill all required fields");
      return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: parseInt(formData.price),
      image: formData.image,
      category: formData.category
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    
    alert("Product added successfully!");
    navigate("/admin");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Add New Product</h1>
          <p>Create a new product for your store</p>
        </div>

        <div className="form-container-admin">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL (e.g., images/product.jpg)"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="skincare">Skin Care</option>
                <option value="makeup">Makeup</option>
                <option value="haircare">Hair Care</option>
                <option value="perfume">Perfume</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Add Product</button>
              <button type="button" onClick={() => navigate("/admin")} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;