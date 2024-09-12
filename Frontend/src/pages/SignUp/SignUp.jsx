import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import "react-phone-input-2/lib/style.css"; // Import the CSS
import PhoneInput from "react-phone-input-2";
import "../../App.css";

const SignUpForm = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePhoneNumberChange = (value) => setPhoneNumber(value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (
      !firstName ||
      !lastName ||
      !username ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Save user details to the database (Add your own database logic here)
    try {
      // Placeholder for database logic
      alert("Successfully signed up!");
      onSignUp(); // Call onSignUp function
    } catch (e) {
      console.error("Error signing up: ", e);
    }
  };

  return (
    <div className="row bg-primary sign-container m-0">
      <div className="col-lg-3 col-10 p-4 bg-white rounded-2">
        <h5 className="pb-4 fw-bold">Sign up for a new account</h5>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName" className="text-dark">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="lastName" className="text-dark">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="username" className="text-dark">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="phoneNumber" className="text-dark">
              Phone Number
            </Label>
            <PhoneInput
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              country={"us"} // Default country
              inputStyle={{ width: "100%" }}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="email" className="text-dark">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="password" className="text-dark">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="confirmPassword" className="text-dark">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </FormGroup>{" "}
          <Button type="submit" className="w-100 bg-primary mb-3">
            Sign Up
          </Button>
          <span className="fs-6">
            Already have an account?
            <a className="text-primary text-decoration-none" href="/login">
              {" "}
              Login here
            </a>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
