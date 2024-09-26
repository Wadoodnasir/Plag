import Navbar from "../../component/Navbar";
import { useState } from "react";
import Settings from "../../component/Employee/Settings";
import ApiUserSlider from "../../component/ApiUser/ApiUserSlider"; // Import the new Slider component
import Apis from "../../component/ApiUser/Apis";
import ApiHistory from "../../component/ApiUser/ApisHistroy";
import ApiUserInvoices from "../../component/ApiUser/ApiUserInvoices";

const ApiUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control the sidebar
  const [selectedComponent, setSelectedComponent] = useState("Subscriptions");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Settings":
        return <Settings />;
      case "Apis":
        return <Apis />;
      case "ApiHistory":
        return <ApiHistory />;
      case "ApiUserInvoices":
        return <ApiUserInvoices />;
      default:
        return <Apis />; // Default to Subscriptions if none is selected
    }
  };

  return (
    <div className="container-fluid flex p-0">
      {/* Slider Component */}
      <ApiUserSlider
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

export default ApiUser;
