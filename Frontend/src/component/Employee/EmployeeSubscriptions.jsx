// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import EmployeeSubscriptionTable from "./EmployeeSubscriptionTable.jsx";

const EmployeeSubscriptions = () => {
  return (
    <div className="container-fluid bg-light">
      <div className="container w-100 my-3">
        <EmployeeSubscriptionTable />
      </div>
    </div>
  );
};

export default EmployeeSubscriptions;
