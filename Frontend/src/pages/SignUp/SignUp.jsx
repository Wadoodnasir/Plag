import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import axios from "axios"; // Import Axios
import "../../App.css";

const SignUpForm = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation states
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [signupError, setSignupError] = useState(null); // To handle signup errors

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError(false);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setPhoneNumberError(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setPasswordMismatchError(false);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(false);
    setPasswordMismatchError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset all error states
    setFirstNameError(!firstName);
    setLastNameError(!lastName);
    setUsernameError(!username);
    setPhoneNumberError(!phoneNumber);
    setEmailError(!email);
    setPasswordError(!password);
    setConfirmPasswordError(!confirmPassword);

    if (
      !firstName ||
      !lastName ||
      !username ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4001/auth/register", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Successfully signed up!");
        onSignUp();
      }
    } catch (error) {
      setSignupError(error.response?.data?.msg || "Error signing up");
    }
  };

  return (
    <div className="row bg-primary sign-container1 m-0">
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
              invalid={firstNameError}
            />
            {firstNameError && (
              <FormFeedback>First name is required</FormFeedback>
            )}
          </FormGroup>
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
              invalid={lastNameError}
            />
            {lastNameError && (
              <FormFeedback>Last name is required</FormFeedback>
            )}
          </FormGroup>
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
              invalid={usernameError}
            />
            {usernameError && <FormFeedback>Username is required</FormFeedback>}
          </FormGroup>
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
              country={"us"}
              inputStyle={{ width: "100%" }}
              isInvalid={phoneNumberError}
            />
            {phoneNumberError && (
              <FormFeedback>Phone number is required</FormFeedback>
            )}
          </FormGroup>
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
              invalid={emailError}
            />
            {emailError && <FormFeedback>Email is required</FormFeedback>}
          </FormGroup>
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
              invalid={passwordError || passwordMismatchError}
            />
            {passwordError && <FormFeedback>Password is required</FormFeedback>}
          </FormGroup>
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
              invalid={confirmPasswordError || passwordMismatchError}
            />
            {confirmPasswordError && (
              <FormFeedback>Confirm password is required</FormFeedback>
            )}
            {passwordMismatchError && (
              <FormFeedback>Passwords do not match</FormFeedback>
            )}
          </FormGroup>
          {signupError && <div className="text-danger mb-3">{signupError}</div>}
          <Button type="submit" className="w-100 bg-primary mb-3">
            Sign Up
          </Button>
          <span className="fs-6">
            Already have an account?{" "}
            <Link className="text-primary text-decoration-none" to="/login">
              Login here
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;

// import React, { useState } from "react";
// import {
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Button,
//   FormFeedback,
// } from "reactstrap";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import "react-phone-input-2/lib/style.css"; // Import the CSS
// import PhoneInput from "react-phone-input-2";
// import "../../App.css";

// const SignUpForm = ({ onSignUp }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Validation states
//   const [firstNameError, setFirstNameError] = useState(false);
//   const [lastNameError, setLastNameError] = useState(false);
//   const [usernameError, setUsernameError] = useState(false);
//   const [phoneNumberError, setPhoneNumberError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [confirmPasswordError, setConfirmPasswordError] = useState(false);
//   const [passwordMismatchError, setPasswordMismatchError] = useState(false);

//   const handleFirstNameChange = (event) => {
//     setFirstName(event.target.value);
//     setFirstNameError(false);
//   };

//   const handleLastNameChange = (event) => {
//     setLastName(event.target.value);
//     setLastNameError(false);
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//     setUsernameError(false);
//   };

//   const handlePhoneNumberChange = (value) => {
//     setPhoneNumber(value);
//     setPhoneNumberError(false);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//     setEmailError(false);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//     setPasswordError(false);
//     setPasswordMismatchError(false);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//     setConfirmPasswordError(false);
//     setPasswordMismatchError(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Reset all error states
//     setFirstNameError(!firstName);
//     setLastNameError(!lastName);
//     setUsernameError(!username);
//     setPhoneNumberError(!phoneNumber);
//     setEmailError(!email);
//     setPasswordError(!password);
//     setConfirmPasswordError(!confirmPassword);

//     if (
//       !firstName ||
//       !lastName ||
//       !username ||
//       !phoneNumber ||
//       !email ||
//       !password ||
//       !confirmPassword
//     ) {
//       return;
//     }

//     if (password !== confirmPassword) {
//       setPasswordMismatchError(true);
//       return;
//     }

//     // Proceed with the signup process
//     alert("Successfully signed up!");
//     onSignUp();
//   };

//   return (
//     <div className="row bg-primary sign-container1 m-0">
//       <div className="col-lg-3 col-10 p-4 bg-white rounded-2">
//         <h5 className="pb-4 fw-bold">Sign up for a new account</h5>
//         <Form onSubmit={handleSubmit}>
//           <FormGroup>
//             <Label for="firstName" className="text-dark">
//               First Name
//             </Label>
//             <Input
//               id="firstName"
//               name="firstName"
//               placeholder="First Name"
//               type="text"
//               value={firstName}
//               onChange={handleFirstNameChange}
//               invalid={firstNameError}
//             />
//             {firstNameError && (
//               <FormFeedback>First name is required</FormFeedback>
//             )}
//           </FormGroup>{" "}
//           <FormGroup>
//             <Label for="lastName" className="text-dark">
//               Last Name
//             </Label>
//             <Input
//               id="lastName"
//               name="lastName"
//               placeholder="Last Name"
//               type="text"
//               value={lastName}
//               onChange={handleLastNameChange}
//               invalid={lastNameError}
//             />
//             {lastNameError && (
//               <FormFeedback>Last name is required</FormFeedback>
//             )}
//           </FormGroup>{" "}
//           <FormGroup>
//             <Label for="username" className="text-dark">
//               Username
//             </Label>
//             <Input
//               id="username"
//               name="username"
//               placeholder="Username"
//               type="text"
//               value={username}
//               onChange={handleUsernameChange}
//               invalid={usernameError}
//             />
//             {usernameError && <FormFeedback>Username is required</FormFeedback>}
//           </FormGroup>{" "}
//           <FormGroup>
//             <Label for="phoneNumber" className="text-dark">
//               Phone Number
//             </Label>
//             <PhoneInput
//               id="phoneNumber"
//               name="phoneNumber"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={handlePhoneNumberChange}
//               country={"us"}
//               inputStyle={{ width: "100%" }}
//               isInvalid={phoneNumberError}
//             />
//             {phoneNumberError && (
//               <FormFeedback>Phone number is required</FormFeedback>
//             )}
//           </FormGroup>{" "}
//           <FormGroup>
//             <Label for="email" className="text-dark">
//               Email
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               placeholder="Email"
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//               invalid={emailError}
//             />
//             {emailError && <FormFeedback>Email is required</FormFeedback>}
//           </FormGroup>{" "}
//           <FormGroup>
//             <Label for="password" className="text-dark">
//               Password
//             </Label>
//             <Input
//               id="password"
//               name="password"
//               placeholder="Password"
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//               invalid={passwordError || passwordMismatchError}
//             />
//             {passwordError && <FormFeedback>Password is required</FormFeedback>}
//           </FormGroup>{" "}
//           <FormGroup>
//             <Label for="confirmPassword" className="text-dark">
//               Confirm Password
//             </Label>
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               type="password"
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//               invalid={confirmPasswordError || passwordMismatchError}
//             />
//             {confirmPasswordError && (
//               <FormFeedback>Confirm password is required</FormFeedback>
//             )}
//             {passwordMismatchError && (
//               <FormFeedback>Passwords do not match</FormFeedback>
//             )}
//           </FormGroup>{" "}
//           <Button type="submit" className="w-100 bg-primary mb-3">
//             Sign Up
//           </Button>
//           <span className="fs-6">
//             Already have an account?{" "}
//             <Link className="text-primary text-decoration-none" to="/login">
//               Login here
//             </Link>
//           </span>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
