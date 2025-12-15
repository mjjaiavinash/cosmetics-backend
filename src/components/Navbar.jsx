import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <h2 className="logo">Cosmetics Store</h2>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`hello ${isOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
          <li><Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link to="/privacy" onClick={() => setIsOpen(false)}>Privacy Policy</Link></li>
          <li><Link to="/admin-portal" className="admin-btn-nav" onClick={() => setIsOpen(false)}>🔧 Admin</Link></li>
          <li><Link to="/login" className="login-btn-nav" onClick={() => setIsOpen(false)}>Login</Link></li>
          <li><Link to="/signup" className="signup-btn-nav" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

