import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginForm from "./pages/SignIn/SignIn";
import SignUpForm from "./pages/SignUp/SignUp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LoginForm />
      {/* <SignUpForm /> */}
    </>
  );
}

export default App;
