import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username.trim()) {
      alert("Please enter a username.");
      return;
    }
    navigate(`/${username}`);
  };

  return (
    <div className="home">
      <h1>VarMan Notes Application</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Home;