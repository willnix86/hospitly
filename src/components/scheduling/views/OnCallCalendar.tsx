import * as React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import { CallScheduleData } from '@/types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const getMonthAndYear = (dateString: string): { month: string; year: string } => {
  const date = moment(dateString, "YYYY-MM");
  return {
    month: date.format("MMMM"),
    year: date.format("YYYY")
  };
};

const OnCallCalendar = ({ data }: { data: CallScheduleData }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date()); // State to control the calendar's displayed date

  const { month, year } = React.useMemo(() => {
    const date = moment(currentDate);
    return {
      month: date.format("MMMM"),
      year: date.format("YYYY")
    };
  }, [currentDate]);


  const events = React.useMemo(() => {
    // Convert the schedule data into events format for react-big-calendar
    const onCallEvents = data.callShifts.map((shift) => {
      return {
        title: shift.user.name,
        start: new Date(shift.date),
        end: new Date(shift.date),
        allDay: true,
      };
    }).flat();
    return [...onCallEvents];
  }, [data]);

  return (
    <Box>
      <Box display="flex" width="100%" justifyContent="center">
        <Typography variant="h6" gutterBottom>
          {month} {year}
        </Typography>
      </Box>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate} // This controls the visible date (month and year)
        toolbar={false}
        style={{ height: 500 }}
        onNavigate={(date) => setCurrentDate(date)} // Update the current date when the calendar is navigated
      />
    </Box>
  );
};

export default OnCallCalendar;