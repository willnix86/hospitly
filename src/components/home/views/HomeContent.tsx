// components/HomeContent.tsx
import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
} from '@mui/material';
import SchedulerCalendar from '../../scheduling/SchedulingCalendar';
import UpcomingShifts from '../../shifts/UpcomingShifts';
import WorkHoursSummary from '../../user/WorkHoursSummary';
import Notifications from '../../nav/Notifications';
import AdminControls from '../../admin/AdminControls';

import { User } from '../../../types';

const HomeContent = ({ user }: { user: User }) => {
  return (
    <Container maxWidth="lg">
      {/* User Info and Welcome Message */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar alt={user.name} src={user.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
        <Typography variant="h5">
          Welcome, {user.name}!
        </Typography>
        {/* Option to log out */}
        <Button variant="outlined" sx={{ ml: 'auto' }} onClick={() => alert('Logout functionality')}>
          Logout
        </Button>
      </Box>

      {/* Notifications Section */}
      <Box mt={6} mb={3}>
        <Notifications userId={user.id} />
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Shifts and Work Hours */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <UpcomingShifts userId={user.id} />
          </Paper>

          <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
            <WorkHoursSummary userId={user.id} />
          </Paper>
        </Grid>

        {/* Right Column: Calendar and Actions */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" mb={2}>
              Your Schedule
            </Typography>
            <SchedulerCalendar userId={user.id} />
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="contained" color="primary">
                Request Time Off
              </Button>
              <Button variant="contained" color="secondary">
                Request Shift Swap
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Admin Controls (only show if the user is an admin) */}
      {user.role === 'admin' && (
        <Box mt={6}>
          <AdminControls />
        </Box>
      )}
    </Container>
  );
};

export default HomeContent;