// src/components/Navbar.jsx
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu on click
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleSignOut = () => {
    setAnchorEl(null); // Close menu
    navigate("/signin"); // Redirect to the SignIn page
  };

  const handleMyAccountClick = () => {
    setAnchorEl(null); // Close the menu
    navigate("/my-account"); // Navigate to MyAccount page
  };

  return (
    <>
      <div className="fluid-container" style={{ backgroundColor: "#313A46" }}>
        <div className="container">
          <div
            className="fluid-container"
            style={{ backgroundColor: "#313A46" }}
          >
            <div className="container">
              <nav className="d-flex justify-content-between align-items-center p-3">
                <div className="logo">
                  <a href="">
                    <img
                      src="https://turnitin.report/static/logo/logo.png"
                      width={40}
                      alt="Logo"
                    />
                  </a>
                </div>
                <div className="avatars">
                  <Stack
                    direction="row"
                    spacing={2}
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={handleMenuClick} // Trigger menu on click
                  >
                    <Avatar
                      alt="Wadood Nasir"
                      src="/static/images/avatar/1.jpg"
                    />
                    <span className="text-white">
                      Wadood Nasir
                      <KeyboardArrowDownIcon />
                    </span>
                  </Stack>

                  {/* Dropdown Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <MenuItem onClick={handleMyAccountClick}>
                      My Account
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
                  </Menu>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h6 className="p-3" style={{ color: "#4AC5C7" }}>
          Ai-Plagrium
        </h6>
      </div>
    </>
  );
};

export default Navbar;
