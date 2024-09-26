import UserInvoiceTable from "./UserInvoiceTable";
const UserInvoice = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">User Invoices Table</h1>
      <div className="container w-100 my-3">
        <UserInvoiceTable />
      </div>
    </div>
  );
};

export default UserInvoice;
