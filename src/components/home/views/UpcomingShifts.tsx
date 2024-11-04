import * as React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import moment from 'moment';

interface Shift {
  startTime: string;
  endTime: string;
  shiftType: {
    name: string;
  };
}

interface UpcomingShiftsProps {
  shifts: Shift[];
}

const UpcomingShifts = ({ shifts }: UpcomingShiftsProps) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Upcoming Shifts
      </Typography>
      <List>
        {shifts.map((shift, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${moment(shift.startTime).format('MMM D, YYYY')}: ${moment(shift.startTime).format('h:mm A')} - ${moment(shift.endTime).format('h:mm A')}`}
              secondary={shift.shiftType.name}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UpcomingShifts;