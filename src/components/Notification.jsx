import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { Notifications } from '@mui/icons-material';

export const Notification = () => {
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    sms: true
  });

  const handleNotificationChange = (event) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Notifications</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Email" />
          <Checkbox
            checked={notifications.email}
            onChange={handleNotificationChange}
            name="email"
            color="primary"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Push Notifications" />
          <Checkbox
            checked={notifications.push}
            onChange={handleNotificationChange}
            name="push"
            color="primary"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="SMS" />
          <Checkbox
            checked={notifications.sms}
            onChange={handleNotificationChange}
            name="sms"
            color="primary"
          />
        </ListItem>
      </List>
    </Box>
  );
};
