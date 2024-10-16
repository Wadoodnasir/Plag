import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import SubmissionForm from "../UploadForm";
import axios from "axios"; // Axios for API calls
import ReactPaginate from "react-paginate";
import { Modal } from "react-bootstrap";

// Define the iOS style switch
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

const EmployeeAIPledgeTable = () => {
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;

  // Fetch all reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/reports/reports"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  // Handle file upload (using Postman Axios Request Configuration)
  const handleFormSubmit = async (formData) => {
    console.log(formData);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4001/method2/upload/submit",
      data: formData,
    };

    setLoading(true); // Start loading

    try {
      const response = await axios.request(config);
      console.log(response.data);

      // Assuming response.data contains the new report data
      // Update table with the newly uploaded report
      setTableData((prevTableData) => [...prevTableData, response.data.data]); // Append to the table
      setShowModal(false); // Close the modal after submission
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  // const handleFormSubmit = async (formData) => {
  //   console.log(formData);
  //   const config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:4001/method2/upload/submit",
  //     data: formData,
  //   };

  //   try {
  //     const response = await axios.request(config);
  //     console.log(response.data);

  //     // Assuming response.data contains the new report data
  //     // Update table with the newly uploaded report
  //     setTableData((prevTableData) => [...prevTableData, response.data.data]);
  //     setShowModal(false);
  //   } catch (error) {
  //     console.error(
  //       "Error uploading file:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/report/report/${id}`);
      console.log("Before deleting:", tableData);
      const updatedData = tableData.filter((row) => row.id !== id);
      setTableData(updatedData);
      console.log("After deleting:", updatedData);
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  // Pagination logic
  const pageCount = Math.ceil(tableData.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentPageData = tableData.slice(offset, offset + rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get status button style
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
    <>
      <div className="container-fluid p-0 m-0 bg-light">
        <div className="container">
          <div className="p-3 d-flex justify-content-between">
            <div className="align-self-center">
              <h5>Employee AI Pledges</h5>
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
                onClick={() => setShowModal(true)}
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
          <TableComponent data={currentPageData} onDelete={handleDelete} />

          {/* Pagination */}
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

          {/* Modal for Submission Form */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Upload Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {loading ? (
                <p>Uploading...</p>
              ) : (
                <SubmissionForm onSubmit={handleFormSubmit} />
              )}
            </Modal.Body>
            {/* <Modal.Body>
              <SubmissionForm onSubmit={handleFormSubmit} />
            </Modal.Body> */}
          </Modal>
        </div>
      </div>
    </>
  );
};

// Table Component
const TableComponent = ({ data, onDelete }) => {
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
          {data?.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.fileName}</td>
              <td>{row.ai}</td>
              <td>{row.similarity}</td>
              <td>{row.fileName}</td>
              <td>
                <button
                  className="btn btn-sm w-75"
                  style={{
                    fontSize: "12px",
                    padding: "2px 8px",
                    borderRadius: "5px",
                  }}
                >
                  {row.status}
                </button>
              </td>
              <td>{row.createdAt}</td>
              <td>
                <DeleteIcon
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "large",
                  }}
                  onClick={() => onDelete(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAIPledgeTable;
