// File: ../../component/Employee/Subscriptions.jsx

import React from "react";
import { Button, Card } from "react-bootstrap";
import OrdersTable from "./OrdersTables";
import SuscriptinTable from "./SuscriptinTable";

const Subscriptions = () => {
  return (
    <div className="container-fluid bg-light">
      <p style={{ fontSize: 14 }} className="text-muted">
        Dashborad / Analytic
      </p>
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
                  <Card.Title style={{ fontSize: 14 }}>
                    Total Balance
                  </Card.Title>
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

      <div className="container w-75 my-3">
        <h1 className="fs-3 text-center">Subscription Table</h1>
        <SuscriptinTable />
      </div>
    </div>
  );
};

export default Subscriptions;
