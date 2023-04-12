import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

export const Settings = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Settings</Typography>
      <TextField label="Username" sx={{ marginBottom: '1rem' }} />
      <TextField label="Email" sx={{ marginBottom: '1rem' }} />
      <TextField label="Password" type="password" sx={{ marginBottom: '1rem' }} />
      <Button variant="contained" sx={{ marginBottom: '1rem' }}>Save Changes</Button>
    </Box>
  );
};
