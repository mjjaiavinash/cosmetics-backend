import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      alert("Product not found!");
      navigate("/admin/products");
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = products.filter(p => p.id !== parseInt(id));
    
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    
    alert("Product deleted successfully!");
    navigate("/admin/products");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Delete Product</h1>
          <p>Are you sure you want to delete this product?</p>
        </div>

        <div className="delete-confirmation">
          <div className="product-preview">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="category">{product.category}</p>
            </div>
          </div>

          <div className="warning-message">
            <h3>⚠️ Warning</h3>
            <p>This action cannot be undone. The product will be permanently removed from your store.</p>
          </div>

          <div className="form-actions">
            <button onClick={handleDelete} className="btn-danger">
              Yes, Delete Product
            </button>
            <button onClick={() => navigate("/admin/products")} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;