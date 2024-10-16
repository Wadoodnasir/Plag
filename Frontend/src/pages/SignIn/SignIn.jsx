import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import "../../App.css";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("raheelanjum255@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
    setLoginError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setLoginError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasError = false;

    if (!username) {
      setUsernameError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axios.post("http://localhost:4001/auth/login", {
        email: username,
        password: password,
      });

      const { token, role } = response.data;

      // Save token to localStorage or state for future use
      localStorage.setItem("token", token);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "EMPLOYEE") {
        navigate("/employee");
      } else if (role === "API-USER") {
        navigate("/api-user");
      } else {
        navigate("/user");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setLoginError(error.response.data.msg || "Login failed");
      } else {
        setLoginError("Server error");
      }
    }
  };

  return (
    <div className="row bg-primary sign-container m-0">
      <div className="col-lg-3 col-10 p-4 bg-white rounded-2">
        <h5 className="pb-4 fw-bold">Sign in to your account</h5>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail" className="text-dark">
              Your email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              value={username}
              onChange={handleUsernameChange}
              invalid={usernameError}
            />
            {usernameError && <FormFeedback>Email is required</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              invalid={passwordError}
            />
            {passwordError && <FormFeedback>Password is required</FormFeedback>}
          </FormGroup>
          {loginError && <div className="text-danger mb-3">{loginError}</div>}
          <div className="d-flex justify-content-between">
            <FormGroup check className="py-2 pb-3">
              <Input type="checkbox" />
              <Label check>Remember me</Label>
            </FormGroup>
            <Link
              to="/forgot-password"
              className="py-2 pb-3 text-decoration-none"
            >
              Forget Password
            </Link>
          </div>
          <Button className="w-100 bg-primary mb-3" type="submit">
            Sign In
          </Button>
          <span className="fs-6">
            Don't have an account?
            <Link className="text-primary text-decoration-none" to="/signup">
              Sign Up
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
