import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { MoreOutlined, CloseOutlined } from "@ant-design/icons";

const StatusButton = ({ status }) => {
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "#52c41a"; // green
      case "unpaid":
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
  const [data, setData] = useState([]);

  // Fetch invoices from backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoices/1"); // assuming userId is 1
        const invoices = await response.json();
        setData(invoices);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit invoice with id:", id);
    // Implement edit logic here
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete invoice:", error);
    }
  };

  const columns = [
    {
      title: "Reference No.",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Paid Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
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
                  <Menu.Item
                    key="delete"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
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
