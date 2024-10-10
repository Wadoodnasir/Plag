import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';

const FilesTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      DateTime: "2023-04-15 10:00:00",
      SrNo: 1,
      Username: "Demo 01",
      Email: "demo01@example.com",
      FileDownload: true,
      FileName: "Document1.docx",
      Words: 25000,
      GreateeThen30000: false,
      WordsLessThen300: true,
      PlagirismReport: true,
      AIRReport: true,
      DocumentLanguageNotEnglish: false,
      AINotAvailable: false,
    },
    {
      id: 2,
      DateTime: "2023-04-16 11:00:00",
      SrNo: 2,
      Username: "Demo03 Demo03",
      Email: "demo03@example.com",
      FileDownload: true,
      FileName: "Document2.pdf",
      Words: 32000,
      GreateeThen30000: true,
      WordsLessThen300: false,
      PlagirismReport: true,
      AIRReport: true,
      DocumentLanguageNotEnglish: true,
      AINotAvailable: true,
    },
  ]);

  const columns = [
    {
      title: "DateTime",
      dataIndex: "DateTime",
      key: "DateTime",
    },
    {
      title: "SrNo",
      dataIndex: "SrNo",
      key: "SrNo",
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "File Download",
      dataIndex: "FileDownload",
      key: "FileDownload",
      render: (text) => text ? <Button type="primary" size="small">Download</Button> : "N/A",
    },
    {
      title: "File Name",
      dataIndex: "FileName",
      key: "FileName",
    },
    {
      title: "Words",
      dataIndex: "Words",
      key: "Words",
    },
    {
      title: "> 30000",
      dataIndex: "GreateeThen30000",
      key: "GreateeThen30000",
      render: (text) => text ? "Yes" : "No",
    },
    {
      title: "< 300",
      dataIndex: "WordsLessThen300",
      key: "WordsLessThen300",
      render: (text) => text ? "Yes" : "No",
    },
    {
      title: "Plagirism Report",
      dataIndex: "PlagirismReport",
      key: "PlagirismReport",
      render: (text) => text ? <Button type="primary" size="small">Download</Button> : "N/A",
    },
    {
      title: "AI Report",
      dataIndex: "AIRReport",
      key: "AIRReport",
      render: (text) => text ? <Button type="primary" size="small">Download</Button> : "N/A",
    },
    {
      title: "Not English",
      dataIndex: "DocumentLanguageNotEnglish",
      key: "DocumentLanguageNotEnglish",
      render: (text) => text ? "Yes" : "No",
    },
    {
      title: "AI Not Available",
      dataIndex: "AINotAvailable",
      key: "AINotAvailable",
      render: (text) => text ? "Yes" : "No",
    },
    {
      title: "Delete",
      key: "Delete",
      render: (text, record) => text ? <Button type="primary" size="small" onClick={() => handleDelete(record.id)}>Delete</Button> : "N/A",
    },
  ];

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="">
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Files Table</h2>
      {data.length > 0 ? (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          style={{
            fontSize: "14px",
            backgroundColor: "#ffff",
            width: '100%',
          }}
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
      ) : (
        <div className="alert alert-info">No data to display</div>
      )}
    </div>
  );
};

export default FilesTable;
