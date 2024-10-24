// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import EmployeeServiceHistoryTable from "./EmployeeServiceHistoryTable.jsx";

const EmployeeServiceHistory = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Subscription History Table</h1>
      <div className="container w-100 my-3">
        <EmployeeServiceHistoryTable />
      </div>
    </div>
  );
};

export default EmployeeServiceHistory;
