import React, { useState, useEffect } from 'react';
import {auth} from '../models/firebase';
import { Avatar, Typography, Box, Button } from '@mui/material';
import { Settings } from './Settings';
import { PaymentMethods } from './PaymentMethods';
import {Subscriptions} from './Subscriptions';
import {Notification} from './Notification';
import { deleteUser } from "firebase/auth";
export const Account = () => {
  const handleDelete = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        auth.signOut().then((r) => console.log(r));
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut();
    alert("logged out");
  };
  const handleSettings = () => {
    setShowSettings(!showSettings);
  };
  const handlePaymentMethods = () => {
    setShowPaymentMethods(!showPaymentMethods);
  };
  const handleSubscriptions = () => {
    setShowSubscriptions(!showSubscriptions);
  };
  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      {user && user.photoURL && (
        <Avatar src={user.photoURL} alt="Profile" sx={{ width: '128px', height: '128px', marginBottom: '1rem' }} />
      )}
      {user && user.displayName && (
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>{user.displayName}</Typography>
      )}
      {user && user.email && (
        <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>{user.email}</Typography>
      )}
      <Button variant="contained" sx={{ marginBottom: '1rem' }} onClick={handleSettings}>Settings</Button>
      <Button variant="contained" sx={{ marginBottom: '1rem' }} onClick={handlePaymentMethods}>Payment Methods</Button>
      <Button variant="contained" sx={{ marginBottom: '1rem' }} onClick={handleSubscriptions}>Subscriptions</Button>
      <Button variant="contained" sx={{ marginBottom: '1rem' }} onClick={handleNotifications}>Notifications</Button>
      <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
      <Button
        variant="contained"
        onClick={handleDelete}
        sx={{
          my: "3rem",
        }}
      >
        Delete Account
      </Button>
      {showSettings && <Settings />}
      {showPaymentMethods && <PaymentMethods />}
      {showSubscriptions && <Subscriptions />}
      {showNotifications && <Notification />}
    </Box>
  );
};

