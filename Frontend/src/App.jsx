// import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./pages/SignUp/SignUp";
import LoginForm from "./pages/SignIn/SignIn";
import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount/MyAccount";
import EmployerDashboard from "./pages/EmployeeDashboard/EmployerDashboard";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/employee" element={<EmployerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
