import Navbar from "../../component/Navbar";
import { useState } from "react";
import Subscriptions from "../../component/Employee/EmployeeOrders";
import Services from "../../component/Employee/Services";
import Orders from "../../component/Employee/Orders";
import History from "../../component/Employee/History";
import Settings from "../../component/Employee/Settings";
import EmployeeSlider from "../../component/Employee/EmployeeSlider"; // Import the new Slider component
import UserFiles from "../../component/Employee/UserFiles";
import EmployeeInvoices from "../../component/Employee/EmployeeInvoices";
import EmployeeDashborad from "../../component/Employee/EmployeeDashborad";
import EmployeeOrders from "../../component/Employee/EmployeeOrders";
import EmployeeSubscriptions from "../../component/Employee/EmployeeSubscriptions";
import EmployeeRewriter from "../../component/Employee/EmployeeRewriter";
import EmployeeSubscriptionHistory from "../../component/Employee/EmployeeSubscriptionHistory";
import EmployeeService from "../../component/Employee/EmployeeService";
import PlaceOrderNow from "../../component/PlaceOderNow";
import EmployeeServiceHistory from "../../component/Employee/EmployeeServiceHistory";
const EmployerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control the sidebar
  const [selectedComponent, setSelectedComponent] =
    useState("EmployeeDashborad");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Subscriptions":
        return <Subscriptions />;
      case "Services":
        return <Services />;
      case "Orders":
        return <Orders />;
      case "EmployeeInvoices":
        return <EmployeeInvoices />;
      case "History":
        return <History />;
      case "Settings":
        return <Settings />;
      case "EmployeeOrders":
        return <EmployeeOrders />;
      case "EmployeeSubscriptions":
        return <EmployeeSubscriptions />;
      case "EmployeeRewriter":
        return <EmployeeRewriter />;
      case "EmployeeSubscriptionHistory":
        return <EmployeeSubscriptionHistory />;
      case "EmployeeServiceHistory":
        return <EmployeeServiceHistory />;
      case "EmployeeService":
        return <EmployeeService />;
      case "PlaceOrderNow":
        return <PlaceOrderNow />;
      default:
        return <EmployeeDashborad />; // Default to Subscriptions if none is selected
      case "UserFiles":
        return <UserFiles />;
    }
  };

  return (
    <div className="container-fluid flex p-0">
      {/* Slider Component */}
      <EmployeeSlider
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSelectedComponent={setSelectedComponent}
      />

      {/* Main content */}
      <div className="flex-1">
        <Navbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar} // Pass toggleSidebar to Navbar to control hamburger menu
        />
        <div className="p-4 bg-light">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
