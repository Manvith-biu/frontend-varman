import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FolderView = () => {
    const { username } = useParams();
    const [folders, setFolders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Retrieve token
                const response = await axios.get(`https://backend-varman.onrender.com/${username}/folders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFolders(response.data.folders);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch folders.");
            }
        };

        fetchFolders();
    }, [username]);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>{username}'s Folders</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
        </div>
    );
};

export default FolderView;