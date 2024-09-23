import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import SubmissionForm from "../component/UploadForm";
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

const HomePage = () => {
  const [showModal, setShowModal] = useState(false); // State to show/hide form modal
  const [tableData, setTableData] = useState([
    {
      id: "1",
      file: "document1.pdf",
      ai: "AI Model A",
      similarity: "20%",
      status: "Processed",
      flags: "None",
      createdAt: "2024-09-10",
    },
    {
      id: "2",
      file: "document2.docx",
      ai: "AI Model B",
      similarity: "35%",
      status: "Processed",
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
      <div
        className="container-fluid p-0 m-0"
        style={{ backgroundColor: "#EAF1F3" }}
      >
        <div className="container">
          <div className="p-3 d-flex justify-content-between">
            <div>
              <h5>Reports</h5>
            </div>
            <div className="group-button d-flex">
              <FormGroup>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label="Exclude bibliography"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label="Exclude quotes"
                />
              </FormGroup>
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                style={{
                  backgroundColor: "#2E9ECA",
                  color: "white",
                  width: 100,
                  fontSize: "12px",
                }}
                onClick={() => setShowModal(true)} // Show modal on click
              >
                Upload
              </Button>
              <Button
                variant="contained"
                startIcon={<CurrencyExchangeIcon style={{ width: "15px" }} />}
                endIcon={<ArrowDropDownIcon />}
                style={{
                  backgroundColor: "#2E9ECA",
                  color: "white",
                  width: 120,
                  marginLeft: 10,
                  fontSize: "12px",
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

  return (
    <div className="container">
      <table
        className="table table-striped table-bordered p-3"
        style={{ backgroundColor: "#fff", fontSize: "14px" }} // Set font size to 12px
      >
        <thead className="thead-dark">
          <tr>
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
              <td>{row.status}</td>
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

export default HomePage;
