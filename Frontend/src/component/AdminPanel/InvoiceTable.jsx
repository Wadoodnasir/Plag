import React, { useState, useEffect } from "react";
import { Table } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      date: "7 Oct 2024",
      time: "6:34 PM",
      invoice: "10/JXKFB",
      items: "offline, Paid",
      billingTerms: "Turnitin Premium $11.00 for one month",
      user: "Demo 01 (demo1)",
      email: "adeel.anjum456@gmail.com",
    },
    {
      id: 2,
      date: "7 Oct 2024",
      time: "6:32 PM",
      invoice: "9/RNR4J",
      items: "perfect-money, Pending",
      billingTerms: "Word Tune Premium $16.00 for one year",
      user: "Demo 01 (demo1)",
      email: "adeel.anjum456@gmail.com",
    },
    {
      id: 3,
      date: "7 Oct 2024",
      time: "6:32 PM",
      invoice: "8/9Q2L8",
      items: "perfect-money, Pending",
      billingTerms: "Word Tune Premium $16.00 for one year",
      user: "Demo 01 (demo1)",
      email: "adeel.anjum456@gmail.com",
    },
    {
      id: 4,
      date: "7 Oct 2024",
      time: "6:28 PM",
      invoice: "7/1WW9Z",
      items: "offline, Pending",
      billingTerms: "12 pcs - Turnitin Premium $132.00 for one month",
      user: "Demo 01 (demo1)",
      email: "adeel.anjum456@gmail.com",
    },
    {
      id: 5,
      date: "6 Oct 2024",
      time: "9:04 AM",
      invoice: "6/FVMUS",
      items: "none, Paid",
      billingTerms: "Grammarly Premium $5.50 for one month",
      user: "Demo03 Demo03 (demo03)",
      email: "demo03@gmail.com",
    },
  ]);

  const columns = [
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <div>
          <div>{record.date}</div>
          <div>{record.time}</div>
        </div>
      ),
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Billing Terms",
      dataIndex: "billingTerms",
      key: "billingTerms",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text, record) => (
        <div>
          <div>{record.user}</div>
          <div>{record.email}</div>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <h2 style={{ marginTop: '20px', marginBottom:'20px' }}>Last 5 Invoices</h2>
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

export default InvoiceTable;
