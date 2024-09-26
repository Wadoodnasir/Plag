// Orders.jsx
import ApiHistoryTable from "./ApiHistoryTable";
const ApiHistory = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">Api History Table</h1>
      <div className="container w-100 my-3">
        <ApiHistoryTable />
      </div>
    </div>
  );
};

export default ApiHistory;
