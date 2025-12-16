import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import Navbar from "../components/Navbar";

function Products() {
  const { products } = useAdmin();
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setDisplayProducts(products);
    } else {
      // Default products if none exist
      const defaultProducts = [
        { id: 1, name: "Glow Face Cream", price: 599, image: "images/face-cream.webp", category: "skincare", stock: 25 },
        { id: 2, name: "Moisturizer", price: 399, image: "images/moisturizer.webp", category: "skincare", stock: 30 },
        { id: 3, name: "Vitamin C Serum", price: 799, image: "images/serum.jpg", category: "skincare", stock: 15 },
        { id: 4, name: "Sunscreen SPF", price: 299, image: "images/sunscreen.webp", category: "skincare", stock: 40 },
        { id: 5, name: "Face Wash", price: 199, image: "images/facewash.webp", category: "skincare", stock: 50 },
        { id: 6, name: "Night Cream", price: 699, image: "images/nightcream.jpg", category: "skincare", stock: 20 },
        { id: 7, name: "Liquid Foundation", price: 299, image: "images/liquid.jpg", category: "makeup", stock: 35 },
        { id: 8, name: "Mascara", price: 399, image: "images/mascara.webp", category: "makeup", stock: 45 },
        { id: 9, name: "Eyeliner", price: 99, image: "images/eyeliner.webp", category: "makeup", stock: 60 },
        { id: 10, name: "Compact Powder", price: 499, image: "images/compact-powder.jpg", category: "makeup", stock: 25 },
        { id: 11, name: "Blush Palette", price: 299, image: "images/blush.webp", category: "makeup", stock: 30 },
        { id: 12, name: "Lipstick", price: 199, image: "images/lipstick.jpg", category: "makeup", stock: 55 },
        { id: 13, name: "Shampoo", price: 299, image: "images/shampoo.webp", category: "haircare", stock: 40 },
        { id: 14, name: "Hair Conditioner", price: 349, image: "images/conditioner.webp", category: "haircare", stock: 35 },
        { id: 15, name: "Hair Oil", price: 199, image: "images/hair-oil.webp", category: "haircare", stock: 50 },
        { id: 16, name: "Hair Mask", price: 499, image: "images/hair-mask.jpg", category: "haircare", stock: 20 },
        { id: 17, name: "Hair Serum", price: 299, image: "images/serum-hair.webp", category: "haircare", stock: 30 },
        { id: 18, name: "Hair Spa Cream", price: 399, image: "images/spa-cream.webp", category: "haircare", stock: 25 },
        { id: 19, name: "Rose Perfume", price: 450, image: "images/perfume1.jpg", category: "perfume", stock: 15 },
        { id: 20, name: "Luxury Perfume", price: 899, image: "images/perfume2.jpg", category: "perfume", stock: 10 },
        { id: 21, name: "Floral Spray", price: 599, image: "images/perfume3.webp", category: "perfume", stock: 20 },
        { id: 22, name: "Oud Perfume", price: 999, image: "images/perfume4.jpg", category: "perfume", stock: 8 },
        { id: 23, name: "Citrus Mist", price: 349, image: "images/perfume5.webp", category: "perfume", stock: 25 },
        { id: 24, name: "Aqua Mist", price: 299, image: "images/perfume6.jpg", category: "perfume", stock: 30 }
      ];
      setDisplayProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
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
            <div key={product.id} className="product">
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
            <div key={product.id} className="product">
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
            <div key={product.id} className="product">
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
            <div key={product.id} className="product">
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