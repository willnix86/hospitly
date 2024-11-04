import { Box } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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
  dayPropGetter?: (date: Date) => { style?: React.CSSProperties };
  headerContent?: React.ReactNode;
  onNavigate?: (date: Date) => void;
}

const BaseCalendar = ({ 
  events, 
  date, 
  dayPropGetter, 
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
        onNavigate={onNavigate}
      />
    </Box>
  );
};

export default BaseCalendar;