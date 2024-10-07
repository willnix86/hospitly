import * as React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box } from '@mui/material';
import { ScheduleProps } from '@/types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const OnCallCalendar: React.FC<ScheduleProps> = ({ schedule }) => {
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
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        toolbar={false}
        style={{ height: 500 }}
      />
    </Box>
  );
};

export default OnCallCalendar;