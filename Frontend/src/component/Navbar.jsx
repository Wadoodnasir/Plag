import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
import { Stack, Menu, MenuItem, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeAdjustIcon from "./ThemeAdjustIcon";
// import "../Visiability";
const Navbar = ({ sidebarOpen, toggleSidebar }) => {
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
    <nav className="d-flex justify-content-between align-items-center p-2 px-4 ">
      <div className=" d-flex">
        {/* Hamburger menu: Only show when sidebar is closed */}
        {!sidebarOpen && (
          <>
            <div className="d-flex" id="logo">
              <span className="pe-1">
                <img
                  src="https://vue.vristo.sbthemes.com/assets/images/logo.svg"
                  width={35}
                />
              </span>
              <h1 style={{ fontSize: "24px" }}>
                <span>VRISTO</span>
              </h1>
            </div>
            <button
              onClick={toggleSidebar}
              className=" p-1 rounded-5 text-gray-500 hover:bg-gray-100 ms-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
              >
                <path
                  d="M20 7L4 7"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
                <path
                  opacity="0.5"
                  d="M20 12L4 12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M20 17L4 17"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>
          </>
        )}

        <span className=" align-self-lg-center">
          <div className="d-flex align-items-center">
            <ul class="d-flex text-dark ">
              <li>
                <a
                  href="/apps/calendar"
                  class="d-block ps-3 rounded-circle bg-light text-dark hover-bg-primary"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 8.229 2 6.343 3.172 5.172 4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-2z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    ></path>
                    <path
                      opacity="0.5"
                      d="M7 4V2.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      opacity="0.5"
                      d="M17 4V2.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      opacity="0.5"
                      d="M2 9H22"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="/apps/todolist"
                  class="d-block ps-3 rounded-circle bg-light text-dark hover:text-gray-700"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M22 10.5v1.5c0 4.714 0 7.071-1.464 8.536C19.071 22 16.714 22 12 22 7.286 22 4.929 22 3.464 20.536 2 19.071 2 16.714 2 12c0-4.714 0-7.071 1.464-8.536C4.929 2 7.286 2 12 2h1.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M17.301 2.806l-.649.649-5.965 5.965c-.404.404-.606.606-.779.828-.205.263-.38.547-.523.848-.122.255-.213.526-.394 1.068l-.578 1.735-.374 1.122c-.089.267-.02.561.179.76.199.199.493.268.76.179l1.122-.374 1.735-.578c.542-.181.813-.271 1.068-.394.301-.143.585-.319.848-.523.222-.173.424-.375.828-.779l5.965-5.965.649-.649c1.075-1.075 1.075-2.818 0-3.893-1.075-1.075-2.818-1.075-3.893 0z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="/apps/chat"
                  class="d-block ps-2 rounded-circle bg-light text-dark hover-bg-primary"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      r="3"
                      transform="matrix(-1 0 0 1 19 5)"
                      stroke="currentColor"
                      stroke-width="1.5"
                    ></circle>
                    <path
                      opacity="0.5"
                      d="M14 2.2C13.354 2.069 12.685 2 12 2 6.477 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453.178.357.237.764.135 1.148l-.596 2.226c-.259.966.624 1.85 1.591 1.591l2.226-.596c.384-.103.791-.043 1.148.135 1.341.668 2.853 1.043 4.453 1.043C17.523 22 22 17.523 22 12c0-.685-.069-1.354-.2-2"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </a>
              </li>
              <li></li>
            </ul>
          </div>
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Show Hamburger icon when sidebar is hidden */}
        <button className="btn btn-primary"> Top Up</button>
        <span className="d-flex flex-column px-3 bg-primary rounded-5 text-white">
          <p style={{ fontSize: 14 }}>Credits</p>
          <p style={{ fontSize: 14 }}>Days lefts: 30</p>
        </span>
        <ThemeAdjustIcon />
        <div>
          <button
            type="button"
            className="btn p-2 rounded-circle bg-light border-0 hover-text-primary"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 10C22.0185 10.7271 22 11.0542 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="19"
                cy="5"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn p-2 rounded-circle bg-light position-relative border-0 hover-text-primary"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 6V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Notification Ping */}
            <span className="position-absolute top-0 end-0 w-3 h-3 d-flex">
              <span
                className="animate-ping position-absolute top-0 start-0 h-50 w-50 rounded-circle bg-success opacity-75"
                style={{ left: "-3px", top: "-3px" }}
              ></span>
              <span className="position-relative w-2 h-2 bg-success rounded-circle"></span>
            </span>
          </button>
        </div>

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
            style={{
              width: "35px",
              height: "35px",
              fontSize: "18px",
              backgroundColor: "#8245BB",
            }}
          />
        </Stack>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem onClick={handleMyAccountClick}>My Account</MenuItem>
          <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
