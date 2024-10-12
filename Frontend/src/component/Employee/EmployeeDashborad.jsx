import React from "react";
import Cards from "../Employee/Cards";
import EmployeeSubscriptions from "./EmployeeSubscriptions.jsx";
import EmployeeOderTable from "./EmployeeOderTable.jsx";

const EmployeeDashborad = () => {
  return (
    <>
      <div className=" container-fluid w-100 mx-auto p-0">
        <Cards />
        <div className=" w-75 mx-auto ">
          <h1 className=" fs-2 text-center py-1">Orders Table</h1>
          <EmployeeOderTable />
          <h1 className="fs-2 text-center py-1">Subscription Table</h1>
          <EmployeeSubscriptions />
        </div>
      </div>
    </>
  );
};
export default EmployeeDashborad;
