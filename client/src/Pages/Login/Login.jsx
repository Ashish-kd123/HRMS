import React, { useState } from 'react'
import "./Login.css";
import Logo from "../../assets/images/Logo.png";
import eyeIcon from "../../assets/icons/eye-open.png"
import eyeOffIcon from "../../assets/icons/eye-hidden.png"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      login(res.data);


      navigate('/candidates');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-logo">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="login-container">
        <div className="login-left"></div>

        <div className="login-form-section">
          <h2>Welcome to Dashboard</h2>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group password-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon}
                  alt="Toggle visibility"
                  className="eye-icon-img"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <button type="submit">Login</button>

            <p className="forgot-password">Forgot password?</p>
          </form>

          <p className="register-redirect">
            Don’t have an account? <a href="/">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login
