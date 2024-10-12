import Navbar from "../../component/Navbar";
import { useState } from "react";
import Settings from "../../component/Employee/Settings";
import ApiUserSlider from "../../component/ApiUser/ApiUserSlider"; // Import the new Slider component
import Apis from "../../component/ApiUser/Apis";
import ApiHistory from "../../component/ApiUser/ApisHistroy";
import ApiUserInvoices from "../../component/ApiUser/ApiUserInvoices";
import ApiDashborad from "../../component/ApiUser/ApiDashborad";
import ApiSubscription from "../../component/ApiUser/ApiSubscription";
import ApiRewrite from "../../component/ApiUser/ApiRewrite";
import ApiSubscriptionHistory from "../../component/ApiUser/ApiSubscriptionHistory";
import ApiServiceHistory from "../../component/ApiUser/ApiServiceHistory";
import ApiService from "../../component/ApiUser/ApiService";
import PlaceOrderNow from "../../component/PlaceOderNow";
import EarnCredit from "../../component/EarnCredit";

const ApiUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control the sidebar
  const [selectedComponent, setSelectedComponent] = useState("Subscriptions");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Settings":
        return <Settings />;
      case "ApiSubscription":
        return <ApiSubscription />;
      case "ApiRewrite":
        return <ApiRewrite />;
      case "ApiSubscriptionHistory":
        return <ApiSubscriptionHistory />;
      case "ApiServiceHistory":
        return <ApiServiceHistory />;
      case "ApiService":
        return <ApiService />;
      case "Apis":
        return <Apis />;
      case "ApiHistory":
        return <ApiHistory />;
      case "ApiUserInvoices":
        return <ApiUserInvoices />;
      case "PlaceOrderNow":
        return <PlaceOrderNow />;
      case "EarnCredit":
        return <EarnCredit />;
      default:
        return <ApiDashborad />; // Default to Subscriptions if none is selected
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
