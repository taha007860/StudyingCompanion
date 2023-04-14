import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CreditCard } from '@mui/icons-material';

export const PaymentMethods = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Payment Methods</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CreditCard />
          </ListItemIcon>
          <ListItemText primary="**** **** **** 1234" secondary="Visa" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CreditCard />
          </ListItemIcon>
          <ListItemText primary="**** **** **** 5678" secondary="Mastercard" />
        </ListItem>
      </List>
    </Box>
  );
};
