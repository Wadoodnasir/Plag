import React, { useState } from "react";
import ProfileCard from "../../component/ProfileCard";
import Navbar from "../../component/Navbar";
import Setting from "../../component/Setting";
import ChangePassword from "../../component/ChangePassword";

const MyAccount = () => {
  const [selectedOption, setSelectedOption] = useState("setting"); // Initialize state to show Setting by default

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update state based on clicked option
  };

  return (
    <>
      <Navbar />
      <div className="container ">
        <div className="row">
          <div className="col-md-4">
            <ProfileCard />
          </div>
          <div className="col-md-8">
            <table className="table table-bordered text-center">
              <thead>
                <tr className="row">
                  <th
                    className={`p-2 col-6 ${
                      selectedOption === "setting" ? "bg-info text-white" : ""
                    }`} // Highlight selected option
                    onClick={() => handleOptionClick("setting")} // Handle click for Setting
                    style={{ cursor: "pointer" }}
                  >
                    Setting
                  </th>
                  <th
                    className={`p-2 col-6 ${
                      selectedOption === "changePassword"
                        ? "bg-info text-white"
                        : ""
                    }`} // Highlight selected option
                    onClick={() => handleOptionClick("changePassword")} // Handle click for Change Password
                    style={{ cursor: "pointer" }}
                  >
                    Change Password
                  </th>
                </tr>
              </thead>
            </table>

            {/* Conditionally render components based on selectedOption */}
            <div className="content">
              {selectedOption === "setting" && <Setting />}
              {selectedOption === "changePassword" && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
