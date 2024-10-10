import React, { useState, useEffect } from "react";
import { Table } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';

const RecentActivityTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      username: "Demo 01",
      serviceName: "Turnitin Premium",
      paymentAmount: "+ $11.00",
      paymentMethod: "offline",
      paymentTime: "3 days ago",
      loginTime: "3 days ago",
      loginIP: "37.111.141.39",
    },
    {
      id: 2,
      username: "Demo03 Demo03",
      serviceName: "Grammarly Premium",
      paymentAmount: "+ $5.50",
      paymentMethod: "paypal",
      paymentTime: "4 days ago",
      loginTime: null,
      loginIP: null,
    },
  ]);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div>
          <div>
            <strong>{record.paymentAmount}</strong> Payment from <strong>{record.username}</strong> ({record.username.replace(" ", "").toLowerCase()}), {record.id}/JXKFB – {record.serviceName}
          </div>
          <div style={{ color: "gray", fontSize: "12px" }}>
            🕐 {record.paymentTime}, {record.paymentMethod}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <h2 style={{ marginTop: '20px', marginBottom:'20px' }}>Recent Activity</h2>
      {data.length > 0 ? (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          style={{
            fontSize: "14px",
            backgroundColor: "#ffff",
            width: '100%',
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

export default RecentActivityTable;
