import * as React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import { ScheduleProps } from '@/types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const OnCallCalendar: React.FC<ScheduleProps> = ({ schedule }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date()); // State to control the calendar's displayed date

  // Update the current date based on the schedule's month and year
  React.useEffect(() => {
    if (schedule && schedule.month && schedule.year) {
      const firstDayOfMonth = new Date(`${schedule.year}-${schedule.month}-01`);
      setCurrentDate(firstDayOfMonth);
    }
  }, [schedule]);

  const events = React.useMemo(() => {
    // Convert the schedule data into events format for react-big-calendar
    const onCallEvents = Object.entries(schedule.onCall).map(([date, residents]) => {
      return residents.map((resident) => ({
        title: resident.name,
        start: new Date(date),
        end: new Date(date),
        allDay: true,
      }));
    }).flat();
    return [...onCallEvents];
  }, [schedule]);

  return (
    <Box>
      <Box display="flex" width="100%" justifyContent="center">
        <Typography variant="h6" gutterBottom>
          {schedule.month} {schedule.year}
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