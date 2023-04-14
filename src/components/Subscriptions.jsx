import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Star } from '@mui/icons-material';

export const Subscriptions = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Subscriptions</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Premium Subscription" secondary="Monthly" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Gold Subscription" secondary="Annual" />
        </ListItem>
      </List>
    </Box>
  );
};
