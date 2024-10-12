import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Button, message } from "antd";
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

const EmployeeSubscriptionHistoryTables = ({ userId }) => {
  const [data, setData] = useState([]); // Subscriptions data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch subscriptions on component mount
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`/api/subscriptions/${userId}`);
        const result = await response.json();

        if (response.ok) {
          setData(result); // Set subscription data
        } else {
          message.error(result.msg || "Failed to fetch subscriptions");
        }
      } catch (error) {
        message.error("Error fetching subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  // Delete subscription
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        message.success(result.msg || "Subscription deleted successfully");
        setData(data.filter((item) => item.id !== id)); // Remove from state
      } else {
        message.error(result.msg || "Failed to delete subscription");
      }
    } catch (error) {
      message.error("Error deleting subscription");
    }
  };
  const columns = [
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
      title: "No. of Documents",
      dataIndex: "documents",
      key: "documents",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Button type="primary" onClick={() => handleDelete(record)}>
              Buy
            </Button>
          }
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        style={{ fontSize: "14px", backgroundColor: "#fff" }}
      />
    </div>
  );
};

// Define table columns
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Sale",
//       dataIndex: "sale",
//       key: "sale",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => <StatusButton status={status} />,
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Dropdown
//           overlay={
//             <Menu>
//               <Menu.Item key="delete" onClick={() => handleDelete(record.id)}>
//                 Delete
//               </Menu.Item>
//             </Menu>
//           }
//           trigger={["click"]}
//         >
//           <Button icon={<MoreOutlined />} />
//         </Dropdown>
//       ),
//     },
//   ];

//   return (
//     <Table
//       className="tc"
//       columns={columns}
//       dataSource={data}
//       rowKey="id"
//       loading={loading} // Show loading spinner while data is loading
//       style={{
//         fontSize: "14px",
//         backgroundColor: "#ffff",
//       }}
//       components={{
//         header: {
//           cell: (props) => (
//             <th
//               {...props}
//               style={{ ...props.style, backgroundColor: "white" }}
//             />
//           ),
//         },
//       }}
//     />
//   );
// };

export default EmployeeSubscriptionHistoryTables;
