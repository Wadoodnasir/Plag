import React from "react";
import { Card, Button } from "react-bootstrap";

const Cards = ({ title, amount, onPrint, onUpgrade }) => {
  return (
    <div className="container mt-3">
      <div className=" d-flex text-center justify-content-between">
        <div className="bg-white p-2 rounded-3">
          <h2>Active Subscription</h2>
          <h3>Subscription Name (Link) Expiry Date (If Null Place Order)</h3>
        </div>
        <div className="bg-white p-2 rounded-3">
          <h2>Active Subscription</h2>
          <h3>Subscription Name (Link) Expiry Date (If Null Place Order)</h3>
        </div>
        <div className="bg-white p-2 rounded-3">
          <Card
            className="text-white bg-primary p-3 py-4"
            style={{ width: "18rem" }}
          >
            <Card.Body className="p-0">
              <div className="d-flex justify-content-between p-0 mb-3">
                <Card.Title style={{ fontSize: 14 }}>Total Balance</Card.Title>
                <Card.Text style={{ fontSize: 14 }}>$400,000</Card.Text>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  {/* Button for "+" */}
                  <Button
                    variant="outline-light"
                    className="rounded-circle me-2"
                  >
                    +
                  </Button>
                  <Button variant="outline-light">Print</Button>
                </div>

                {/* Button for Print */}

                {/* Button for Upgrade */}
                <Button variant="light" className="text-primary" size="sm">
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
