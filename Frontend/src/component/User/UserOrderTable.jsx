import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

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

const UserOrderTable = () => {
  const [data, setData] = useState([]);

  // Fetch data from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/1"); // assuming userId is 1
        const orders = await response.json();
        setData(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    // Implement delete logic here (make a DELETE request to the backend)
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const columns = [
    {
      title: "Order No.",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
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
        return record.status.toLowerCase() === "pending" ? (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="delete" onClick={() => handleDelete(record.id)}>
                  Delete
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        ) : null; // No action if status is not pending
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

export default UserOrderTable;
