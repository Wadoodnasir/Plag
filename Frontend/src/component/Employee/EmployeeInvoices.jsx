import EmployeeInvoiceTable from "./EmployeeInvoiceTable";
const EmployeeInvoices = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Employee Invoices Table</h1>
      <div className="container w-100 my-3">
        <EmployeeInvoiceTable />
      </div>
    </div>
  );
};

export default EmployeeInvoices;
