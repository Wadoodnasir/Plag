import React from "react";
import Cards from "../Employee/Cards";
import ApiHistoryTable from "./ApiHistoryTable";
import ApiUserInvoiceTable from "./ApiUserInvoiceTable";
import ApiOrderTable from "./ApiOrderTable";
import ApiSubscriptionTable from "./ApiSubscriptionTable";

const ApiDashborad = () => {
  return (
    <>
      <div className=" container-fluid w-100 mx-auto p-0">
        <Cards />
        <div className=" w-75 mx-auto ">
          <h1 className=" fs-2 text-center py-1">Oders Table</h1>
          <ApiOrderTable />
          <h1 className="fs-2 text-center py-1">Subscription Table</h1>

          <ApiSubscriptionTable />
        </div>
      </div>
    </>
  );
};
export default ApiDashborad;
