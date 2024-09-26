// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import UserFileTable from "./UserFileTable";
const UserFiles = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">User Files</h1>
      <div className="container w-100 my-3">
        <UserFileTable />
      </div>
    </div>
  );
};

export default UserFiles;
