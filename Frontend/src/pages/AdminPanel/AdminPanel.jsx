import Navbar from "../../component/Navbar"; // Adjust the path based on your structure
import { useState } from "react";
import AdminPanelSlider from "../../component/AdminPanel/AdminPanelSlider"; // Sidebar component
import { Outlet } from "react-router-dom"; // Outlet for rendering nested routes
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="container-fluid flex p-0">
      {/* Sidebar Component */}
      <AdminPanelSlider
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="p-4 bg-light">
          <div className="admin-home container-fluid">
            <h1 className="mt-4 mb-4">Admin Panel Home</h1>
            {/* <p className="mb-4">Welcome to the admin panel. Here you can manage various aspects of your application.</p> */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

// import Navbar from "../../component/Navbar"; // Adjust the path based on your structure
// import { useState } from "react";
// import AdminPanelSlider from "../../component/AdminPanel/AdminPanelSlider"; // Sidebar component
// import AddSubscription from "../../component/AdminPanel/AdminAddSubscription"; // Import your components
// import Method from "../../component/AdminPanel/Method";
// import AllSubscriptions from "../../component/AdminPanel/AdminSubscriptionList";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Home.css";

// const AdminPanel = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [selectedComponent, setSelectedComponent] = useState("AddSubscription"); // Default component

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const renderComponent = () => {
//     switch (selectedComponent) {
//       case "AddSubscription":
//         return <AddSubscription />;
//       case "Method":
//         return <Method />;
//       case "AllSubscriptions":
//         return <AllSubscriptions />;
//       default:
//         return <AddSubscription />; // Default to AddSubscription if none is selected
//     }
//   };

//   return (
//     <div className="container-fluid flex p-0">
//       {/* Sidebar Component */}
//       <AdminPanelSlider
//         sidebarOpen={sidebarOpen}
//         toggleSidebar={toggleSidebar}
//         setSelectedComponent={setSelectedComponent} // Pass the setter to the sidebar
//       />

//       <div className="flex-1">
//         <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//         <div className="p-4 bg-light">
//           <div className="admin-home container-fluid">
//             <h1 className="mt-4 mb-4">Admin Panel</h1>
//             {/* Render selected component */}
//             {renderComponent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
