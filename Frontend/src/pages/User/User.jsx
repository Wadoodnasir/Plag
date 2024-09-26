import Navbar from "../../component/Navbar";
import { useState } from "react";
import Orders from "../../component/Employee/Orders";
import Settings from "../../component/Employee/Settings";
import Slider from "../../component/User/UserSlider"; // Import the new Slider component
import Subscriptions from "../../component/User/Subscriptions";
import Services from "../../component/User/Services";
import ServiceHistory from "../../component/User/ServiceHistory";
import SubscriptionHistory from "../../component/User/SubscriptionHistory";
import Rewriter from "../../component/User/Rewriter";
import UserInvoice from "../../component/User/UserInvoice";
const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control the sidebar
  const [selectedComponent, setSelectedComponent] = useState("Subscriptions");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Orders":
        return <Orders />;
      case "Settings":
        return <Settings />;
      case "Services":
        return <Services />;
      case "ServicesHistory":
        return <ServiceHistory />;
      case "SubscriptionHistory":
        return <SubscriptionHistory />;
      case "Rewriter":
        return <Rewriter />;
      case "UserInvoice":
        return <UserInvoice />;
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
        <div className="p-4 bg-light">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default User;
