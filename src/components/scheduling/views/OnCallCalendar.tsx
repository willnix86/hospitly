import { useEffect, useState, useMemo, useCallback } from 'react';
import { Typography, Alert, Box } from '@mui/material';
import { CallScheduleData } from '@/types';
import { parseDate } from '@/services';
import BaseCalendar from '@/components/common/BaseCalendar';
import moment from 'moment';

interface DayWithError {
  date: string;
  doctorCount: number;
}

const RESIDENT_COLORS = {
  JUNIOR: '#4CAF50', // Green
  SENIOR: '#2196F3'  // Blue
};

const OnCallCalendar = ({ data }: { data: CallScheduleData }) => {
  // TODO: We don't want to allow backward navigation past account start month
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
    const onCallEvents = data.callShifts.map((shift) => {
      const startDate = parseDate(shift.date);
      const endDate = parseDate(shift.date);
      const pgyLevel = parseInt(shift.user.position.name.replace('PGY', ''));
      const isJunior = pgyLevel <= 3;
      
      return {
        title: shift.user.name,
        start: startDate,
        end: endDate,
        allDay: true,
        position: shift.user.position,
        resourceId: isJunior ? 1 : 2  // This controls the stacking order
      };
    }).flat();

    // Sort events so seniors always come second
    return onCallEvents.sort((a, b) => (a.resourceId || 0) - (b.resourceId || 0));
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

  const dayPropGetter = useCallback((date: Date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const hasError = insufficientCoverageDays.some(day => day.date === dateStr);

    if (hasError) {
      return {
        style: {
          backgroundColor: '#ffebee',
          border: '1px solid #ef5350',
        }
      };
    }
    return {};
  }, [insufficientCoverageDays]);

  const eventPropGetter = useCallback((event: any) => {
    // Move the PGY level logic here
    const pgyLevel = parseInt(event.position.name.replace('PGY', ''));
    const isJunior = pgyLevel <= 3;

    return {
      style: {
        backgroundColor: isJunior ? RESIDENT_COLORS.JUNIOR : RESIDENT_COLORS.SENIOR,
        borderRadius: '0px',
        opacity: 0.8,
        color: '#fff',
        border: '0px',
        display: 'block'
      }
    };
  }, []);

    const headerContent = (
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
  );

  return (
    <BaseCalendar
      events={events}
      date={currentDate}
      dayPropGetter={dayPropGetter}
      eventPropGetter={eventPropGetter}
      headerContent={headerContent}
      onNavigate={setCurrentDate}
    />
  );
};

export default OnCallCalendar;