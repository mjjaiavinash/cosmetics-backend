import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "skincare"
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === parseInt(id));
    
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        image: product.image,
        category: product.category
      });
    } else {
      alert("Product not found!");
      navigate("/admin/products");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill all required fields");
      return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = products.map(product => 
      product.id === parseInt(id) 
        ? {
            ...product,
            name: formData.name,
            price: parseInt(formData.price),
            image: formData.image,
            category: formData.category
          }
        : product
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    
    alert("Product updated successfully!");
    navigate("/admin/products");
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
          <h1>Edit Product</h1>
          <p>Update product information</p>
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
              <button type="submit" className="btn-primary">Update Product</button>
              <button type="button" onClick={() => navigate("/admin/products")} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;