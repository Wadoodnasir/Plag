// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import ServicesTables from "./ServicesTables.jsx";

const Services = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Services Table</h1>
      <div className="container w-100 my-3">
        <ServicesTables />
      </div>
    </div>
  );
};

export default Services;
