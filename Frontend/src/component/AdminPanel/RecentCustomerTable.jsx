import React, { useState, useEffect } from "react";
import { Table } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';

const RecentCustomerTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      username: "Demo03 Demo03 (demo03)",
      email: "demo03@gmail.com",
      status: "Active",
      added: "5 Oct 2024, 3:23 PM",
      payments: "2 - $6.61",
    },
    {
      id: 2,
      username: "Demo 01 (demo1)",
      email: "adeel.anjum456@gmail.com",
      status: "Active",
      added: "25 Jan 2024, 6:30 PM",
      payments: "1 - $11.00",
    },
  ]);

  const columns = [
    {
      title: "User",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Added",
      dataIndex: "added",
      key: "added",
    },
    {
      title: "Payments",
      dataIndex: "payments",
      key: "payments",
    },
  ];

  return (
    <div className="">
      <h2 style={{ marginTop: '20px', marginBottom:'20px' }}>Last 5 Customers</h2>
      {data.length > 0 ? (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          style={{
            fontSize: "14px",
            backgroundColor: "#ffff",
            width: '100%', // Set table width to 100%
          }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{ ...props.style, backgroundColor: "white", textAlign: 'center' }}
                />
              ),
            },
          }}
        />
      ) : (
        <div className="alert alert-info">No data to display</div>
      )}
    </div>
  );
};

export default RecentCustomerTable;
