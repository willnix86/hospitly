// components/WorkHoursSummary.tsx
import * as React from 'react';
import { Typography, Paper } from '@mui/material';

// Mock data for work hours summary (replace with actual API data)
const totalWorkedHours = 45;  // Example of hours already worked this week
const maxAllowedHours = 80;   // 80-hour weekly limit
const remainingHours = maxAllowedHours - totalWorkedHours;

const WorkHoursSummary = ({ userId } : { userId: number}) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Work Hours Summary
      </Typography>
      <Typography variant="body1">
        You have worked {totalWorkedHours} hours this week. 
        You have {remainingHours} hours remaining in your 80-hour weekly limit.
      </Typography>
    </Paper>
  );
};

export default WorkHoursSummary;