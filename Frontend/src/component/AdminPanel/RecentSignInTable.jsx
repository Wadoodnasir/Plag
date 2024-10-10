import React, { useState, useEffect } from "react";
import { Table } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';

const RecentSignInTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      username: "Demo 01 (demo1)",
      signinTime: "7 Oct 2024, 6:34 PM",
      signinIP: "37.111.141.39",
      email: "adeel.anjum456@gmail.com",
    },
    {
      id: 2,
      username: "Demo03 Demo03 (demo03)",
      signinTime: "5 Oct 2024, 3:23 PM",
      signinIP: "115.186.117.74",
      email: "demo03@gmail.com",
    },
    {
      id: 3,
      username: "Demo2 Demo2 (demo02)",
      signinTime: "5 Oct 2024, 3:21 PM",
      signinIP: "115.186.117.74",
      email: "demo2@gmail.com",
    },
  ]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Signin Time",
      dataIndex: "signinTime",
      key: "signinTime",
    },
    {
      title: "Signin IP",
      dataIndex: "signinIP",
      key: "signinIP",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div className="">
      <h2 style={{ marginTop: '20px', marginBottom:'20px' }}>Last 5 User Signin</h2>
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

export default RecentSignInTable;
