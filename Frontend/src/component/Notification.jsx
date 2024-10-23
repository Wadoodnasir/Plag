import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/notifications/1`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <List
      sx={{
        width: "300px",
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {notifications.map((notification, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={notification.title}
              secondary={notification.description}
            />
          </ListItem>
          {index < notifications.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Notification;
