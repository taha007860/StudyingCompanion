import React, { useState, useEffect } from "react";
import { auth, db } from "../models/firebase";
import {
  Avatar,
  Typography,
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const Account = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(0);
  let counter = {};

  const update = () => {
    const fetch = async () => {
      const taskSnapshot = await getDocs(
        query(
          collection(db, "Timer"),
          where("UserID", "==", auth.currentUser?.uid)
        )
      );
      taskSnapshot.forEach((task) => {
        counter = task.data();
      });
    };
    fetch().then(() => {
      console.log(counter);
      setTime(
        counter?.Worktime != null
          ? Number((counter.Worktime / 60).toFixed(2))
          : 0
      );
    });
  };

  useEffect(() => {
    return update();
  }, []);

  const data = [
    {
      name: auth.currentUser?.displayName,
      "Time Spent": time,
    },
    {
      name: "User 2",
      "Time Spent": 10,
    },
    {
      name: "User 3",
      "Time Spent": 21,
    },
    {
      name: "Average",
      "Time Spent": 18,
    },
  ];

  const handleDelete = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        auth.signOut().then((r) => console.log(r));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        alert("logged out");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      {user && user.photoURL && (
        <Avatar
          src={user.photoURL}
          alt="Profile"
          sx={{ width: "128px", height: "128px", marginBottom: "1rem" }}
        />
      )}
      {user && user.displayName && (
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          {user.displayName}
        </Typography>
      )}
      {user && user.email && (
        <Typography variant="subtitle1" sx={{ marginBottom: "2rem" }}>
          {user.email}
        </Typography>
      )}
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        sx={{
          my: "3rem",
        }}
      >
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can <strong>NOT</strong> be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={() => handleDelete()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="min" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Time Spent" fill="#8884d8" />
        </BarChart>
      </Box>
    </Box>
  );
};
