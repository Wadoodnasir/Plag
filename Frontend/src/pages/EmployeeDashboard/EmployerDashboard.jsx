import Navbar from "../../component/Navbar";
import { useState } from "react";
import Subscriptions from "../../component/Employee/Subscriptions";
import Services from "../../component/Employee/Services";
import Orders from "../../component/Employee/Orders";
import Invoices from "../../component/Employee/Invoices";
import History from "../../component/Employee/History";
import Settings from "../../component/Employee/Settings";
import Slider from "../../component/Slider"; // Import the new Slider component

const EmployerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control the sidebar
  const [selectedComponent, setSelectedComponent] = useState("Subscriptions");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Subscriptions":
        return <Subscriptions />;
      case "Services":
        return <Services />;
      case "Orders":
        return <Orders />;
      case "Invoices":
        return <Invoices />;
      case "History":
        return <History />;
      case "Settings":
        return <Settings />;
      default:
        return <Subscriptions />; // Default to Subscriptions if none is selected
    }
  };

  return (
    <div className="container-fluid flex p-0">
      {/* Slider Component */}
      <Slider
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
        <div className="p-4">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
