import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IssueDetails from "./pages/IssueDetails";
import CreateIssue from "./pages/CreateIssue";
import EditIssue from "./pages/EditIssue";
import Profile from "./pages/Profile";
import MyIssues from "./pages/MyIssues";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateIssue />} />
        <Route path="/issues/issue/:id" element={<IssueDetails />} />
        <Route path="/edit/:id" element={<EditIssue />} />
        <Route path="/myissues/:id" element={<MyIssues />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
