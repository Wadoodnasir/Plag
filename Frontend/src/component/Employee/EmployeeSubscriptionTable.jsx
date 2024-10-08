import React, { useState } from "react";
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

const EmployeeService = () => {
  const [showModal, setShowModal] = useState(false); // State to show/hide form modal
  const [tableData, setTableData] = useState([
    {
      id: "1",
      file: "document1.pdf",
      ai: "AI Model A",
      similarity: "20%",
      status: "complete",
      flags: "None",
      createdAt: "2024-09-10",
    },
    {
      id: "2",
      file: "document2.docx",
      ai: "AI Model B",
      similarity: "35%",
      status: "Pending",
      flags: "Flagged",
      createdAt: "2024-09-11",
    },
    {
      id: "3",
      file: "document3.txt",
      ai: "AI Model C",
      similarity: "50%",
      status: "In Review",
      flags: "None",
      createdAt: "2024-09-12",
    },
    {
      id: "4",
      file: "document4.pdf",
      ai: "AI Model A",
      similarity: "10%",
      status: "Processed",
      flags: "None",
      createdAt: "2024-09-13",
    },
    {
      id: "5",
      file: "document5.docx",
      ai: "AI Model B",
      similarity: "60%",
      status: "Processed",
      flags: "Flagged",
      createdAt: "2024-09-14",
    },
  ]);

  const handleFormSubmit = (data) => {
    setTableData([...tableData, data]); // Add new data to table
    setShowModal(false); // Close the modal
  };

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
          <TableComponent data={tableData} />

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

const TableComponent = ({ data }) => {
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
      case "pending":
        return { backgroundColor: "#8e44ad", color: "white" };
      case "complete":
        return { backgroundColor: "green", color: "white" };
      case "processed":
        return { backgroundColor: "#3498db", color: "white" };
      case "in progress":
      case "in review":
        return { backgroundColor: "#f39c12", color: "white" };
      case "cancel":
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
              <td>{row.file}</td>
              <td>{row.ai}</td>
              <td>{row.similarity}</td>
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
              <td>{row.createdAt}</td>
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

export default EmployeeService;
