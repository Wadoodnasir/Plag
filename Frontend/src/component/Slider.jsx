import React from "react";

const Slider = ({ sidebarOpen, toggleSidebar, setSelectedComponent }) => {
  return (
    <div
      className={`bg-white shadow-md h-screen transition-all duration-700 ${
        sidebarOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      {sidebarOpen && (
        <div className="flex items-center p-2">
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

      <ul className="space-y-2 mt-4">
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("Subscriptions")}
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
            Subscriptions
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("Services")}
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
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("Orders")}
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
            Orders
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => setSelectedComponent("Invoices")}
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
            onClick={() => setSelectedComponent("History")}
            className="flex items-center py-2 px-4 hover:bg-blue-100 hover:text-blue-600 text-sm transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm5 2a1 1 0 011 1v2h2a1 1 0 110 2H9a1 1 0 01-1-1V8a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            History
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

export default Slider;