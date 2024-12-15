import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserCheck from "./pages/UserCheck";
import FolderView from "./pages/FolderView";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<UserCheck />} />
        <Route path="/folder" element={<FolderView />} />
        <Route path="/:username/folders" element={<FolderView />} />
      </Routes>
    </Router>
  );
}

export default App;
