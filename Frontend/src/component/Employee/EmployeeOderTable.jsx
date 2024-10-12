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

const EmployeeOrderTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      orderNo: "ORD101", // orderId in the Order model
      serviceName: "Website Development", // service name from the related Service model
      startDate: "2023-10-01T10:00:00Z",
      endDate: "2023-11-01T10:00:00Z",
      deadline: "2023-10-31T23:59:59Z",
      status: "Completed",
    },
    {
      id: 2,
      orderNo: "ORD102", // orderId in the Order model
      serviceName: "SEO Optimization", // service name from the related Service model
      startDate: "2023-10-05T12:00:00Z",
      endDate: "2023-11-05T12:00:00Z",
      deadline: "2023-11-04T23:59:59Z",
      status: "Pending",
    },
  ]);

  const handleDelete = (id) => {
    // Implement delete logic here
    setData(data.filter((item) => item.id !== id));
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

export default EmployeeOrderTable;
