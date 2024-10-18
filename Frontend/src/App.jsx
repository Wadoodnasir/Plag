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
import User from "./pages/User/User";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Home from "./pages/AdminPanel/Home"; // Import your individual components
import Settings from "./component/Employee/Settings";
import Apis from "./component/ApiUser/Apis";
import ApiHistory from "./component/ApiUser/ApisHistroy";
import ApiUserInvoices from "./component/ApiUser/ApiUserInvoices";
import TotalUsersTable from "./component/AdminPanel/Totalusers";
import OrdersTable from "./component/Employee/OrdersTables";
import TodayEarningTable from "./component/AdminPanel/TodayEarning";
import FilesTable from "./component/AdminPanel/FilesTable";
import ProcessingFilesTable from "./component/AdminPanel/ProcessingFilesTable";
import Method from "./component/AdminPanel/Method";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login and Signup Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Admin Panel Routes with nested paths */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="home" element={<Home />} />
          <Route path="total-users" element={<TotalUsersTable />} />
          <Route path="online-users" element={<TotalUsersTable />} />
          <Route path="total-orders" element={<OrdersTable />} />
          <Route path="new-orders" element={<OrdersTable />} />
          <Route path="processing-orders" element={<OrdersTable />} />
          <Route path="total-earning" element={<TodayEarningTable />} />
          <Route path="today-earning" element={<TodayEarningTable />} />
          <Route
            path="total-files-checked"
            element={<ProcessingFilesTable />}
          />
          <Route path="processing-files" element={<FilesTable />} />
          <Route path="tickets" element={<OrdersTable />} />
          <Route path="settings" element={<Settings />} />
          <Route path="apis" element={<Apis />} />
          <Route path="api-history" element={<ApiHistory />} />
          <Route path="api-user-invoices" element={<ApiUserInvoices />} />
          <Route path="method" element={<Method />} />
          <Route index element={<Navigate to="/admin/home" />} />
          <Route index element={<Navigate to="/admin/method" />} />
        </Route>

        {/* Other Routes */}
        <Route path="/employee" element={<EmployerDashboard />} />
        <Route path="/api-user" element={<ApiUser />} />
        <Route path="/user" element={<User />} />

        {/* Default root path */}
        <Route path="/" element={<Navigate to="/user" />} />

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
