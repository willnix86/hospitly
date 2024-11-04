// components/HomeContent.tsx
import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import UserCalendar from './views/UserCalendar';
import UpcomingShifts from './views/UpcomingShifts';
import WorkHoursSummary from './views/WorkHoursSummary';
import Notifications from './views/Notifications';

import { UserScheduleData, User } from '@/types';

const HomeContent = ({ user }: { user: User }) => {
  const date = moment()
  const [scheduleData, setScheduleData] = useState<UserScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
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
            action: "getUserSchedule"
          }),
        });
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch schedule data');
        }

        setScheduleData(result.data);
        setError(null);
      } catch (err) {
        setError('Failed to load schedule data');
        console.error('Error fetching schedule data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [user.id]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Box mt={6}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Notifications Section */}
      <Box mt={6} mb={3}>
        <Notifications notifications={scheduleData?.notifications || []} />
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Shifts and Work Hours */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <UpcomingShifts shifts={scheduleData?.shifts || []} />
          </Paper>

          <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
            <WorkHoursSummary workHours={scheduleData?.workHours || { total: 0, remaining: 80 }} />
          </Paper>
        </Grid>

        {/* Right Column: Calendar and Actions */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" mb={2}>
              Your Schedule
            </Typography>
            <UserCalendar shifts={scheduleData?.shifts || []} date={date.toDate()} />
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