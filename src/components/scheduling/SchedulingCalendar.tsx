import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SchedulerCalendar =  ({ userId } : { userId: number})  => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Handle shift fetching based on selected date
  };

  return (
    <Box mt={4}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Calendar onChange={(v) => {
          handleDateChange(v as Date);
        }} value={selectedDate} />
        {selectedDate && (
          <Typography variant="body1" mt={2}>
            Selected Date: {selectedDate.toDateString()}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default SchedulerCalendar;