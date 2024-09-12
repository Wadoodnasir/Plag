import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import "../../App.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // Update username state
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Update password state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!username) {
      alert("Please enter your username.");
      return;
    }
    if (!password) {
      alert("Please enter your password.");
      return;
    }

    // Save username and password to Realtime Database
    try {
      const usersRef = ref(database, "users"); // Reference to "users" in the Realtime Database
      await push(usersRef, {
        username: username,
        password: password,
      });

      alert("successfully Login "); // Alert on successful save
      onLogin(); // Call onLogin function
    } catch (e) {
      console.error("Error adding data: ", e); // Log any errors
    }
  };

  return (
    <div className="row bg-primary sign-container m-0">
      <div className="col-lg-3 col-10 p-4 bg-white rounded-2">
        <h5 className="pb-4 fw-bold">Sign in to your acount </h5>
        <Form>
          <FormGroup>
            <Label for="exampleEmail" className="text-dark">
              Your email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
            />
          </FormGroup>{" "}
          <FormGroup check className="py-2 pb-3">
            <Input type="checkbox" />
            <Label check>Remember me</Label>
          </FormGroup>
          <Button className=" w-100 bg-primary mb-3">Sign In</Button>
          <span className=" fs-6">
            Don't have any account?
            <a className="text-primary text-decoration-none" href="">
              {" "}
              SignUp
            </a>{" "}
          </span>
          <></>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
