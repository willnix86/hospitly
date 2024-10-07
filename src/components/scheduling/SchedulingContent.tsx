// pages/admin/manage-schedules.tsx
import * as React from 'react';
import {
  Typography,
  Paper,
  Container
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import OnCallCalendar from './views/OnCallCalendar';
import ScheduleSummary from './views/ScheduleSummary';
import { Schedule, User } from '@/types';
import { CalendarNavigationAction } from '@/types/CalendarToolbarTypes';
import dayjs from 'dayjs';
import CalendarToolbar from '../CalendarToolbar';

// Dummy data for residents on call, vacations, and admin days
const mockUser1: User = { id: 1, name: 'Dr. Smith', role: 'resident', avatar: 'avatar1.png' };
const mockUser2: User = { id: 2, name: 'Dr. Johnson', role: 'resident', avatar: 'avatar2.png' };
const mockUser3: User = { id: 3, name: 'Dr. Patel', role: 'resident', avatar: 'avatar3.png' };
const mockUser4: User = { id: 4, name: 'Dr. Brown', role: 'resident', avatar: 'avatar4.png' };
const mockUser5: User = { id: 5, name: 'Dr. Green', role: 'resident', avatar: 'avatar5.png' };

const mockScheduleData: { [key: string]: Schedule } = {
  '2024-10': {
    month: 'October',
    year: '2024',
    onCall: {
      '2024-10-01': [mockUser1, mockUser2],
      '2024-10-02': [mockUser3],
      '2024-10-03': [mockUser4],
      '2024-10-04': [mockUser5, mockUser1],
    },
    vacations: [
      { user: mockUser1, startDate: '2024-10-10', endDate: '2024-10-15' },
      { user: mockUser3, startDate: '2024-10-20', endDate: '2024-10-25' },
    ],
    adminDays: [
      { user: mockUser2, date: '2024-10-05' },
      { user: mockUser4, date: '2024-10-12' },
    ],
  },
  '2024-11': {
    month: 'November',
    year: '2024',
    onCall: {
      '2024-11-01': [mockUser2],
      '2024-11-02': [mockUser3, mockUser1],
      '2024-11-03': [mockUser4, mockUser5],
      '2024-11-04': [mockUser1, mockUser3],
    },
    vacations: [
      { user: mockUser2, startDate: '2024-11-15', endDate: '2024-11-20' },
      { user: mockUser5, startDate: '2024-11-10', endDate: '2024-11-12' },
    ],
    adminDays: [
      { user: mockUser3, date: '2024-11-10' },
      { user: mockUser1, date: '2024-11-18' },
    ],
  },
  '2024-12': {
    month: 'December',
    year: '2024',
    onCall: {
      '2024-12-01': [mockUser4],
      '2024-12-02': [mockUser5, mockUser2],
      '2024-12-03': [mockUser1, mockUser3],
      '2024-12-04': [mockUser2, mockUser4],
    },
    vacations: [
      { user: mockUser4, startDate: '2024-12-05', endDate: '2024-12-10' },
      { user: mockUser3, startDate: '2024-12-15', endDate: '2024-12-20' },
    ],
    adminDays: [
      { user: mockUser5, date: '2024-12-08' },
      { user: mockUser2, date: '2024-12-22' },
    ],
  },
  '2025-01': {
    month: 'January',
    year: '2025',
    onCall: {
      '2025-01-01': [mockUser5, mockUser1],
      '2025-01-02': [mockUser3, mockUser4],
      '2025-01-03': [mockUser2],
      '2025-01-04': [mockUser1, mockUser5],
    },
    vacations: [
      { user: mockUser1, startDate: '2025-01-10', endDate: '2025-01-15' },
      { user: mockUser4, startDate: '2025-01-20', endDate: '2025-01-25' },
    ],
    adminDays: [
      { user: mockUser3, date: '2025-01-12' },
      { user: mockUser5, date: '2025-01-18' },
    ],
  },
};

const SchedulingContent = ({ schedules }: { schedules: Schedule[] }) => {
  const [currentDate, setCurrentDate] = React.useState(dayjs());

  const handleCalendarNavigation = (action: CalendarNavigationAction) => {
    switch (action) {
      case CalendarNavigationAction.PREV:
        // Logic for navigating to the previous month
        setCurrentDate((date) => date.subtract(1, 'month'));
        break;
  
      case CalendarNavigationAction.NEXT:
        // Logic for navigating to the next month
        setCurrentDate((date) => date.add(1, 'month'));
        break;
  
      case CalendarNavigationAction.TODAY:
        // Logic for navigating to today's date
        setCurrentDate(dayjs());
        break;
  
      default:
        console.log('Unknown action');
        break;
    }
  };

  const currentMonth1 = currentDate.format('YYYY-MM');
  const currentMonth2 = currentDate.add(1, 'month').format('YYYY-MM');

  const currentSchedule1 = mockScheduleData[currentMonth1] || { month: currentDate.format('MMMM'), year: currentDate.format('YYYY'), onCall: {}, vacations: [], adminDays: [] };
  const currentSchedule2 = mockScheduleData[currentMonth2] || { month: currentDate.add(1, 'month').format('MMMM'), year: currentDate.add(1, 'month').format('YYYY'), onCall: {}, vacations: [], adminDays: [] };

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
            <OnCallCalendar schedule={currentSchedule1} />
          </Paper>
          <ScheduleSummary schedule={currentSchedule1} />
        </Grid>

        {/* Second Month Calendar */}
        <Grid size={{ xs:12, md:6 }}>
          <Paper elevation={3} sx={{ width: '100%' }}>
            <OnCallCalendar schedule={currentSchedule2} />
          </Paper>
          <ScheduleSummary schedule={currentSchedule2} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SchedulingContent;