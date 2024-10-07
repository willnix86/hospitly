// components/Notifications.tsx
import * as React from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

// Example notifications (replace with actual data from your API)
const notifications = [
  { message: 'Your vacation request for Oct 10 - Oct 15 is pending approval.' },
  { message: 'Shift swap request for Oct 5 has been approved.' },
];

const Notifications = ({ userId } : { userId: number}) => {
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