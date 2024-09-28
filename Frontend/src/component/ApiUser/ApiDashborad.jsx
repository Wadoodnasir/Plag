import React from "react";
import Cards from "../Employee/Cards";
import ApiHistoryTable from "./ApiHistoryTable";
import ApiUserInvoiceTable from "./ApiUserInvoiceTable";

const ApiDashborad = () => {
  return (
    <>
      <div className=" container-fluid w-100 mx-auto p-0">
        <Cards />
        <div className=" w-75 mx-auto ">
          <h1 className=" fs-2 text-center py-1">Oders Table</h1>
          <ApiHistoryTable />
          <h1 className="fs-2 text-center py-1">Subscription Table</h1>

          <ApiUserInvoiceTable />
        </div>
      </div>
    </>
  );
};
export default ApiDashborad;
