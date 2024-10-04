// components/AdminControls.tsx
import * as React from 'react';
import { Paper, Typography, Button } from '@mui/material';

const AdminControls = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Admin Controls
      </Typography>
      <Button variant="contained" color="primary" sx={{ mr: 2 }}>
        Manage Shifts
      </Button>
      <Button variant="contained" color="secondary">
        Approve Time-Off Requests
      </Button>
    </Paper>
  );
};

export default AdminControls;