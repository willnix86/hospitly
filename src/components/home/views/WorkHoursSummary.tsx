import * as React from 'react';
import { Typography, Box } from '@mui/material';

interface WorkHoursSummaryProps {
  workHours: {
    total: number;
    remaining: number;
  };
}

const WorkHoursSummary = ({ workHours }: WorkHoursSummaryProps) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Work Hours Summary
      </Typography>
      <Box>
        <Typography variant="body1">
          You have worked {workHours.total} hours this week.
        </Typography>
        <Typography variant="body1">
          You have {workHours.remaining} hours remaining in your 80-hour weekly limit.
        </Typography>
      </Box>
    </>
  );
};

export default WorkHoursSummary;