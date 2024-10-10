import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import 'bootstrap/dist/css/bootstrap.min.css';

const StatusButton = ({ status }) => {
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "#52c41a"; // green
      case "pending":
        return "#faad14"; // yellow
      default:
        return "#1890ff"; // blue
    }
  };

  return (
    <Button
      type="primary"
      size="small"
      style={{
        backgroundColor: getColor(status),
        borderColor: getColor(status),
        borderRadius: "12px",
        padding: "0 8px",
        height: "24px",
        fontSize: "12px",
        textTransform: "capitalize",
        display: 'inline-block',
        margin: '0 5px',
      }}
    >
      {status}
    </Button>
  );
};

const HelpDeskTable = () => {
  const [data, setData] = useState([
    // Sample data, replace with your actual data
    {
      id: 1,
      name: "John Doe",
      date: "2023-04-15",
      message: "My account is not working.",
      reply: "We're sorry to hear that. Our team is working on it.",
      description: "Account login issue",
      status: "Resolved",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2023-04-16",
      message: "I forgot my password.",
      reply: "Please reset your password using the forgot password feature.",
      description: "Password reset",
      status: "Pending",
    },
    // Add more rows as needed
  ]);

  const handleDelete = (id) => {
    // Implement delete logic here
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: '10%',
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: '10%',
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: '20%',
    },
    {
      title: "Reply",
      dataIndex: "reply",
      key: "reply",
      width: '20%',
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: '20%',
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusButton status={status} />,
      width: '10%',
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="delete" onClick={() => handleDelete(record.id)}>
                Delete
              </Menu.Item>
              {/* Add more menu items for other actions */}
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
      width: '10%',
    },
  ];

  return (
    <div className="">
      <h2 style={{ marginBottom: '20px' }}>Last 5 Helpdesk Messages</h2>
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

export default HelpDeskTable;
