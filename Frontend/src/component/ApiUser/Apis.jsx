import React, { useState } from "react";
import { Alert, Button, Modal, Form, Input, Table } from "antd";
import axios from "axios";

const Apis = () => {
  const [visible, setVisible] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [apiToken, setApiToken] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [form] = Form.useForm();

  // Show modal to input name and company name
  const showModal = () => {
    setVisible(true);
  };

  // Handle API generation
  const handleGenerateApi = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/generate-token",
        values
      );
      setApiToken(response.data.token);
      setApiData((prevData) => [
        ...prevData,
        {
          key: apiData.length + 1,
          name: values.name,
          token: response.data.token,
        },
      ]);
      setVisible(false);
      setTokenVisible(true); // Show the second table
    } catch (error) {
      console.error("Error generating API token:", error);
    }
  };

  // Close the modal
  const handleCancel = () => {
    setVisible(false);
  };

  // API token modal
  const tokenModal = (
    <Modal
      title="API Token Generated"
      visible={tokenVisible}
      onOk={() => setTokenVisible(false)}
      onCancel={() => setTokenVisible(false)}
    >
      <p>Your API token: {apiToken}</p>
    </Modal>
  );

  // Columns for the API table
  const columns = [
    {
      title: "API Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "API Token",
      dataIndex: "token",
      key: "token",
    },
  ];

  return (
    <div>
      <Alert
        message="Note"
        description="API content will be added here"
        type="info"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <h2>Generate API Token</h2>
      <p>
        You can generate an API token for your project. Please provide the
        details below.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Generate API Token</p>
        <Button type="primary" onClick={showModal}>
          Generate Token
        </Button>
      </div>

      {/* Modal to input name and company */}
      <Modal
        title="Generate API Token"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleGenerateApi}>
          <Form.Item
            name="name"
            label="API Name"
            rules={[{ required: true, message: "Please input your API name!" }]}
          >
            <Input placeholder="Enter API name" />
          </Form.Item>
          <Form.Item name="company" label="Company Name (Optional)">
            <Input placeholder="Enter company name (optional)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Generate API
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {tokenModal}

      {/* Hidden Table for showing API data */}
      {apiData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Table columns={columns} dataSource={apiData} />
        </div>
      )}
    </div>
  );
};

export default Apis;
