import { useEffect, useState, useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Typography, Alert } from '@mui/material';
import { CallScheduleData } from '@/types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const parseDate = (dateString: string) : Date => {
  // Extract just the YYYY-MM-DD portion
  const datePart = dateString.split('T')[0];
  return moment(datePart).toDate();
}

interface DayWithError {
  date: string;
  doctorCount: number;
}

const OnCallCalendar = ({ data }: { data: CallScheduleData }) => {
  // Initialize with the date from props instead of new Date()
  const [currentDate, setCurrentDate] = useState(() => parseDate(data.month));
  const [insufficientCoverageDays, setInsufficientCoverageDays] = useState<DayWithError[]>([]);

  // Update currentDate when data.month changes
  useEffect(() => {
    setCurrentDate(parseDate(data.month));
  }, [data.month]);

  // Check for days with insufficient coverage
  useEffect(() => {
    if (data?.callShifts) {
      const coverage: { [key: string]: number } = {};
      
      // Count doctors per day
      data.callShifts.forEach(shift => {
        const date = moment(parseDate(shift.date)).format('YYYY-MM-DD');
        coverage[date] = (coverage[date] || 0) + 1;
      });

      // Find days with less than 2 doctors
      const problemDays = Object.entries(coverage)
        .filter(([_, count]) => count < 2)
        .map(([date, count]) => ({
          date,
          doctorCount: count
        }));

      setInsufficientCoverageDays(problemDays);
    }
  }, [data?.callShifts]);

  const { month, year } = useMemo(() => {
    const date = moment(parseDate(data.month));
    return {
      month: date.format("MMMM"),
      year: date.format("YYYY")
    };
  }, [data]);

 const events = useMemo(() => {
    // Convert the schedule data into events format for react-big-calendar
    const onCallEvents = data.callShifts.map((shift) => {
      // Parse the date and set to local midnight
      console.log("shiftDate", shift.date)
      const startDate = parseDate(shift.date);
      console.log("startDate", startDate);
      const endDate = parseDate(shift.date);
      console.log("endDate", endDate);
      return {
        title: shift.user.name,
        start: startDate,
        end: endDate,
        allDay: true,
      };
    }).flat();
    return [...onCallEvents];
  }, [data]);

  const showNoDataMessage = useMemo(() => {
    if (!data?.callShifts?.length) {
      const currentMonth = moment();
      const selectedMonth = moment(currentDate);
      
      if (selectedMonth.isBefore(currentMonth, 'month')) {
        return 'warning';
      } else if (selectedMonth.isAfter(currentMonth, 'month')) {
        return 'error';
      }
    }
    return null;
  }, [currentDate, data]);

  // Custom day renderer for the Calendar
  const dayPropGetter = useCallback((date: Date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const hasError = insufficientCoverageDays.some(day => day.date === dateStr);

    if (hasError) {
      return {
        style: {
          backgroundColor: '#ffebee', // Light red background
          border: '1px solid #ef5350', // Red border
        }
      };
    }
    return {};
  }, [insufficientCoverageDays]);

  return (
    <Box>
      <Box 
        display="flex" 
        width="100%" 
        justifyContent="space-between"
        alignItems="center" 
        height="3rem"
      >
        <Typography variant="h6" paddingLeft="1rem">
          {month} {year}
        </Typography>

        {showNoDataMessage === 'warning' && (
          <Alert severity="warning">
            No historical schedule data exists for {month} {year}.
          </Alert>
        )}
        
        {showNoDataMessage === 'error' && (
          <Alert severity="error">
            Unable to load schedule data for this month {month} {year}.
          </Alert>
        )}

        {insufficientCoverageDays.length > 0 && !showNoDataMessage && (
          <Alert severity="error">
            {insufficientCoverageDays.length} {insufficientCoverageDays.length === 1 ? 'day' : 'days'} found with insufficient coverage
          </Alert>
        )}
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
        dayPropGetter={dayPropGetter}
      />
    </Box>
  );
};

export default OnCallCalendar;