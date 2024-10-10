import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const TodayEarningTable = () => {
  const [data, setData] = useState([
    {
      DateTime: "2023-04-15 10:00:00",
      payment: 100,
      refunds: 20,
      affiliateCommission: 30,
      registrations: 40,
      cancellations: 50,
      rebillsNextDay: 60,
    },
    {
      DateTime: "2023-04-16 11:00:00",
      payment: 150,
      refunds: 25,
      affiliateCommission: 35,
      registrations: 45,
      cancellations: 55,
      rebillsNextDay: 65,
    },
    // Adding more dummy data to show a variety of earnings
    {
      DateTime: "2023-04-17 12:00:00",
      payment: 120,
      refunds: 22,
      affiliateCommission: 32,
      registrations: 42,
      cancellations: 52,
      rebillsNextDay: 62,
    },
    {
      DateTime: "2024-10-19 13:00:00",
      payment: 130,
      refunds: 23,
      affiliateCommission: 33,
      registrations: 43,
      cancellations: 53,
      rebillsNextDay: 63,
    },
  ]);
  const location = useLocation();
  const isTotalEarning = location.pathname.includes('total-earning');

  // useEffect(() => {
  //   // Adding dummy data to show something
  //   setData([
  //     {
  //       DateTime: "2023-04-15 10:00:00",
  //       payment: 100,
  //       refunds: 20,
  //       affiliateCommission: 30,
  //       registrations: 40,
  //       cancellations: 50,
  //       rebillsNextDay: 60,
  //     },
  //     {
  //       DateTime: "2023-04-16 11:00:00",
  //       payment: 150,
  //       refunds: 25,
  //       affiliateCommission: 35,
  //       registrations: 45,
  //       cancellations: 55,
  //       rebillsNextDay: 65,
  //     },
  //     // Adding more dummy data to show a variety of earnings
  //     {
  //       DateTime: "2023-04-17 12:00:00",
  //       payment: 120,
  //       refunds: 22,
  //       affiliateCommission: 32,
  //       registrations: 42,
  //       cancellations: 52,
  //       rebillsNextDay: 62,
  //     },
  //     {
  //       DateTime: "2024-10-19 13:00:00",
  //       payment: 130,
  //       refunds: 23,
  //       affiliateCommission: 33,
  //       registrations: 43,
  //       cancellations: 53,
  //       rebillsNextDay: 63,
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    if (!isTotalEarning) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split('T')[0];
      console.log(yesterday<new Date("2024-10-19 13:00:00"));
      setData(data.filter(item =>  yesterday  < new Date(item.DateTime)));
    } else {
      // setData(data);
    }
  }, [isTotalEarning, data]);

  const columns = [
    {
      title: "DateTime",
      dataIndex: "DateTime",
      key: "DateTime",
    },
    {
      title: "Payments",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Refunds",
      dataIndex: "refunds",
      key: "refunds",
    },
    {
      title: "Affiliate Commission",
      dataIndex: "affiliateCommission",
      key: "affiliateCommission",
    },
    {
      title: "Registrations",
      dataIndex: "registrations",
      key: "registrations",
    },
    {
      title: "Cancellations",
      dataIndex: "cancellations",
      key: "cancellations",
    },
    {
      title: "Rebills next day",
      dataIndex: "rebillsNextDay",
      key: "rebillsNextDay",
    },
  ];

  return (
    <div className="">
      <h2 style={{ marginTop: '20px', marginBottom:'20px' }}>{isTotalEarning ? 'Total Earnings' : 'Today\'s Earnings'}</h2>
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

export default TodayEarningTable;
