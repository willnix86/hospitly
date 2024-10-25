import * as React from 'react';
import {
  Typography,
  Paper,
  Container,
  CircularProgress
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import OnCallCalendar from './views/OnCallCalendar';
import ScheduleSummary from './views/ScheduleSummary';
import { CallScheduleData } from '@/types';
import { CalendarNavigationAction } from '@/types/CalendarToolbarTypes';
import dayjs from 'dayjs';
import CalendarToolbar from '../CalendarToolbar';

const SchedulingContent = () => {
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const [schedules, setSchedules] = React.useState<CallScheduleData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSchedules = React.useCallback(async () => {
    const startDate = currentDate.startOf('month');
    const endDate = currentDate.add(2, 'month').endOf('month');
    
    // Check if we already have the schedules for these months
    const missingMonths = [];
    for (let month = startDate; month.isBefore(endDate); month = month.add(1, 'month')) {
      const monthStr = month.format('YYYY-MM');
      if (!schedules.some(s => s.month === monthStr)) {
        missingMonths.push(monthStr);
      }
    }

    if (missingMonths.length === 0) {
      setLoading(false);
      return; // All schedules are already fetched
    }

    const url = `/api/schedules?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newSchedules: CallScheduleData = await response.json();
      setSchedules(prevSchedules => {
        const updatedSchedules: CallScheduleData[] = [...prevSchedules];
        Object.entries(newSchedules).forEach(([month, schedule]) => {
          const index = updatedSchedules.findIndex(s => s.month === month);
          if (index !== -1) {
            updatedSchedules[index] = schedule;
          } else {
            updatedSchedules.push(schedule);
          }
        });
        return updatedSchedules;
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch schedules');
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  }, [currentDate, schedules]);

  React.useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const handleCalendarNavigation = (action: CalendarNavigationAction) => {
    switch (action) {
      case CalendarNavigationAction.PREV:
        setCurrentDate((date) => date.subtract(1, 'month'));
        break;
      case CalendarNavigationAction.NEXT:
        setCurrentDate((date) => date.add(1, 'month'));
        break;
      case CalendarNavigationAction.TODAY:
        setCurrentDate(dayjs());
        break;
      default:
        console.log('Unknown action');
        break;
    }
  };

  const currentMonth1 = currentDate.format('YYYY-MM');
  const currentMonth2 = currentDate.add(1, 'month').format('YYYY-MM');

  const currentSchedule1 = schedules.find(s => s.month === currentMonth1) || { 
    month: currentMonth1,
    callShifts: [],
    vacationDays: [],
    adminDays: []
  };
  const currentSchedule2 = schedules.find(s => s.month === currentMonth2) || {
    month: currentMonth2,
    callShifts: [],
    vacationDays: [],
    adminDays: []
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Manage Schedules
      </Typography>

      <CalendarToolbar date={currentDate.toDate()} onNavigate={handleCalendarNavigation} />

      <Grid container spacing={4}>
        {/* First Month Calendar */}
        <Grid size={{ xs:12, md:6 }}>
          <Paper elevation={3} sx={{ width: '100%' }}>
            <OnCallCalendar data={currentSchedule1} />
          </Paper>
          <ScheduleSummary data={currentSchedule1} />
        </Grid>

        {/* Second Month Calendar */}
        <Grid size={{ xs:12, md:6 }}>
          <Paper elevation={3} sx={{ width: '100%' }}>
            <OnCallCalendar data={currentSchedule2} />
          </Paper>
          <ScheduleSummary data={currentSchedule2} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SchedulingContent;