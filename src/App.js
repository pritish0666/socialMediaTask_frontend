import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSubmissionForm from "./components/UserSubmissionForm";
import AdminDashboard from "./components/AdminDashboard";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSubmissionForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
