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
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  DialogContent,
  Slider,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
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
  Timestamp,
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

  // The following are for creating a task
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [priority, setPriority] = useState(1);

  const tasklistRef = collection(db, "TaskList");
  const tasksRef = collection(db, "tasks");

  const navigate = useNavigate();

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
  const handleTaskDetails = () => {
    navigate(`/TaskList/${activeTask.id}`);
  };

  const handleShare = (task) => {
    alert(`Share task '${task.name}' with someone`);
    handleClose();
  };

  const handleEdit = (task) => {
    setEditing(true);
    setName(activeTask.data().name);
    setSharedWith(activeTask.data().sharedWith);
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
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setTaskContent("");
    setTaskName("");
    setPriority("1");
  };

  const handleSubmit = () => {
    const newTask = {
      name: taskName,
      status: "Not completed",
      date: Timestamp.now().toDate(),
      priority: priority,
      content: taskContent,
      sharedWith: [],
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
            setOpen(false);
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
          <Typography>{tasks.length}</Typography>
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
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle>Please fill out these details.</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Name"
              defaultValue="Task Name"
              type="taskName"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              required={true}
            />
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              rows={4}
              defaultValue="Write a task description here!"
              fullWidth={true}
              required={true}
              onChange={(e) => {
                setTaskContent(e.target.value);
              }}
              sx={{
                my: "1rem",
              }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
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
            <ListItemButton onClick={(e) => handleTaskDetails(e, task)}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  {auth.currentUser?.displayName?.charAt(0)}
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
