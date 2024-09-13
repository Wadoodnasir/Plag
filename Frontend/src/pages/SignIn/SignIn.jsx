import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import "../../App.css";

const LoginForm = () => {
  const [username, setUsername] = useState("wadoodnasir4@gmail.com"); // State for username
  const [password, setPassword] = useState("wadood123"); // State for password
  const [usernameError, setUsernameError] = useState(false); // State for username validation
  const [passwordError, setPasswordError] = useState(false); // State for password validation

  const navigate = useNavigate(); // useNavigate hook to navigate to HomePage

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // Update username state
    setUsernameError(false); // Reset error state on change
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Update password state
    setPasswordError(false); // Reset error state on change
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset validation errors
    let hasError = false;

    // Validation
    if (!username) {
      setUsernameError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }

    // Stop submission if any validation failed
    if (hasError) return;

    // Proceed if validation passed
    // alert("Successfully Logged In");

    // Navigate to the HomePage after successful login
    navigate("/home");
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
              invalid={usernameError} // Shows error if true
            />
            {usernameError && <FormFeedback>Email is required</FormFeedback>}
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              invalid={passwordError} // Shows error if true
            />
            {passwordError && <FormFeedback>Password is required</FormFeedback>}
          </FormGroup>{" "}
          <FormGroup check className="py-2 pb-3">
            <Input type="checkbox" />
            <Label check>Remember me</Label>
          </FormGroup>
          <Button className="w-100 bg-primary mb-3" type="submit">
            Sign In
          </Button>
          <span className="fs-6">
            Don't have an account?{" "}
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
