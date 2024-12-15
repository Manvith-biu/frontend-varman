import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const LoginForm = ({ onLoginSuccess }) => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // Visibility state
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://backend-varman.onrender.com/login", {
                username,
                password,
            });

            if (response.data && response.data.token) {
                const { token } = response.data;
                localStorage.setItem("authToken", token);
                setSuccessMessage("Login successful!");
                setError("");
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
                navigate(`/${username}/folders`);
            } else {
                setError("Login failed.");
                setSuccessMessage("");
            }
        } catch (err) {
            setSuccessMessage("");
            setError(err.response?.data?.message || "Incorrect password or user not found.");
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login</h2>

            {/* Error Message */}
            {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

            {/* Success Message */}
            {successMessage && <p style={{ color: "green", marginBottom: "10px" }}>{successMessage}</p>}

            {/* Password Input */}
            <div style={{ position: "relative", display: "inline-block", width: "250px" }}>
                <input
                    type={passwordVisible ? "text" : "password"} // Toggle visibility
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
                />
                <span
                    onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
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

            {/* Submit Button */}
            <br />
            <button
                type="submit"
                style={{
                    marginTop: "20px",
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;