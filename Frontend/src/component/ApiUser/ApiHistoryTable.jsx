import React, { useState } from "react";
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

const ApiHistoryTable = () => {
  const [data, setData] = useState([
    // Sample data, replace with your actual data
    // {
    //   id: 1,
    //   name: "John Doe",
    //   date: "2023-04-15",
    //   sale: 100,
    //   status: "Completed",
    // },
    // {
    //   id: 2,
    //   name: "Jane Smith",
    //   date: "2023-04-16",
    //   sale: 150,
    //   status: "Pending",
    // },
    // Add more rows as needed
  ]);

  const handleDelete = (id) => {
    // Implement delete logic here
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      title: "Api Id",
      dataIndex: "apiId",
      key: "apiId",
    },
    {
      title: "Api Name",
      dataIndex: "apiName",
      key: "apiName",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Subscription Name",
      dataIndex: "subscriptionName",
      key: "subscriptionName",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Consumed",
      dataIndex: "consumed",
      key: "consumed",
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
      className="tc overflow-x-scroll"
      columns={columns}
      dataSource={data}
      rowKey="id"
      style={{
        fontSize: "14px",
        backgroundColor: "#ffff",
        width: "1000px",
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

export default ApiHistoryTable;
