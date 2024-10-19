// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import ApiSubscriptionTable from "./ApiSubscriptionTable.jsx";
import ApiAIandPledge from "./ApiAIandPledge.jsx";

const ApiSubscription = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Subscription History Table</h1>
      <div className="container w-100 my-3">
        <ApiAIandPledge />
      </div>
    </div>
  );
};

export default ApiSubscription;
