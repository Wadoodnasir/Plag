import React, { useState } from "react"; // Import useState
import { Link, Navigate } from "react-router-dom";
import Method from "./Method";
import { Switch } from "antd";

const AdminPanelSlider = ({
  sidebarOpen,
  toggleSidebar,
  setSelectedComponent,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState(null); // State for tracking open submenu

  return (
    <div
      className={`bg-white shadow-md transition-all duration-700 ${
        sidebarOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      {sidebarOpen && (
        <>
          <div className="flex items-center p-2">
            <span className="pr-1">
              <img
                src="https://vue.vristo.sbthemes.com/assets/images/logo.svg"
                width={35}
                alt="Logo"
              />
            </span>
            <h1 style={{ fontSize: "24px" }}>
              <span>VRISTO</span>
            </h1>
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 ml-auto"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-90"
              >
                <path
                  d="M19 11L12 17L5 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  opacity="0.5"
                  d="M19 7L12 13L5 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex justify-center py-1 bg-dark">
            <button
              className="text-white btn btn-sm py-1 px-4 rounded btn-secondary"
              style={{ fontSize: "12px" }}
            >
              Place New Order
            </button>
          </div>
        </>
      )}

      <ul className="space-y-2 mt-4">
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("/")}
            className="flex items-center py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              setOpenSubMenu(openSubMenu === "user" ? null : "user"); // Toggle user submenu
              setSelectedComponent("User");
            }}
            className="flex items-center py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            User
            <span className="ml-auto">
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  openSubMenu === "user" ? "rotate-180" : ""
                }`} // Down arrow
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 8l5 5 5-5H5z" />
              </svg>
            </span>
          </a>
          {openSubMenu === "user" && ( // Render submenu if user submenu is open
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("BrowseUser")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Browse User
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("AddUser")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add User
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("EmailUser")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  E-mail User
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("ImportUser")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Import User
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              setOpenSubMenu(openSubMenu === "services" ? null : "services"); // Toggle services submenu
              setSelectedComponent("Services");
            }}
            className="flex items-center py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            Services
            <span className="ml-auto">
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  openSubMenu === "services" ? "rotate-180" : ""
                }`} // Down arrow
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 8l5 5 5-5H5z" />
              </svg>
            </span>
          </a>
          {openSubMenu === "services" && ( // Render submenu if services submenu is open
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("AddService")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("AllServices")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  All List
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              setOpenSubMenu(
                openSubMenu === "subscription" ? null : "subscription"
              ); // Toggle subscription submenu
              setSelectedComponent("Subscription");
            }}
            className="flex items-center py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            Subscription
            <span className="ml-auto">
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  openSubMenu === "subscription" ? "rotate-180" : ""
                }`} // Down arrow
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 8l5 5 5-5H5z" />
              </svg>
            </span>
          </a>
          {openSubMenu === "subscription" && ( // Render submenu if subscription submenu is open
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("AddSubscription")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Subscription
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("Method")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Method
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("AllSubscriptions")}
                  className="flex items-center py-1 px-4 hover:bg-blue-100 hover:text-blue-600 text-xs transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  All List
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("ApiUserInvoices")}
            className="flex items-center py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm0 4v4a2 2 0 002 2v2a2 2 0 002-2v-2a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2z"
                clipRule="evenodd"
              />
            </svg>
            Invoices
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminPanelSlider;
