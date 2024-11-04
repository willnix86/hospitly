import * as React from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

interface Notification {
  message: string;
  type: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications = ({ notifications }: NotificationsProps) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index}>
            <ListItemText primary={notification.message} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Notifications;