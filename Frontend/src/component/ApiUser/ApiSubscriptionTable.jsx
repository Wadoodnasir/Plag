import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Modal, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";

const ApiSubscriptionTable = () => {
  // { userId }
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Fetch all subscriptions for the user
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get(`/api/subscriptions/${userId}`);
        setSubscriptions(res.data);
      } catch (err) {
        console.error("Error fetching subscriptions", err);
      }
    };

    fetchSubscriptions();
  }, []);
  // userId
  // Handle delete subscription
  const handleDelete = (record) => {
    setSelectedSubscription(record);
    setIsModalVisible(true);
  };

  // Confirm delete subscription
  const handleConfirmDelete = async () => {
    if (selectedSubscription) {
      try {
        await axios.delete(`/api/subscriptions/${selectedSubscription.id}`);
        message.success("Subscription deleted successfully");
        setSubscriptions(
          subscriptions.filter((sub) => sub.id !== selectedSubscription.id)
        );
      } catch (err) {
        console.error("Error deleting subscription", err);
        message.error("Failed to delete subscription");
      }
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSubscription(null);
  };

  const columns = [
    {
      title: "Subscription Name",
      dataIndex: ["package", "name"],
      key: "subscriptionName",
    },
    {
      title: "Deadline",
      dataIndex: "endDate",
      key: "deadline",
      render: (endDate) => new Date(endDate).toLocaleDateString(),
    },
    {
      title: "No. of Documents",
      dataIndex: "documents", // Adjust this based on your actual structure
      key: "documents",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Button type="danger" onClick={() => handleDelete(record)}>
              Delete
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
        dataSource={subscriptions}
        rowKey="id"
        style={{ fontSize: "14px", backgroundColor: "#fff" }}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleConfirmDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this subscription?</p>
        <p>{selectedSubscription?.package?.name}</p>
      </Modal>
    </div>
  );
};

export default ApiSubscriptionTable;
