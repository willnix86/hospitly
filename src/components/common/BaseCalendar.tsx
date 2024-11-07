import { Box } from '@mui/material';
import { Calendar, DayPropGetter, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface BaseCalendarProps {
  events: Array<{
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
  }>;
  date: Date;
  dayPropGetter?: DayPropGetter;
  eventPropGetter?: (
    event: any,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => { style?: React.CSSProperties };
  headerContent?: React.ReactNode;
  onNavigate?: (date: Date) => void;
}

const BaseCalendar = ({ 
  events, 
  date, 
  dayPropGetter,
  eventPropGetter, 
  headerContent,
  onNavigate 
}: BaseCalendarProps) => {
  return (
    <Box width="100%">
      {headerContent && (
        <Box 
          display="flex" 
          width="100%" 
          justifyContent="space-between"
          alignItems="center" 
          height="3rem"
        >
          {headerContent}
        </Box>
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        toolbar={false}
        style={{ height: 500 }}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        onNavigate={onNavigate}
      />
    </Box>
  );
};

export default BaseCalendar;