import Navbar from "../../component/Navbar"; // Adjust the path based on your structure
import { useState } from "react";
import AdminPanelSlider from "../../component/AdminPanel/AdminPanelSlider"; // Sidebar component

import Method from "../../component/AdminPanel/Method";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState("AddSubscription"); // Default component

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Method":
        return <Method />;

      default:
        return <AdminPanel />; // Default to AddSubscription if none is selected
    }
  };

  return (
    <div className="container-fluid flex p-0">
      {/* Sidebar Component */}
      <AdminPanelSlider
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSelectedComponent={setSelectedComponent}
      />

      <div className="flex-1">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="p-4 bg-light">
          <div className="admin-home container-fluid">
            <h1 className="mt-4 mb-4">Admin Panel</h1>
            {/* Render selected component */}
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
