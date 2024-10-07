import * as React from 'react';
import { Box, Link } from '@mui/material';
import { usePathname } from 'next/navigation';

const AdminControls = () => {
  const currentPath = usePathname();

  return (
    <Box>
      <Link
        href="/admin/scheduling"
        color={currentPath === '/admin/scheduling' ? 'secondary' : 'inherit'}
        underline="hover"
        sx={{ mr: 2 }}
      >
        Manage Shifts
      </Link>
      <Link
        href="/admin/time-off-requests"
        color={currentPath === '/admin/time-off-requests' ? 'primary' : 'inherit'}
        underline="hover"
      >
        Manage Time-Off Requests
      </Link>
    </Box>
  );
};

export default AdminControls;