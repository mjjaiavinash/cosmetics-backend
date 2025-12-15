import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    // REGEX VALIDATION
    const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*!]).{6,}$/;

    if (!usernamePattern.test(username)) {
      alert("Username must be at least 3 characters & contain only letters or numbers.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Enter a valid email address (example: name@gmail.com).");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert(
        "Password must contain:\n• Minimum 6 characters\n• 1 uppercase letter\n• 1 lowercase letter\n• 1 number\n• 1 special character (@#$%^&*!)"
      );
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    // SAVE TO LOCAL STORAGE
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Signup successful! Please login.");
    navigate("/login");
  }

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Join Our Beauty Community!</h2>
          <p>Create your account and start your journey to discover premium beauty products.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container">
          <h2 className="form-title">Create Account</h2>

          <form onSubmit={handleSignup}>
          
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Create username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
          </div>

          <button type="submit" className="signup-btn submit-btn">Sign Up</button>

          <p className="small-text">
            Already have an account? <a href="/login">Login</a>
          </p>

        </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

