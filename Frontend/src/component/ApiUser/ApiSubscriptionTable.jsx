import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import SubmissionForm from "../UploadForm";
import ReactPaginate from "react-paginate";
import { Modal } from "react-bootstrap";

// Define the iOS style switch (without TypeScript types)
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const ApiSubscriptionTable = () => {
  const [showModal, setShowModal] = useState(false); // State to show/hide form modal
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFormSubmit = async (formData) => {
    const config = {
      method: 'post',
      url: 'http://localhost:4001/method2/upload/submit',
      headers: {
        'Cookie': 'connect.sid=s%3A5zutap1Nz4YgUEqMZduBpolgUn_A8lj3.4dAKW%2BZC3OG4a%2B6Imrul3rlMQUSV7G5hnqGv3oK7fPE',
        ...formData.getHeaders()
      },
      data: formData
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4001/reports/reports', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTableData(data);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid p-0 m-0 bg-light">
        <div className="container">
          <div className="p-3 d-flex justify-content-between">
            <div className="align-self-center">
              <h5>Reports</h5>
            </div>
            <div className="group-button d-flex">
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                style={{
                  color: "white",
                  fontSize: "12px",
                  padding: "5px 10px",
                  minWidth: "auto",
                  borderRadius: "5px",
                }}
                onClick={() => setShowModal(true)} // Show modal on click
              >
                Upload
              </Button>
              <Button
                variant="contained"
                startIcon={<CurrencyExchangeIcon style={{ width: "18px" }} />}
                endIcon={<ArrowDropDownIcon />}
                style={{
                  color: "white",
                  fontSize: "14px",
                  padding: "6px 12px",
                  minWidth: "auto",
                  marginLeft: 10,
                  borderRadius: "5px",
                }}
              >
                slots:299
              </Button>
            </div>
          </div>

          {/* Table Component */}
          <TableComponent data={tableData} loading={loading} />

          {/* Modal for Submission Form */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Upload Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SubmissionForm onSubmit={handleFormSubmit} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

const TableComponent = ({ data, loading }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  // Calculate the displayed rows for the current page
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentPageData = data.slice(offset, offset + rowsPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getStatusButtonStyle = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return { backgroundColor: "#8e44ad", color: "white" };
      case "completed":
        return { backgroundColor: "green", color: "white" };
      case "processed":
        return { backgroundColor: "#3498db", color: "white" };
      case "in review":
        return { backgroundColor: "#f39c12", color: "white" };
      case "retry again later":
        return { backgroundColor: "red", color: "white" };
      case "cancelled":
        return { backgroundColor: "#e74c3c", color: "white" };
      default:
        return { backgroundColor: "#95a5a6", color: "white" };
    }
  };

  return (
    <div className="container">
      <table
        className="table table-bordered p-3 text-center"
        style={{ backgroundColor: "#fff", fontSize: "14px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th>Unique ID</th>
            <th>Submitted File</th>
            <th>AI</th>
            <th>Similarity</th>
            <th>Status</th>
            <th>Flags</th>
            <th>Created At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.fileName ? row.fileName : "--"}</td>
              <td>{row.aiPercentage ? row.aiPercentage : "--"}</td>
              <td>{row.similarityPercentage ? row.similarityPercentage : "--"}</td>
              <td>
                <button
                  className="btn btn-sm w-75"
                  style={{
                    ...getStatusButtonStyle(row.status),
                    fontSize: "12px",
                    padding: "2px 8px",
                    borderRadius: "5px",
                  }}
                >
                  {row.status}
                </button>
              </td>
              <td>{row.flags}</td>
              <td>{new Date(row.createdAt).toLocaleString()}</td>
              <td>
                <DeleteIcon
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "large",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
};

export default ApiSubscriptionTable;
