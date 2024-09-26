// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import EmployeeOderTable from "./EmployeeOderTable";
const EmployeeOrders = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Employee Oders</h1>
      <div className="container w-100 my-3">
        <EmployeeOderTable />
      </div>
    </div>
  );
};

export default EmployeeOrders;
