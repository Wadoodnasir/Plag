import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUpForm from "./pages/SignUp/SignUp";
import LoginForm from "./pages/SignIn/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<SignUpForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
