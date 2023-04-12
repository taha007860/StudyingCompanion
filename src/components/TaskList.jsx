import { AlignHorizontalCenter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Container,
  Stack,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import defaultTasks from "./defaultTasks";
import { db } from "../models/firebase";
import { auth } from "../models/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";

function TaskList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editing, setEditing] = useState(false);
  const [counter, setCounter] = useState(4);
  const [name, setName] = useState("");
  const [sharedWith, setSharedWith] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskListID, setTaskListID] = useState("");
  const [activeTask, setActiveTask] = useState("");

  const tasklistRef = collection(db, "TaskList");
  const tasksRef = collection(db, "tasks");

  const update = () => {
    let taskList;
    let tasks = [];

    const getTasksID = query(
      tasklistRef,
      where("userID", "==", auth.currentUser?.uid)
    );

    const fetchIDs = async () => {
      const querySnapshot = await getDocs(getTasksID);
      querySnapshot.forEach((doc) => {
        taskList = doc;
        setTaskListID(doc.id);
      });
    };

    const fetchTasks = async () => {
      const taskSnapshot = await getDocs(
        query(tasksRef, where(documentId(), "in", taskList.data().tasks))
      );
      taskSnapshot.forEach((task) => {
        console.log(task?.id);
        tasks.push(task);
      });
    };

    fetchIDs()
      .then(() => {
        console.log("Successfully fetched IDs");
        fetchTasks()
          .then(() => {
            setTasks(tasks);
            console.log("Successfully fetched tasks");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    update();
  }, []);

  const handleClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setActiveTask(task);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTaskDetails = (task) => {
    alert(`Task Details for '${task.name}'`);
    handleClose();
  };

  const handleShare = (task) => {
    alert(`Share task '${task.name}' with someone`);
    handleClose();
  };

  const handleEdit = (task) => {
    setEditing(true);
    setName(task.name);
    setSharedWith(task.sharedWith);
    handleClose();
  };

  const handleDelete = () => {
    deleteDoc(doc(db, "tasks", activeTask.id))
      .then(() => {
        updateDoc(doc(db, "TaskList", taskListID), {
          tasks: arrayRemove(activeTask.id),
        }).then((r) => {
          update();
          console.log(r);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddTask = () => {
    const newTask = {
      name: `Task ${counter}`,
      progress: 25,
      status: "Not completed",
      date: "4/7/2023",
      description: "",
      sharedWith: ["User 1", "User 4"],
    };

    console.log("Task list ID: ", taskListID);
    addDoc(tasksRef, newTask)
      .then((docRef) => {
        updateDoc(doc(db, "TaskList", taskListID), {
          tasks: arrayUnion(docRef.id),
        })
          .then(() => {
            update();
            setCounter(counter + 1);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#e3f2fd",
        border: "1px solid primary.main",
        borderRadius: 4,
        boxShadow: 2,
        marginTop: "2.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 3,
        }}
      >
        <Container>
          <Typography variant="h5">In Progress</Typography>
          <Typography> {tasks.length}</Typography>
        </Container>
        <IconButton size="large" aria-label="add task" onClick={handleAddTask}>
          <AddIcon />
        </IconButton>
      </Box>
      <Divider />
      <List
        sx={{
          width: "100%",
          maxWidth: 560,
          bgcolor: "background.paper",
        }}
      >
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="options"
                onClick={(e) => handleClick(e, task)}
              >
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  {task.data().name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={task.data().name}
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ mb: 1, ml: -18 }}>shared with</Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", ml: -17 }}
                    >
                      {task.data().sharedWith.map((user, index) => (
                        <Avatar
                          key={index}
                          sx={{ ml: 1 }}
                          alt={user}
                          src={`https://i.pravatar.cc/32?u=${user}`}
                        />
                      ))}
                    </Box>
                  </Box>
                }
                sx={{ ml: 2, mt: 1 }}
              />
              <Stack direction="row" alignItems="center" spacing={1}>
                <LinearProgress
                  variant="determinate"
                  value={task.data().progress}
                  sx={{ width: 100 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {`${task.data().progress}%`}
                </Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleTaskDetails()}>Task Details</MenuItem>
          <MenuItem onClick={() => handleShare()}>Share</MenuItem>
          <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
          <MenuItem onClick={(e) => handleDelete(e)}>Delete</MenuItem>
        </Menu>
      </List>
    </Container>
  );
}

export default TaskList;
