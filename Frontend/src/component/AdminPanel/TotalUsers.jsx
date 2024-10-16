import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Button, Upload, message, Modal, Input,Form } from "antd";
import { MoreOutlined, UploadOutlined } from "@ant-design/icons"; // Added UploadOutlined
import 'bootstrap/dist/css/bootstrap.min.css';
import Papa from 'papaparse';
import { useLocation } from 'react-router-dom';

const TotalUsersTable = () => {
  const [data, setData] = useState([
    // Sample data, replace with your actual data
    {
      id: 1,
      username: "demo02",
      email: "demo2@gmail.com",
      payments: "Never",
      status: "Pending",
      firstName: "Demo2",
      lastName: "Demo2",
      country: "PK",
      countryTitle: "Pakistan",
      phone: "+923406207023",
      mobileNumber: "",
      added: "5 Oct 2024, 3:21 PM",
      registrationIP: "115.186.117.74",
      userGroups: "",
      activeSubscriptions: "0",
      unsubscribed: "0",
      isLocked: "No",
      comment: "",
      expire: "Never",
      lastSigninInfo: "115.186.117.74 at 5 Oct 2024, 3:21 PM",
      lastSigninDate: "5 Oct 2024, 3:21 PM",
      gravatar: "",
      refunds: "0",
      loginIndicator: "",
      avatar: "",
      affiliateId: "",
      isAffiliate: "Yes",
    },
    {
      id: 2,
      username: "demo03",
      email: "demo03@gmail.com",
      payments: "2 - $6.61",
      status: "Active",
      firstName: "Demo03",
      lastName: "Demo03",
      country: "PK",
      countryTitle: "Pakistan",
      phone: "+9382632763",
      mobileNumber: "",
      added: "5 Oct 2024, 3:23 PM",
      registrationIP: "115.186.117.74",
      userGroups: "Grammarly Premium",
      activeSubscriptions: "0",
      unsubscribed: "0",
      isLocked: "No",
      comment: "",
      expire: "Never",
      lastSigninInfo: "115.186.117.74 at 5 Oct 2024, 3:23 PM",
      lastSigninDate: "5 Oct 2024, 3:23 PM",
      gravatar: "",
      refunds: "0",
      loginIndicator: "",
      avatar: "",
      affiliateId: "",
      isAffiliate: "Yes",
    },
    {
      id: 3,
      username: "demo1",
      email: "adeel.anjum456@gmail.com",
      payments: "2 - $53.00",
      status: "Active",
      firstName: "Demo",
      lastName: "01",
      country: "AU",
      countryTitle: "Australia",
      phone: "+936475",
      mobileNumber: "",
      added: "25 Jan 2024, 6:30 PM",
      registrationIP: "2402:e000:503:7ea8:cc61:70ce:1a55:8fd1",
      userGroups: "Turnitin Premium, Turnitin UK Premium ( Fast Speed…",
      activeSubscriptions: "0",
      unsubscribed: "0",
      isLocked: "No",
      comment: "",
      expire: "Never",
      lastSigninInfo: "37.111.141.39 at 7 Oct 2024, 6:34 PM",
      lastSigninDate: "7 Oct 2024, 6:34 PM",
      gravatar: "",
      refunds: "0",
      loginIndicator: "",
      avatar: "",
      affiliateId: "",
      isAffiliate: "Yes",
    },
  ]);

  const location = useLocation();
  const isOnlineUsers = location.pathname.includes('online-users');

  useEffect(() => {
    if (isOnlineUsers) {
      setData(data.filter(user => user.status === 'Active'));
    }
  }, [isOnlineUsers]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditingRecord(record);
  };

  const handleSave = () => {
    setIsModalVisible(false);
    // Assuming there's a function to update the record in the database or state
    // updateRecord(editingRecord);
    message.success('Record updated successfully.');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    message.success('Record deleted successfully.');
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "E-Mail Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Payments",
      dataIndex: "payments",
      key: "payments",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => text === 'Active' ? <span style={{ color: 'green' }}>{text}</span> : <span style={{ color: 'red' }}>{text}</span>,
    },
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Country Title",
      dataIndex: "countryTitle",
      key: "countryTitle",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Added",
      dataIndex: "added",
      key: "added",
    },
    {
      title: "Registration IP",
      dataIndex: "registrationIP",
      key: "registrationIP",
    },
    {
      title: "User Groups",
      dataIndex: "userGroups",
      key: "userGroups",
    },
    {
      title: "Active Subscriptions",
      dataIndex: "activeSubscriptions",
      key: "activeSubscriptions",
    },
    {
      title: "Unsubscribed",
      dataIndex: "unsubscribed",
      key: "unsubscribed",
    },
    {
      title: "Is Locked",
      dataIndex: "isLocked",
      key: "isLocked",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Expire",
      dataIndex: "expire",
      key: "expire",
    },
    {
      title: "Last Signin Info",
      dataIndex: "lastSigninInfo",
      key: "lastSigninInfo",
    },
    {
      title: "Last Signin (Date/Time)",
      dataIndex: "lastSigninDate",
      key: "lastSigninDate",
    },
    {
      title: "Gravatar",
      dataIndex: "gravatar",
      key: "gravatar",
    },
    {
      title: "Refunds",
      dataIndex: "refunds",
      key: "refunds",
    },
    {
      title: "Login Indicator",
      dataIndex: "loginIndicator",
      key: "loginIndicator",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Affiliate Id#",
      dataIndex: "affiliateId",
      key: "affiliateId",
    },
    {
      title: "Is Affiliate?",
      dataIndex: "isAffiliate",
      key: "isAffiliate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" size="small" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="danger" size="small" onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const handleImport = (file) => {
    Papa.parse(file, {
      complete: function (results) {
        const newData = results.data.map((row, index) => ({
          id: index + 1,
          username: row[0],
          email: row[1],
          payments: row[2],
          status: row[3],
          firstName: row[4],
          lastName: row[5],
          country: row[6],
          countryTitle: row[7],
          phone: row[8],
          mobileNumber: row[9],
          added: row[10],
          registrationIP: row[11],
          userGroups: row[12],
          activeSubscriptions: row[13],
          unsubscribed: row[14],
          isLocked: row[15],
          comment: row[16],
          expire: row[17],
          lastSigninInfo: row[18],
          lastSigninDate: row[19],
          gravatar: row[20],
          refunds: row[21],
          loginIndicator: row[22],
          avatar: row[23],
          affiliateId: row[24],
          isAffiliate: row[25],
        }));
        setData(newData);
        message.success('Users imported successfully.');
      }
    });
  };

  const handleExport = () => {
    const csvContent = Object.keys(data[0]).join(",") + "\n" + data.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('Users exported successfully.');
  };

  return (
    <div style={{ maxWidth: 1500 }}>
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Total Users</h2>
      <Upload
        accept=".csv"
        beforeUpload={handleImport}
        showUploadList={false}
      >
        <Button type="primary" icon={<UploadOutlined />}>
          Import Users
        </Button>
      </Upload>
      <Button type="primary" onClick={handleExport}>
        Export Users
      </Button>
      {data.length > 0 ? (
        <div >
          <div style={{ width: '100%', overflow: "hidden" }}>
            <Table
              columns={columns}
              dataSource={data}
              rowKey="id"
              style={{
                fontSize: "14px",
                backgroundColor: "#ffff",
                width: '100%',
              }}
              scroll={{ x: 1500 }}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{ ...props.style, backgroundColor: "white", textAlign: 'center' }}
                    />
                  ),
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="alert alert-info">No data to display</div>
      )}
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input placeholder="Username" defaultValue={editingRecord?.username} />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Email" defaultValue={editingRecord?.email} />
          </Form.Item>
          <Form.Item label="First Name">
            <Input placeholder="First Name" defaultValue={editingRecord?.firstName} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input placeholder="Last Name" defaultValue={editingRecord?.lastName} />
          </Form.Item>
          <Form.Item label="Phone">
            <Input placeholder="Phone" defaultValue={editingRecord?.phone} />
          </Form.Item>
          <Form.Item label="Mobile Number">
            <Input placeholder="Mobile Number" defaultValue={editingRecord?.mobileNumber} />
          </Form.Item>
          <Form.Item label="Country">
            <Input placeholder="Country" defaultValue={editingRecord?.country} />
          </Form.Item>
          <Form.Item label="Country Title">
            <Input placeholder="Country Title" defaultValue={editingRecord?.countryTitle} />
          </Form.Item>
          <Form.Item label="Added">
            <Input placeholder="Added" defaultValue={editingRecord?.added} />
          </Form.Item>
          <Form.Item label="Registration IP">
            <Input placeholder="Registration IP" defaultValue={editingRecord?.registrationIP} />
          </Form.Item>
          <Form.Item label="User Groups">
            <Input placeholder="User Groups" defaultValue={editingRecord?.userGroups} />
          </Form.Item>
          <Form.Item label="Active Subscriptions">
            <Input placeholder="Active Subscriptions" defaultValue={editingRecord?.activeSubscriptions} />
          </Form.Item>
          <Form.Item label="Unsubscribed">
            <Input placeholder="Unsubscribed" defaultValue={editingRecord?.unsubscribed} />
          </Form.Item>
          <Form.Item label="Is Locked">
            <Input placeholder="Is Locked" defaultValue={editingRecord?.isLocked} />
          </Form.Item>
          <Form.Item label="Comment">
            <Input placeholder="Comment" defaultValue={editingRecord?.comment} />
          </Form.Item>
          <Form.Item label="Expire">
            <Input placeholder="Expire" defaultValue={editingRecord?.expire} />
          </Form.Item>
          <Form.Item label="Last Signin Info">
            <Input placeholder="Last Signin Info" defaultValue={editingRecord?.lastSigninInfo} />
          </Form.Item>
          <Form.Item label="Last Signin Date">
            <Input placeholder="Last Signin Date" defaultValue={editingRecord?.lastSigninDate} />
          </Form.Item>
          <Form.Item label="Gravatar">
            <Input placeholder="Gravatar" defaultValue={editingRecord?.gravatar} />
          </Form.Item>
          <Form.Item label="Refunds">
            <Input placeholder="Refunds" defaultValue={editingRecord?.refunds} />
          </Form.Item>
          <Form.Item label="Login Indicator">
            <Input placeholder="Login Indicator" defaultValue={editingRecord?.loginIndicator} />
          </Form.Item>
          <Form.Item label="Avatar">
            <Input placeholder="Avatar" defaultValue={editingRecord?.avatar} />
          </Form.Item>
          <Form.Item label="Affiliate ID">
            <Input placeholder="Affiliate ID" defaultValue={editingRecord?.affiliateId} />
          </Form.Item>
          <Form.Item label="Is Affiliate">
            <Input placeholder="Is Affiliate" defaultValue={editingRecord?.isAffiliate} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TotalUsersTable;
