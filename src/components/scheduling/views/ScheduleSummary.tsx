import * as React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ScheduleProps } from '@/types';

const ScheduleSummary: React.FC<ScheduleProps> = ({ schedule }) => {
  const callShiftsCount: { [name: string]: number } = {};

  Object.values(schedule.onCall).forEach((users) => {
    users.forEach((user) => {
      if (!callShiftsCount[user.name]) {
        callShiftsCount[user.name] = 0;
      }
      callShiftsCount[user.name] += 1;
    });
  });

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Resident Summary for {schedule.month}
      </Typography>

      {/* Vacation Section */}
      <Typography variant="subtitle1" gutterBottom>
        Residents on Vacation:
      </Typography>
      <List>
        {schedule.vacations.map((vacation, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${vacation.user.name}: ${vacation.startDate} to ${vacation.endDate}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ marginY: 2 }} />

      {/* Admin Days Section */}
      <Typography variant="subtitle1" gutterBottom>
        Residents with Admin Days:
      </Typography>
      <List>
        {schedule.adminDays.map((adminDay, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${adminDay.user.name}: ${adminDay.date}`} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ marginY: 2 }} />

      {/* Call Shift Summary */}
      <Typography variant="subtitle1" gutterBottom>
        Call Shift Summary:
      </Typography>
      <List>
        {Object.keys(callShiftsCount).map((resident, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${resident}: ${callShiftsCount[resident]} call shifts`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ScheduleSummary;