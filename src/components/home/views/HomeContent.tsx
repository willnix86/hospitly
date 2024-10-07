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
import UserCalendar from './UserCalendar';
import UpcomingShifts from './UpcomingShifts';
import WorkHoursSummary from './WorkHoursSummary';
import Notifications from './Notifications';

import { User } from '../../../types';

const HomeContent = ({ user }: { user: User }) => {
  return (
    <Container maxWidth="xl">
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
            <UserCalendar userId={user.id} />
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
    </Container>
  );
};

export default HomeContent;