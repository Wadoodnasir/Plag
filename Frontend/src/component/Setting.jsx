import React, { useState } from "react";

const Setting = () => {
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/400");

  const handleAvatarClick = () => {
    // Generate a new random image URL
    const newUrl = `https://picsum.photos/400?random=${Math.random()}`;
    setAvatarUrl(newUrl);
  };

  return (
    <>
      <div className="row">
        <div className="col-2">
          <div
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={handleAvatarClick}
          >
            <img
              src={avatarUrl}
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-10"></div>
      </div>
    </>
  );
};

export default Setting;
