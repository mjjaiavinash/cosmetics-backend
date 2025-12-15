import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin credentials check
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      alert("Admin Login Successful!");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Admin Panel Access</h2>
          <p>Secure login to manage your cosmetics store dashboard and inventory.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container compact">
          <h2 className="form-title">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            
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
              Login to Dashboard
            </button>

            <p className="small-text">
              <a href="/login">← Back to Login Options</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;