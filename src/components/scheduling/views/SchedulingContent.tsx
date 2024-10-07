// pages/admin/manage-schedules.tsx
import * as React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import OnCallCalendar from './OnCallCalendar';
import ScheduleSummary from './ScheduleSummary';

import { Schedule, User } from '@/types';

// Dummy data for residents on call, vacations, and admin days
const mockUser1: User = { id: 1, name: 'Dr. Smith', role: 'resident', avatar: 'avatar1.png' };
const mockUser2: User = { id: 2, name: 'Dr. Johnson', role: 'resident', avatar: 'avatar2.png' };
const mockUser3: User = { id: 3, name: 'Dr. Patel', role: 'resident', avatar: 'avatar3.png' };

const mockScheduleData: { [month: string]: Schedule } = {
  month1: {
    month: 'October',
    year: '2024',
    onCall: {
      '2024-10-01': [mockUser1, mockUser2],
      '2024-10-02': [mockUser3],
      // Add more days
    },
    vacations: [
      { user: mockUser1, startDate: '2024-10-10', endDate: '2024-10-15' },
      { user: mockUser3, startDate: '2024-10-20', endDate: '2024-10-25' },
    ],
    adminDays: [
      { user: mockUser2, date: '2024-10-05' },
    ],
  },
  month2: {
    month: 'November',
    year: '2024',
    onCall: {
      '2024-11-01': [mockUser2],
      '2024-11-02': [mockUser3, mockUser1],
      // Add more days
    },
    vacations: [
      { user: mockUser2, startDate: '2024-11-15', endDate: '2024-11-20' },
    ],
    adminDays: [
      { user: mockUser3, date: '2024-11-10' },
    ],
  },
};

const SchedulingContent = ({ schedules }: { schedules: Schedule[] }) => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Manage Schedules
      </Typography>
      <Grid container spacing={4}>
        {/* First Month Calendar */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
            <OnCallCalendar
              schedule={mockScheduleData.month1}
            />
          </Paper>

          {/* Resident Summary for Month 1 */}
          <ScheduleSummary
            schedule={mockScheduleData.month1}
          />
        </Grid>

        {/* Second Month Calendar */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
            <OnCallCalendar
              schedule={mockScheduleData.month2}
            />
          </Paper>

          {/* Resident Summary for Month 2 */}
          <ScheduleSummary
            schedule={mockScheduleData.month2}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SchedulingContent;