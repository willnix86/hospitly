import * as React from 'react';
import {
  Typography,
  Paper,
  Container,
  CircularProgress,
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import OnCallCalendar from './views/OnCallCalendar';
import ScheduleSummary from './views/ScheduleSummary';
import { CallScheduleData, User } from '@/types';
import { CalendarNavigationAction } from '@/types/CalendarToolbarTypes';
import dayjs from 'dayjs';
import CalendarToolbar from '../common/CalendarToolbar';

const SchedulingContent = ({ user }: { user: User }) => {
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const [schedules, setSchedules] = React.useState<CallScheduleData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // TODO: Update to remove hardcoded hospital and dept
  const fetchScheduleForMonth = async (date: string) => {
    try {
      const response = await fetch('/api/scheduling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          date,
          department: user.department,
          hospitalName: 'MUSC Health University Medical Center',
          action: "getCallSchedule"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch schedule');
      }

      return result.data;
    } catch (err) {
      console.error(`Error fetching schedule for ${date}:`, err);
      throw err;
    }
  };

  const fetchSchedules = React.useCallback(async () => {
    const month1 = currentDate;
    const month2 = currentDate.add(1, 'month');
    
    // First, determine which months need to be fetched
    const monthsToFetch = [month1, month2]
      .map(month => month.format('YYYY-MM'))
      .filter(monthStr => !schedules.some(s => s.month === monthStr));

    if (monthsToFetch.length === 0) {
      setLoading(false);
      return; // All schedules are already fetched
    }

    try {
      setLoading(true);
      
      // Fetch schedules for each month in parallel
      const newSchedulesPromises = monthsToFetch.map(month => fetchScheduleForMonth(month));
      const newSchedulesResults = await Promise.all(newSchedulesPromises);

      setSchedules(prevSchedules => {
        const updatedSchedules = [...prevSchedules];
        newSchedulesResults.forEach(schedule => {
          const index = updatedSchedules.findIndex(s => s.month === schedule.month);
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

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Manage Schedules
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default SchedulingContent;