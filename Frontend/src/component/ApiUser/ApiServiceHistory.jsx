// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import ApiServiceHistoryTable from "./ApiServiceHistoryTable";

const ApiServiceHistory = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Services History Table</h1>
      <div className="container w-100 my-3">
        <ApiServiceHistoryTable />
      </div>
    </div>
  );
};

export default ApiServiceHistory;