import * as React from 'react';
import { Box, Button } from '@mui/material';
import moment from 'moment';

import { CalendarNavigationAction, CalendarToolbarProps } from '@/types/CalendarToolbarTypes';

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({ date, onNavigate }) => {
  const currentDate = moment(date); // Use moment to manipulate the date

  const handlePreviousMonth = () => {
    onNavigate(CalendarNavigationAction.PREV);  // Navigate to the previous month
  };

  const handleNextMonth = () => {
    onNavigate(CalendarNavigationAction.NEXT);  // Navigate to the next month
  };

  const handleToday = () => {
    onNavigate(CalendarNavigationAction.TODAY); // Navigate to today's date
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box>
        <Button variant="contained" onClick={handlePreviousMonth} sx={{ mr: 2 }}>
          Previous Month
        </Button>
        <Button variant="contained" onClick={handleToday} sx={{ mr: 2 }}>
          Today
        </Button>
        <Button variant="contained" onClick={handleNextMonth}>
          Next Month
        </Button>
      </Box>

    </Box>
  );
};

export default CalendarToolbar;