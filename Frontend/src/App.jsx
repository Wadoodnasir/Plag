import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./pages/SignUp/SignUp";
import LoginForm from "./pages/SignIn/SignIn";
import HomePage from "./pages/HomePage"; // Add this import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route path="/signup" element={<SignUpForm />} />

        {/* Route for the Home page */}
        <Route path="/home" element={<HomePage />} />

        {/* Fallback route to redirect to Login form by default */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
