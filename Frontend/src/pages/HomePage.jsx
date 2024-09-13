import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

// Define the iOS style switch (without TypeScript types)
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const HomePage = () => {
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

  return (
    <>
      <div className="fluid-container" style={{ backgroundColor: "#313A46" }}>
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
                <Avatar alt="Wadood Nasir" src="/static/images/avatar/1.jpg" />
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
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
              </Menu>
            </div>
          </nav>
        </div>
      </div>
      <div className="container">
        <h6 className="p-3" style={{ color: "#4AC5C7" }}>
          Ai-Plagrium
        </h6>
      </div>
      <div className="container">
        <div className="p-3 d-flex justify-content-between">
          <div>
            <h5>Reports</h5>
          </div>
          <div className="group-button d-flex">
            <FormGroup>
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                label="Exclude bibliography"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                label="Exclude quotes"
              />
            </FormGroup>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              style={{ backgroundColor: "#2E9ECA", color: "white", width: 120 }}
            >
              Send
            </Button>
            <Button
              variant="contained"
              startIcon={<CurrencyExchangeIcon />}
              endIcon={<UploadIcon />}
              style={{
                backgroundColor: "#2E9ECA",
                color: "white",
                width: 135,
                marginLeft: 15,
              }}
            >
              slots:299
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
