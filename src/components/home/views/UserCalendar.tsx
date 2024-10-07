import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const UserCalendar = ({ userId }: { userId: number }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Handle shift fetching based on selected date
  };

  const events = [
    // Example event data. Replace with real data fetching logic.
    {
      title: 'On Call Shift',
      start: new Date(),
      end: new Date(),
      allDay: true,
    },
  ];

  return (
    <Box mt={4}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={(slotInfo) => handleDateChange(slotInfo.start)}
          selectable
        />
        {selectedDate && (
          <Typography variant="body1" mt={2}>
            Selected Date: {selectedDate.toDateString()}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default UserCalendar;