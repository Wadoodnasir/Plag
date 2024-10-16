import React from "react";

const AdminDashboard = () => {
  return (
    <>
      <div className="container-fluid row">
        <div className="col-7 p-0">
          <h3 className=" fw-medium text-dark  ">Last 5 Customers</h3>
          <table className="table" style={{ fontSize: "12px" }}>
            <thead style={{ backgroundColor: "#D3DCE3" }}>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Added</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Active</td>
                <td>2023-10-01</td> {/* Demo data for Added field */}
                <td>Credit Card</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-5 p-0">
          <h3>
            Today<span className=" c"> 3 Oct 2024 </span>{" "}
          </h3>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
