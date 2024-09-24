import React, { useState, useRef, useEffect } from "react";
import {
  FaCamera,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/400");
  const [isHovering, setIsHovering] = useState(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [country, setCountry] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add this new array of countries, including Dubai
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Australia",
    "Austria",
    "Bahrain",
    "Bangladesh",
    "Belgium",
    "Brazil",
    "Canada",
    "China",
    "Colombia",
    "Denmark",
    "Dubai",
    "Egypt",
    "Estonia",
    "Finland",
    "France",
    // ... add more countries ...
  ];

  // Update the filteredCountries logic
  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().startsWith(country.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setShowDropdown(true);
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setShowDropdown(false);
  };

  return (
    <div className="container-fluid p-0 m-0 bg-white">
      <div className="container">
        <div className="row mb-3">
          <div className="col-3 justify-content-center d-flex">
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={handleAvatarClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {isHovering && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaCamera size={40} color="white" />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
          <div className="col-9">
            <div className="row mb-3 ">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Profession"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    value={country}
                    onChange={handleCountryChange}
                    onFocus={() => setShowDropdown(true)}
                    style={{ fontSize: "14px" }}
                  />
                  {showDropdown && filteredCountries.length > 0 && (
                    <div ref={dropdownRef} className="custom-dropdown">
                      {filteredCountries.map((c, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleCountrySelect(c)}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className="col-6">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Website"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="defaultAddress"
                    checked={isDefaultAddress}
                    onChange={(e) => setIsDefaultAddress(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="defaultAddress">
                    Make this default address
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="social-media-links">
          <h3 className="fw-bold mb-2">Social</h3>
          <div className="row mb-3">
            <div className="col-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaLinkedin className="text-primary" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="LinkedIn"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaTwitter className="text-info" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Twitter"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaFacebook className="text-primary" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Facebook"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group">
                <span className="input-group-text">
                  <FaGithub className="text-dark" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="GitHub"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
