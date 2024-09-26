// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import SubscriptionHistoryTable from "./SubscriptionHistoryTable.jsx";

const SubscriptionHistory = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Subscription History Table</h1>
      <div className="container w-100 my-3">
        <SubscriptionHistoryTable />
      </div>
    </div>
  );
};

export default SubscriptionHistory;
