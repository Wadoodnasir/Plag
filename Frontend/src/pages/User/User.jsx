import Navbar from "../../component/Navbar";
import { useState } from "react";
import Orders from "../../component/Employee/Orders";
import Settings from "../../component/Employee/Settings";
import UserSlider from "../../component/User/UserSlider"; // Import the new Slider component
import Subscriptions from "../../component/User/Subscriptions";
import Services from "../../component/User/Services";
import ServiceHistory from "../../component/User/ServiceHistory";
import SubscriptionHistory from "../../component/User/SubscriptionHistory";
import Rewriter from "../../component/User/Rewriter";
import UserInvoice from "../../component/User/UserInvoice";
import UserDashborad from "../../component/User/UserDashborad";
import PlaceOrderNow from "../../component/PlaceOderNow";
const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control the sidebar
  const [selectedComponent, setSelectedComponent] = useState("UserDashborad");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Orders":
        return <Orders />;
      case "Settings":
        return <Settings />;
      case "UserDashborad":
        return <UserDashborad />;
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
      case "Subscriptions":
        return <Subscriptions />;
      case "PlaceOrderNow":
        return <PlaceOrderNow />;
      default:
        return <UserDashborad />;
    }
  };

  return (
    <div className="container-fluid flex p-0">
      {/* Slider Component */}
      <UserSlider
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
