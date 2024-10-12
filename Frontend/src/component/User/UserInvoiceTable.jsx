import React, { useState } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { MoreOutlined, CloseOutlined } from "@ant-design/icons";

const StatusButton = ({ status }) => {
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
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
      }}
    >
      {status}
    </Button>
  );
};

const UserInvoiceTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      reference: "INV-1001", // Adding a reference number
      amount: 250.75,
      userId: 1, // Assuming the user with id 1 exists in the Auth table
      orderId: 101, // Assuming the order with id 101 exists in the Order table
      status: "paid",
      createdAt: "2023-10-01T12:30:00Z",
      updatedAt: "2023-10-01T12:30:00Z",
    },
    {
      id: 2,
      reference: "INV-1002", // Adding a reference number
      amount: 150.5,
      userId: 2, // Assuming the user with id 2 exists in the Auth table
      orderId: 102, // Assuming the order with id 102 exists in the Order table
      status: "unpaid",
      createdAt: "2023-10-03T15:45:00Z",
      updatedAt: "2023-10-03T15:45:00Z",
    },
  ]);

  const handleEdit = (id) => {
    // Implement edit logic here
    console.log("Edit invoice with id:", id);
  };

  const columns = [
    {
      title: "Reference No.",
      dataIndex: "reference", // This now matches the key in your data
      key: "reference",
    },
    {
      title: "Order Id",
      dataIndex: "orderId", // Updated to match the correct key
      key: "orderId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Paid Date",
      dataIndex: "createdAt", // Show the date when the invoice was created
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(), // Format date
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusButton status={status} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (record.status.toLowerCase() === "unpaid") {
          return (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="edit" onClick={() => handleEdit(record.id)}>
                    Edit
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button icon={<MoreOutlined />} />
            </Dropdown>
          );
        } else if (record.status.toLowerCase() === "paid") {
          return <Button icon={<CloseOutlined />} />;
        }
      },
    },
  ];

  return (
    <Table
      className="tc"
      columns={columns}
      dataSource={data}
      rowKey="id"
      style={{
        fontSize: "14px",
        backgroundColor: "#ffff",
      }}
      components={{
        header: {
          cell: (props) => (
            <th
              {...props}
              style={{ ...props.style, backgroundColor: "white" }}
            />
          ),
        },
      }}
    />
  );
};

export default UserInvoiceTable;
