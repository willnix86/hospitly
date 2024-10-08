// components/HomeContent.tsx
import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import UserCalendar from './views/UserCalendar';
import UpcomingShifts from './views/UpcomingShifts';
import WorkHoursSummary from './views/WorkHoursSummary';
import Notifications from './views/Notifications';

import { User } from '../../types';

const HomeContent = ({ user }: { user: User }) => {
  return (
    <Container maxWidth="xl">
      {/* Notifications Section */}
      <Box mt={6} mb={3}>
        <Notifications userId={user.id} />
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Shifts and Work Hours */}
        <Grid size={{ xs:12, md:4 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <UpcomingShifts userId={user.id} />
          </Paper>

          <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
            <WorkHoursSummary userId={user.id} />
          </Paper>
        </Grid>

        {/* Right Column: Calendar and Actions */}
        <Grid size={{ xs:12, md:8 }}>
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