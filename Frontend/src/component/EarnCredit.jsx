import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import Modal from "react-bootstrap/Modal"; // Assuming you are using react-bootstrap
import axios from "axios";

const EarnCredit = () => {
  const [showModal, setShowModal] = useState(false);
  const [referralLink, setReferralLink] = useState(""); // Initially empty referral link
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  // Fetch referral link from backend
  useEffect(() => {
    const fetchReferralLink = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4001/link/referral-link"
        );
        setReferralLink(response.data.referralLink);
      } catch (error) {
        console.error("Error fetching referral link:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralLink();
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div>
      <h1 className="fs-3">Earn Credits</h1>
      <p className="fs-6 mb-3">
        When the invitee recharges for the first time, You will receive 50%
        Spear Credit as a reward.
      </p>
      <div className="p-2 border-1 bg-white round-3 d-flex justify-content-between">
        <div>
          <h1 className="fs-4">0.0 Spear Credit</h1>
          <p className="fs-6">Referral Amount</p>
        </div>
        <div className="align-self-center">
          <button
            className="btn btn-medium btn-success"
            onClick={handleModalOpen}
          >
            Copy referral link
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Referral Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                value={referralLink}
                readOnly
              />
              <button
                className="btn btn-secondary ms-2"
                onClick={handleCopyClick}
              >
                <FaCopy /> Copy
              </button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleModalClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EarnCredit;
