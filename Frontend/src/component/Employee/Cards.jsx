import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Alert } from "react-bootstrap";

const Cards = ({ userId }) => {
  const [balance, setBalance] = useState(400000); // Initial balance
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [notification, setNotification] = useState(null); // State for notification
  const [showNotification, setShowNotification] = useState(false); // Control notification visibility

  useEffect(() => {
    // Fetch active subscription
    const fetchActiveSubscription = async () => {
      try {
        const res = await axios.get(`/api/subscriptions/active`);
        setActiveSubscription(res.data);
      } catch (err) {
        console.error("Error fetching active subscription", err);
      }
    };

    fetchActiveSubscription();
  }, []);

  useEffect(() => {
    // Fetch active service
    const fetchActiveService = async () => {
      try {
        const res = await axios.get(`/api/services/active/${userId}`);
        setActiveService(res.data);
      } catch (err) {
        console.error("Error fetching active service", err);
      }
    };

    fetchActiveService();
  }, [userId]);

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

  // Simulate notification
  const handleNotification = (description) => {
    setNotification(description);
    setShowNotification(true);

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Simulate a notification trigger (this could be connected to the real-time notification system)
  useEffect(() => {
    // Simulating a new notification being received
    handleNotification("You have a new notification about your subscription!");
  }, []); // This useEffect runs once when the component mounts

  return (
    <div className="container mt-3">
      {/* Notification preview section */}
      {showNotification && (
        <Alert variant="info" className="w-100 text-center">
          {notification}
        </Alert>
      )}

      <div className="d-flex text-center justify-content-between">
        <div className="bg-white p-2 rounded-3">
          <h2>Active Subscription</h2>
          {activeSubscription ? (
            <h3>
              {activeSubscription?.package?.name || "No Package"} (Link) Expires
              on:{" "}
              {activeSubscription?.endDate
                ? new Date(activeSubscription.endDate).toLocaleDateString()
                : "No Date"}
            </h3>
          ) : (
            <h3>No active subscription found</h3>
          )}
        </div>

        <div className="bg-white p-2 rounded-3">
          <h2>Active Service</h2>
          {activeService ? (
            <div>
              <h3>
                {activeService?.name || "No Service"} (Link) Expires on:{" "}
                {activeService?.endDate
                  ? new Date(activeService.endDate).toLocaleDateString()
                  : "No Date"}
              </h3>
            </div>
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button } from "react-bootstrap";

// const Cards = ({ userId }) => {
//   // Pass userId as prop
//   const [balance, setBalance] = useState(400000); // Initial balance
//   const [activeSubscription, setActiveSubscription] = useState(null);
//   const [activeService, setActiveService] = useState(null);

//   useEffect(() => {
//     // Fetch active subscription
//     const fetchActiveSubscription = async () => {
//       try {
//         const res = await axios.get(`/api/subscriptions/active`);
//         setActiveSubscription(res.data);
//       } catch (err) {
//         console.error("Error fetching active subscription", err);
//       }
//     };

//     fetchActiveSubscription();
//   }, []);

//   useEffect(() => {
//     // Fetch active service
//     const fetchActiveService = async () => {
//       try {
//         const res = await axios.get(`/api/services/active/${userId}`);
//         setActiveService(res.data);
//       } catch (err) {
//         console.error("Error fetching active service", err);
//       }
//     };

//     fetchActiveService();
//   }, [userId]); // Ensure useEffect depends on userId

//   // Add funds to balance
//   const handleAddFunds = () => {
//     setBalance(balance + 5000);
//   };

//   // Print functionality
//   const handlePrint = () => {
//     window.print();
//   };

//   // Upgrade functionality
//   const handleUpgrade = () => {
//     const upgradeCost = 50000;
//     if (balance >= upgradeCost) {
//       setBalance(balance - upgradeCost);
//       alert(
//         "Successfully upgraded. $50,000 has been deducted from your balance."
//       );
//     } else {
//       alert("Insufficient balance to upgrade.");
//     }
//   };

//   return (
//     <div className="container mt-3">
//       <div className="d-flex text-center justify-content-between">
//         <div className="bg-white p-2 rounded-3">
//           <h2>Active Subscription</h2>
//           {activeSubscription ? (
//             <h3>
//               {activeSubscription?.package?.name || "No Package"} (Link) Expires
//               on:{" "}
//               {activeSubscription?.endDate
//                 ? new Date(activeSubscription.endDate).toLocaleDateString()
//                 : "No Date"}
//             </h3>
//           ) : (
//             <h3>No active subscription found</h3>
//           )}
//         </div>
//         <div className="bg-white p-2 rounded-3">
//           <h2>Active Service</h2>
//           {activeService ? (
//             <h3>
//               {activeService?.name || "No Service"} (Link) Expires on:{" "}
//               {activeService?.endDate
//                 ? new Date(activeService.endDate).toLocaleDateString()
//                 : "No Date"}
//             </h3>
//           ) : (
//             <h3>No active service found</h3>
//           )}
//         </div>
//         <div className="bg-white rounded-3">
//           <Card
//             className="text-white bg-primary p-3 py-4"
//             style={{ width: "18rem" }}
//           >
//             <Card.Body className="p-0">
//               <div className="d-flex justify-content-between p-0 mb-3">
//                 <Card.Title style={{ fontSize: 14 }}>Total Balance</Card.Title>
//                 <Card.Text style={{ fontSize: 14 }}>
//                   ${balance.toLocaleString()}
//                 </Card.Text>
//               </div>

//               <div className="d-flex justify-content-between">
//                 <div>
//                   {/* Button for adding funds */}
//                   <Button
//                     variant="outline-light"
//                     className="rounded-circle me-2"
//                     onClick={handleAddFunds}
//                   >
//                     +
//                   </Button>
//                   <Button variant="outline-light" onClick={handlePrint}>
//                     Print
//                   </Button>
//                 </div>

//                 {/* Button for Upgrade */}
//                 <Button
//                   variant="light"
//                   className="text-primary"
//                   size="sm"
//                   onClick={handleUpgrade}
//                 >
//                   Upgrade
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cards;
