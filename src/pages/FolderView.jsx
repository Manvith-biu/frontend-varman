import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FolderView = () => {
    const { username } = useParams();
    const [folders, setFolders] = useState([]);
    const [error, setError] = useState("");
    const [newFolderName, setNewFolderName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch folders
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Retrieve token
                const response = await axios.get(`https://backend-varman.onrender.com/${username}/folders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFolders(response.data.folders);
                setError("");
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch folders.");
            }
        };

        fetchFolders();
    }, [username]);

    // Create folder
    const handleCreateFolder = async () => {
        if (!newFolderName) {
            setError("Folder name cannot be empty.");
            return;
        }
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(
                `https://backend-varman.onrender.com/createFolder`,
                { username, foldername: newFolderName },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSuccessMessage(response.data.message);
            setNewFolderName("");
            setError("");
            // Refresh folders list
            setFolders((prev) => [...prev, newFolderName]);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create folder.");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>{username}'s Folders</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {!error && folders.length === 0 && <p>No folders found.</p>}
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {folders.map((folder, index) => (
                    <li
                        key={index}
                        style={{
                            margin: "10px 0",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            display: "inline-block",
                            width: "200px",
                            textAlign: "center",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                    >
                        {folder}
                    </li>
                ))}
            </ul>

            {/* Create Folder Section */}
            <div style={{textAlign: "center", marginTop: "20px" }}>
                <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New folder name"
                    style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginBottom: "10px",
                    }}
                />
                <br />
                <button
                    onClick={handleCreateFolder}
                    style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Create Folder
                </button>
            </div>
        </div>
    );
};

export default FolderView;