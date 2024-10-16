import React, { useState } from "react";
import { Table, Dropdown, Button, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const EmployeeSubscriptionTable = ({ balance, onBuySubscription }) => {
  const [data] = useState([
    {
      id: 1,
      subscriptionName: "Basic Plan",
      deadline: "30 Days",
      documents: 5,
      cost: 100, // Cost of subscription
    },
    {
      id: 2,
      subscriptionName: "Premium Plan",
      deadline: "60 Days",
      documents: 10,
      cost: 500,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleBuy = (record) => {
    setSelectedSubscription(record);
    setIsModalVisible(true);
  };

  const handleConfirmBuy = () => {
    if (selectedSubscription) {
      const subscriptionCost = selectedSubscription.cost;
      onBuySubscription(subscriptionCost); // Call the buy subscription handler from props
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
            <Button type="primary" onClick={() => handleBuy(record)}>
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

      {/* Buy Confirmation Modal */}
      <Modal
        title="Confirm Purchase"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleConfirmBuy}
        okText="Buy"
        cancelText="Cancel"
      >
        <p>Are you sure you want to buy this subscription?</p>
        <p>{selectedSubscription?.subscriptionName}</p>
        <p>Cost: ${selectedSubscription?.cost}</p>
      </Modal>
    </div>
  );
};

export default EmployeeSubscriptionTable;
