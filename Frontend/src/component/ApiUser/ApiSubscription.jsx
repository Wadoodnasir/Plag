// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import ApiSubscriptionTable from "./ApiSubscriptionTable.jsx";

const ApiSubscription = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Subscription History Table</h1>
      <div className="container w-100 my-3">
        <ApiSubscriptionTable />
      </div>
    </div>
  );
};

export default ApiSubscription;
