import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = ({ username }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("https://backend-varman.onrender.com/register", {
        username,
        password,
      });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ textAlign: "center" }}>
      <h2>Register</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Password Input */}
      <div style={{ position: "relative", marginBottom: "15px", width: "250px", margin: "auto" }}>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 35px 8px 10px",
            fontSize: "16px",
            boxSizing: "border-box",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <span
          onClick={() => setPasswordVisible(!passwordVisible)}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#555",
          }}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Confirm Password Input */}
      <div style={{ position: "relative", marginBottom: "15px", width: "250px", margin: "auto" }}>
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 35px 8px 10px",
            fontSize: "16px",
            boxSizing: "border-box",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <span
          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#555",
          }}
        >
          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <br />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;