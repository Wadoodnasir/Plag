// Orders.jsx

import HistoryTable from "./HistroyTable";
const History = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
      <h1 className="fs-3">History Table</h1>
      <div className="container w-100 my-3">
        <HistoryTable />
      </div>
    </div>
  );
};

export default History;
