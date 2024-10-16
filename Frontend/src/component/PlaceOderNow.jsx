import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const PlaceOrderNow = () => {
  // State and hooks can be defined here
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const [documentType, setDocumentType] = React.useState("");
  const [subjectArea, setSubjectArea] = React.useState("");
  const [topic, setTopic] = React.useState(""); // Added state for topic
  const [pages, setPages] = React.useState(""); // Added state for pages
  const [deadline, setDeadline] = React.useState(""); // Added state for deadline
  const [poster, setPoster] = React.useState(""); // Added state for poster
  const [pptSlide, setPptSlide] = React.useState(""); // Added state for PPT slide
  const [isSubscription, setIsSubscription] = React.useState(true); // New state to track subscription/service

  const handleOrder = () => {
    // Logic for placing an order
  };

  const calculateTotal = () => {
    // Logic to calculate total based on pages, pptSlide, and poster
    const pageCost = pages ? pages * 26 : 0; // Cost per page
    const pptCost = pptSlide ? pptSlide * 20 : 0; // Cost per PPT slide
    const posterCost = poster ? poster * 130 : 0; // Cost per poster
    return pageCost + pptCost + posterCost; // Total cost
  };

  return (
    <div className=" container-fluid ">
      <h1 className=" fs-2 text-center p-0">Order Now</h1>
      <div className=" bg-light ">
        <div className=" row pt-3">
          <div className="col-9">
            <h1 className=" fs-5 fw-normal text-dark py-3">Your Requirement</h1>
            <div className="d-flex justify-content-center gap-4 mb-3">
              <button
                className={`btn ${
                  isSubscription ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setIsSubscription(true)} // Set subscription active
              >
                Subscription
              </button>
              <button
                className={`btn ${
                  !isSubscription ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setIsSubscription(false)} // Set service active
              >
                Services
              </button>
            </div>

            {isSubscription && ( // Render forms only if subscription is active
              <>
                <div
                  className=" d-flex gap-5 align-items-center justify-content-between"
                  style={{ fontSize: "14px" }} // Updated font size to 14px
                >
                  <label className=" d-block">Academic Level:</label>
                  <div
                    className="btn-group d-flex gap-5"
                    role="group"
                    aria-label="Academic Level"
                  >
                    {["Undergraduate", "Graduate", "Postgraduate", "PHD"].map(
                      (level) => (
                        <button
                          key={level}
                          type="button"
                          className={`btn rounded border  ${
                            selectedLevel === level
                              ? "btn-primary"
                              : "btn-light"
                          }`}
                          onClick={() => setSelectedLevel(level)}
                        >
                          {level}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div
                  className=" d-flex align-items-center justify-content-between py-3"
                  style={{ fontSize: "14px" }} // Updated font size to 14px
                >
                  <label className=" d-block" style={{ width: 120 }}>
                    Document Type:
                  </label>
                  <select
                    className="form-select w-50"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    style={{ fontSize: "14px" }} // Updated font size to 14px
                  >
                    <option value="">Select Document Type</option>
                    <option value="Essay">Essay</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Thesis">Thesis</option>
                  </select>
                  <label className=" d-block ms-2" style={{ width: 120 }}>
                    Subject Area:
                  </label>
                  <select
                    className="form-select w-50"
                    value={subjectArea}
                    onChange={(e) => setSubjectArea(e.target.value)}
                    style={{ fontSize: "14px" }} // Updated font size to 14px
                  >
                    <option value="">Select Subject Area</option>
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
                <div className=" d-flex justify-content-center align-items-center">
                  <label
                    className="form-label me-2"
                    style={{ fontSize: "14px" }}
                  >
                    Topic:
                  </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{ fontSize: "14px" }} // Updated font size to 14px
                  />
                </div>
                <div className=" d-flex justify-content-center align-items-center mt-3">
                  <label
                    className="form-label me-2"
                    style={{ width: 180, fontSize: "14px" }}
                  >
                    Paper Instructions:
                  </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Paper Instructions"
                    style={{ height: "70px", fontSize: "14px" }} // Updated font size to 14px
                  />
                </div>
                <div className=" d-flex justify-content-between py-3">
                  <label
                    className=" d-block"
                    style={{ width: 120, fontSize: "14px" }} // Updated font size to 14px
                  >
                    Pages:
                  </label>{" "}
                  <select
                    className="form-select w-50"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    style={{ fontSize: "14px" }} // Updated font size to 14px
                  >
                    <option value="">Select Pages</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    {/* Add more options as needed */}
                  </select>
                  <label
                    className=" d-block ms-2"
                    style={{ width: 120, fontSize: "14px" }} // Updated font size to 14px
                  >
                    Deadline:
                  </label>{" "}
                  <select
                    className="form-select w-50"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    style={{ fontSize: "14px" }} // Updated font size to 14px
                  >
                    <option value="">Select Deadline</option>
                    <option value="24 hours">24 hours</option>
                    <option value="3 days">3 days</option>
                    <option value="1 week">1 week</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className=" d-flex justify-content-between py-3">
                  <label
                    className=" d-block"
                    style={{ width: 120, fontSize: "14px" }} // Updated font size to 14px
                  >
                    Poster:
                  </label>{" "}
                  <select
                    className="form-select w-50"
                    value={poster}
                    onChange={(e) => setPoster(e.target.value)}
                    style={{ fontSize: "14px" }} // Updated font size to 14px
                  >
                    <option value="">Select Poster Type</option>
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                    {/* Add more options as needed */}
                  </select>
                  <label
                    className=" d-block ms-2"
                    style={{ width: 120, fontSize: "14px" }} // Updated font size to 14px
                  >
                    PPT Slide:
                  </label>{" "}
                  <select
                    className="form-select w-50"
                    value={pptSlide}
                    onChange={(e) => setPptSlide(e.target.value)}
                    style={{ fontSize: "14px" }} // Updated font size to 14px
                  >
                    <option value="">Select PPT Slide Type</option>
                    <option value="Standard">Standard</option>
                    <option value="Custom">Custom</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <label
                    className="form-label me-2"
                    style={{ width: 180, fontSize: "14px" }}
                  >
                    Additional Materials:
                  </label>{" "}
                  <div className="w-100">
                    <input
                      type="file"
                      className="form-control"
                      style={{ height: "70px", display: "none" }} // Hide the default file input
                      id="additionalMaterials"
                      onChange={(e) => console.log(e.target.files[0])} // Handle file selection
                    />
                    <label
                      htmlFor="additionalMaterials"
                      className="btn btn-light d-flex align-items-center justify-content-center"
                      style={{
                        height: "70px",
                        cursor: "pointer",
                        backgroundColor: "white",
                        border: "dotted",
                        color: "gray",
                        fontSize: "14px", // Updated font size to 14px
                      }} // Set height and cursor
                    >
                      <i className="fas fa-upload me-2"></i> {/* Upload icon */}
                      Upload File
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="col-3 p-0 ">
            <div className="card p-3 bg-primary text-white shadow py-4">
              <h5 className="card-title fs-4 text-center fw-bolder text-warning ">
                Order Summary
              </h5>
              <div className=" d-flex justify-content-between">
                <p className="small">Type of Paper: </p> <p>{documentType}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <p className="small">Subject: </p> <p>{subjectArea}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <p className="small">No of Pages:</p> <p>{pages} Pages x £26</p>
              </div>
              <div className=" d-flex justify-content-between">
                <p className="small">PPT Slides:</p>{" "}
                <p>{pptSlide} PPT Slides x £20</p>
              </div>
              <div className=" d-flex justify-content-between">
                <p className="small">No of Poster:</p>{" "}
                <p>{poster} Poster x £130</p>
              </div>
              <div className=" d-flex justify-content-between">
                <p className="small">Deadline:</p> <p>{deadline}</p>
              </div>
              <div className=" d-flex justify-content-between">
                <p className="small">Level:</p> <p>{selectedLevel}</p>
              </div>
              <p className="small">Reference Style: APA</p>
              <h6 className="fs-6 text-warning">Total: £{calculateTotal()}</h6>
              <p className="small">
                We'll send you the order for review by October 1st 2024
              </p>
              <button className="btn btn-warning text-dark mt-3">
                Checkout Now
              </button>
            </div>
            <div className=""></div>
            {/* New Card for Questions */}
            <div className="card mt-4 bg-primary">
              <div className="card-body text-center">
                <h5 className="card-title text-warning fs-4 fw-bolder">
                  Any Question?
                </h5>
                <hr className=" text-white mb-2" />
                <div className="d-flex justify-content-center align-items-center">
                  <WhatsAppIcon
                    className="me-2 fw-bolder "
                    style={{ fontSize: "24px", color: "warning" }}
                  />
                  <span className="text-white">03034498760</span>
                </div>
                <div className="mt-3">
                  <button className="btn btn-warning me-2">Live Chat</button>
                  <button className="btn btn-warning">FAQ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderNow;
