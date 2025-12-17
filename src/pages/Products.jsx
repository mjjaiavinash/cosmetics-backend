import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import Navbar from "../components/Navbar";

function Products() {
  const { products } = useAdmin();
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // If exists, increase quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // If new, add with quantity 1
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <Navbar />

      <section className="products" id="skincare">
        <h2>Skin Care Products</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "skincare").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="makeup">
        <h2>Makeup Products</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "makeup").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="haircare">
        <h2>Hair Care Products</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "haircare").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="perfume">
        <h2>Perfume Collection</h2>
        <div className="product-box">
          {displayProducts.filter(p => p.category === "perfume").map((product) => (
            <div key={product._id || product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h3>{product.name} - ₹{product.price}</h3>
              <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2025 Cosmetics Store. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Products;