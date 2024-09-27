import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./pages/SignUp/SignUp";
import LoginForm from "./pages/SignIn/SignIn";
import EmployerDashboard from "./pages/EmployeeDashboard/EmployerDashboard";
import ApiUser from "./pages/ApiUser/ApiUser";
// Add this new import
import User from "./pages/User/User";
import AdminPanel from "./component/AdminPanel/AdminPanelSlider";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        {/* <Route path="/my-account" element={<MyAccount />} /> */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/employee" element={<EmployerDashboard />} />
        {/* Add new route for ApiUser */}
        <Route path="/api-user" element={<ApiUser />} />
        {/* Add new route for User */}
        <Route path="/user" element={<User />} />
        {/* New route for root path */}
        <Route path="/" element={<Navigate to="/user" />} />
        {/* Changed default route to go to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
