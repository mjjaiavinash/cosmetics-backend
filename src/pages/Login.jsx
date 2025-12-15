import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (username === savedUser && password === savedPass) {
      alert("Login Successful!");
      navigate("/");
    } else {
      alert("Invalid Username or Password!");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your beauty collection and discover amazing products.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container compact">
          <h2 className="form-title">Login</h2>

          <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
          </div>

          <button type="submit" className="submit-btn login-btn">
            Login
          </button>

          <p className="small-text">
            <a href="/reset-password">Forgot Password?</a>
          </p>

          <p className="small-text">
            New user? <a href="/signup">Sign Up</a>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
