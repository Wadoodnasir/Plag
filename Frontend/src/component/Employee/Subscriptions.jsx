// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import SuscriptinTable from "./SuscriptinTable";

const Subscriptions = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Subscription Table</h1>
      <div className="container w-100 my-3">
        <SuscriptinTable />
      </div>
    </div>
  );
};

export default Subscriptions;
