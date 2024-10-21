import React, { useState, useRef, useEffect } from "react";
import {
  FaCamera,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Settings.css";
import axios from "axios"; // for making API calls

const Settings = () => {
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/400");
  const [isHovering, setIsHovering] = useState(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState({}); // Store user data here
  const fileInputRef = useRef(null);

  const countryOptions = countryList().getData();

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/user"); // Replace with your backend endpoint
      setUserData(response.data);
      setAvatarUrl(response.data.avatar || avatarUrl);
      setPhone(response.data.phone || "");
      setCountry(response.data.country || "");
      // Populate other fields as needed...
    }
    fetchData();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await axios.post("/api/upload-avatar", formData);
        setAvatarUrl(response.data.avatarUrl);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
  };

  const handleSave = async () => {
    const updatedData = {
      avatar: avatarUrl,
      phone,
      country,
      // Add other fields here...
    };

    try {
      await axios.put("/api/user", updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <h1 className="fs-3">Settings</h1>
      <div className="container-fluid bg-white py-3">
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
              <div className="row mb-3">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={userData.fullName || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, fullName: e.target.value })
                    }
                    style={{ fontSize: "14px" }}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Profession"
                    value={userData.profession || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, profession: e.target.value })
                    }
                    style={{ fontSize: "14px" }}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <Select
                    id="country"
                    options={countryOptions}
                    value={countryOptions.find((c) => c.value === country)}
                    onChange={handleCountryChange}
                    placeholder="Country"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={userData.address || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, address: e.target.value })
                    }
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
                    value={userData.location || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, location: e.target.value })
                    }
                    style={{ fontSize: "14px" }}
                  />
                </div>
                <div className="col-6">
                  <PhoneInput
                    country={"us"}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    placeholder="Phone Number"
                    inputStyle={{ width: "100%", fontSize: "14px" }}
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
                    <label
                      className="form-check-label"
                      htmlFor="defaultAddress"
                    >
                      Make this default address
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
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
                    value={userData.linkedin || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, linkedin: e.target.value })
                    }
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
                    value={userData.twitter || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, twitter: e.target.value })
                    }
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
                    value={userData.facebook || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, facebook: e.target.value })
                    }
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
                    placeholder="Github"
                    value={userData.github || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, github: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
