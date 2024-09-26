import ApiUserInvoiceTable from "./ApiUserInvoiceTable";
const ApiUserInvoices = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Api User Invoices Table</h1>
      <div className="container w-100 my-3">
        <ApiUserInvoiceTable />
      </div>
    </div>
  );
};

export default ApiUserInvoices;
