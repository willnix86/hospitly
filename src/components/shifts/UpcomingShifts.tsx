// components/UpcomingShifts.tsx
import * as React from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

// Example data for upcoming shifts (you can replace this with real data from your API)
const shifts = [
  { date: 'Oct 3, 2024', time: '8:00 AM - 5:00 PM', department: 'Emergency' },
  { date: 'Oct 5, 2024', time: '6:00 PM - 12:00 AM', department: 'Pediatrics' },
  { date: 'Oct 7, 2024', time: '8:00 AM - 5:00 PM', department: 'Surgery' },
];

const UpcomingShifts = ({ userId } : { userId: number}) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upcoming Shifts
      </Typography>
      <List>
        {shifts.map((shift, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${shift.date}: ${shift.time}`}
              secondary={shift.department}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UpcomingShifts;