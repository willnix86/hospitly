import * as React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { CallScheduleData, ScheduleProps, Shift } from '@/types';

const ScheduleSummary = ({ data }: { data: CallScheduleData }) => {
  const callShiftsCount = React.useMemo(() => {
    return data.callShifts.reduce((acc, shift: Shift) => {
      acc[shift.user.name] = (acc[shift.user.name] || 0) + 1;
      return acc;
    }, {} as { [name: string]: number });
  }, [data.callShifts]);

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Resident Summary for {data.month}
      </Typography>

      {/* Vacation Section */}
      <Typography variant="subtitle1" gutterBottom>
        Residents on Vacation:
      </Typography>
      <List>
        {data.vacationDays.map((vacation, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${vacation.user.name}: ${vacation.startTime} to ${vacation.endTime}`}
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
        {data.adminDays.map((adminDay, index) => (
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