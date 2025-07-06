import React, { useState } from 'react'
import "./Register.css"
import eyeIcon from "../../assets/icons/eye-open.png"
import eyeOffIcon from "../../assets/icons/eye-hidden.png"
import logo from "../../assets/images/Logo.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




 const Register = () => {

const [showPassword, setShowPassword] = useState(false)
const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const navigate = useNavigate()

 const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please log in.");
      navigate("/login"); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
   <div className="register-page">
      <div className="register-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="register-container">
        <div className="register-left"></div>

        <div className="register-form-section">
          <h2>Welcome to Dashboard</h2>
          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
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

            <div className="form-group password-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img
                  src={showConfirm ? eyeOffIcon : eyeIcon}
                  alt="Toggle visibility"
                  className="eye-icon-img"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </div>
            </div>

            <button type="submit">Register</button>
          </form>

          <p className="login-redirect">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;


