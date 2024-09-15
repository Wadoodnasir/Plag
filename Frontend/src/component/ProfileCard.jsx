import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Card.css"; // Optional CSS for custom styling

const ProfileCard = () => {
  return (
    <div className="card mt-3 mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body text-center">
        <div
          className="rounded-circle bg-primary text-white d-inline-block p-3 mb-3"
          style={{ width: "60px", height: "60px" }}
        >
          <i className="fas fa-user" style={{ fontSize: "32px" }}></i>{" "}
          {/* Font Awesome icon */}
        </div>
        <h5 className="card-title">Adeel Anjum</h5>
        <p className="card-text">adeelgeneral@gmail.com</p>
        <p className="card-text">03406207023</p>
      </div>
    </div>
  );
};

export default ProfileCard;
