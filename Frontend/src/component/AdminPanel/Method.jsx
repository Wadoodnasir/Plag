import React, { useState, useEffect } from "react";
import {
  Table,
  Menu,
  Dropdown,
  Button,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";

// StatusButton component remains the same
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

const Method = ({ userId }) => {
  const [methodData, setMethodData] = useState([]);
  const [cccData, setCccData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);
  const [editForm] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Methods
        const methodResponse = await axios.get(
          "http://localhost:4001/method/method"
        );

        // Fetch CCCs
        const cccResponse = await axios.get("http://localhost:4001/method/ccc");

        setMethodData(methodResponse.data);
        setCccData(cccResponse.data);
      } catch (error) {
        message.error("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleDeleteMethod = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/method/method/${id}`);
      message.success("Method deleted successfully");
      setMethodData(methodData.filter((item) => item.methodId !== id));
    } catch (error) {
      message.error("Error deleting method: " + error.message);
    }
  };

  const handleDeleteCCC = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/method/ccc/${id}`);
      message.success("CCC deleted successfully");
      setCccData(cccData.filter((item) => item.accountId !== id));
    } catch (error) {
      message.error("Error deleting CCC: " + error.message);
    }
  };

  const handleEditMethod = (record) => {
    setIsEditing(true);
    setCurrentEditData(record);
    editForm.setFieldsValue(record); // Pre-fill form with current record data
  };

  const handleEditCCC = (record) => {
    setIsEditing(true);
    setCurrentEditData(record);
    editForm.setFieldsValue(record); // Pre-fill form with current record data
  };

  const handleUpdate = async (values) => {
    const endpoint = currentEditData.methodId
      ? `http://localhost:4001/method/method/${currentEditData.methodId}`
      : `http://localhost:4001/method/ccc/${currentEditData.accountId}`;

    try {
      const response = await axios.put(endpoint, values);
      message.success("Updated successfully");

      if (currentEditData.methodId) {
        setMethodData((prev) =>
          prev.map((item) =>
            item.methodId === response.data.methodId ? response.data : item
          )
        );
      } else {
        setCccData((prev) =>
          prev.map((item) =>
            item.accountId === response.data.accountId ? response.data : item
          )
        );
      }

      setIsEditing(false);
      setCurrentEditData(null);
    } catch (error) {
      message.error("Error updating data: " + error.message);
    }
  };

  // Define table columns for Methods
  const methodColumns = [
    {
      title: "Method Website",
      dataIndex: "methodWebsite",
      key: "methodWebsite",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusButton status={status} />,
    },
    {
      title: "Access",
      dataIndex: "access",
      key: "access",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEditMethod(record)}>
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                onClick={() => handleDeleteMethod(record.methodId)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Define table columns for CCCs
  const cccColumns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusButton status={status} />,
    },
    {
      title: "Total Limit",
      dataIndex: "totalLimit",
      key: "totalLimit",
    },
    {
      title: "Remaining Limit",
      dataIndex: "remainingLimit",
      key: "remainingLimit",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEditCCC(record)}>
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                onClick={() => handleDeleteCCC(record.accountId)}
              >
                Delete
              </Menu.Item>
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
    <>
      {/* Table for Methods */}
      <Table
        className="tc"
        columns={methodColumns}
        dataSource={methodData}
        rowKey="methodId"
        loading={loading}
        style={{ fontSize: "14px", backgroundColor: "#ffff" }}
      />

      {/* Table for CCCs */}
      <Table
        className="tc"
        columns={cccColumns}
        dataSource={cccData}
        rowKey="accountId"
        loading={loading}
        style={{ fontSize: "14px", backgroundColor: "#ffff" }}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Record"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={() => {
          editForm.validateFields().then((values) => handleUpdate(values));
        }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="methodWebsite"
            label="Method Website"
            rules={[
              { required: true, message: "Please input the Method Website!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="access"
            label="Access"
            rules={[{ required: true, message: "Please input the Access!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="totalLimit"
            label="Total Limit"
            rules={[
              { required: true, message: "Please input the Total Limit!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="remainingLimit"
            label="Remaining Limit"
            rules={[
              { required: true, message: "Please input the Remaining Limit!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Method;
