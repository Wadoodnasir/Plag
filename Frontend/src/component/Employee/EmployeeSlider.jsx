import React, { useState } from "react";

const EmployeeSlider = ({
  sidebarOpen,
  toggleSidebar,
  setSelectedComponent,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState({});

  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div
      className={`bg-white shadow-md h-screen transition-all duration-700  ${
        sidebarOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      {sidebarOpen && (
        <div className="flex items-center p-2 ">
          <span className="pe-1">
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
            className="text-gray-500 hover:text-gray-700 ms-auto"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="m-auto rotate-90"
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
      )}
      <div className=" d-flex justify-content-center py-1 bg-dark ">
        <button
          onClick={() => setSelectedComponent("PlaceOrderNow")}
          className=" text-white btn btn-sm py-1 px-lg-5 rounded-1 btn-secondary  "
          style={{ fontSize: "12px" }}
        >
          PLACE NEW ODER
        </button>
      </div>

      <ul className="space-y-2 mt-4 ">
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("EmployeeDashborad")}
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
              setSelectedComponent("");
              toggleSubMenu("Subscription");
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
            <svg
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                openSubMenu.Subscription ? "rotate-180" : ""
              }`} // Down arrow rotation
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 8l5 5 5-5H5z" />
            </svg>
          </a>
          {openSubMenu.Subscription && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("EmployeeAIPledge")}
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
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Ai and Plagiarism Checker
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("EmployeeRewriter")}
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
                  Rewriter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() =>
                    setSelectedComponent("EmployeeSubscriptionHistory")
                  }
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
                  Subscription History
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              setSelectedComponent("");
              toggleSubMenu("Employee");
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
            Employee
            <svg
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                openSubMenu.Employee ? "rotate-180" : ""
              }`} // Down arrow rotation
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 8l5 5 5-5H5z" />
            </svg>
          </a>
          {openSubMenu.Employee && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("EmployeeOrders")}
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
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Employee Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("UserFiles")}
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
                  User Files
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              setSelectedComponent("");
              toggleSubMenu("Services");
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
            <svg
              className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                openSubMenu.Services ? "rotate-180" : ""
              }`} // Down arrow rotation
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 8l5 5 5-5H5z" />
            </svg>
          </a>
          {openSubMenu.Services && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("EmployeeService")}
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
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setSelectedComponent("EmployeeServiceHistory")}
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
                  Services History
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("History")}
            className="flex items-center py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
            History
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("EmployeeInvoices")}
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
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              ></path>
            </svg>
            Invoices
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("Settings")}
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
                d="M11.983 2.167A1 1 0 0113 3v.61c.668.33 1.294.732 1.866 1.197l.512-.296a1 1 0 011.366.366l1.5 2.598a1 1 0 01-.366 1.366l-.513.296c.097.672.097 1.36 0 2.032l.513.296a1 1 0 01.366 1.366l-1.5 2.598a1 1 0 01-1.366.366l-.512-.296a11.58 11.58 0 01-1.866 1.197V17a1 1 0 01-1.017.833h-3A1 1 0 017 17v-.61a11.58 11.58 0 01-1.866-1.197l-.512.296a1 1 0 01-1.366-.366l-1.5-2.598a1 1 0 01.366-1.366l.513-.296a11.497 11.497 0 010-2.032l-.513-.296a1 1 0 01-.366-1.366l1.5-2.598a1 1 0 011.366-.366l.512.296A11.58 11.58 0 017 3.61V3a1 1 0 011.017-.833h3zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              ></path>
            </svg>
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSlider;
