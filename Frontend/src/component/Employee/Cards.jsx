import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const Cards = () => {
  const [balance, setBalance] = useState(400000); // Initial balance
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [activeService, setActiveService] = useState(null);

  // useEffect(() => {
  //   // Fetch active subscription
  //   const fetchActiveSubscription = async () => {
  //     try {
  //       const res = await axios.get(`/api/subscriptions/active`);
  //       setActiveSubscription(res.data);
  //     } catch (err) {
  //       console.error("Error fetching active subscription", err);
  //     }
  //   };

  //   fetchActiveSubscription();
  // }, []);

  // useEffect(() => {
  //   // Fetch active service
  //   const fetchActiveService = async () => {
  //     try {
  //       const res = await axios.get(`/api/services/active/${userId}`);
  //       setActiveService(res.data);
  //     } catch (err) {
  //       console.error("Error fetching active service", err);
  //     }
  //   };

  //   fetchActiveService();
  // }, []);

  // Add funds to balance
  const handleAddFunds = () => {
    setBalance(balance + 5000);
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Upgrade functionality
  const handleUpgrade = () => {
    const upgradeCost = 50000;
    if (balance >= upgradeCost) {
      setBalance(balance - upgradeCost);
      alert(
        "Successfully upgraded. $50,000 has been deducted from your balance."
      );
    } else {
      alert("Insufficient balance to upgrade.");
    }
  };

  // This function can be passed down through a parent component or context to EmployeeSubscriptionTable
  // const handleBuySubscription = (subscriptionCost) => {
  //   if (balance >= subscriptionCost) {
  //     setBalance(balance - subscriptionCost);
  //     alert("Subscription purchased successfully.");
  //   } else {
  //     alert("Insufficient balance.");
  //   }
  // };

  return (
    <div className="container mt-3">
      <div className="d-flex text-center justify-content-between">
        <div className="bg-white p-2 rounded-3">
          <h2>Active Subscription</h2>
          {activeSubscription ? (
            <h3>
              {activeSubscription.package.name} (Link) Expires on:{" "}
              {new Date(activeSubscription.endDate).toLocaleDateString()}
            </h3>
          ) : (
            <h3>No active subscription found</h3>
          )}
        </div>
        <div className="bg-white p-2 rounded-3">
          <h2>Active Service</h2>
          {activeService ? (
            <h3>
              {activeService.name} (Link) Expires on:{" "}
              {new Date(activeService.endDate).toLocaleDateString()}
            </h3>
          ) : (
            <h3>No active service found</h3>
          )}
        </div>
        <div className="bg-white rounded-3">
          <Card
            className="text-white bg-primary p-3 py-4"
            style={{ width: "18rem" }}
          >
            <Card.Body className="p-0">
              <div className="d-flex justify-content-between p-0 mb-3">
                <Card.Title style={{ fontSize: 14 }}>Total Balance</Card.Title>
                <Card.Text style={{ fontSize: 14 }}>
                  ${balance.toLocaleString()}
                </Card.Text>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  {/* Button for adding funds */}
                  <Button
                    variant="outline-light"
                    className="rounded-circle me-2"
                    onClick={handleAddFunds}
                  >
                    +
                  </Button>
                  <Button variant="outline-light" onClick={handlePrint}>
                    Print
                  </Button>
                </div>

                {/* Button for Upgrade */}
                <Button
                  variant="light"
                  className="text-primary"
                  size="sm"
                  onClick={handleUpgrade}
                >
                  Upgrade
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cards;
