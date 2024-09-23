import React, { useState } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const StatusButton = ({ status }) => {
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#52c41a"; // green
      case "expired":
        return "#f5222d"; // red
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

const SuscriptinTable = () => {
  const [data, setData] = useState([
    // Sample data, replace with your actual subscription data
    {
      id: 1,
      name: "John Doe",
      plan: "Premium",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      plan: "Basic",
      startDate: "2023-03-15",
      endDate: "2023-06-14",
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
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusButton status={status} />,
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
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      style={{ fontSize: "14px", backgroundColor: "#ffff" }}
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

export default SuscriptinTable;
