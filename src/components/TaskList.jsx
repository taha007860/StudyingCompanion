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
  Snackbar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
  const [counter, setCounter] = useState(4);
  const [name, setName] = useState("");
  const [sharedWith, setSharedWith] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskListID, setTaskListID] = useState("");
  const [activeTask, setActiveTask] = useState("");
  const [editing, setEditing] = useState(false);
  const [share, setShare] = useState(false);
  const [shareURL, setShareURL] = useState("");
  const [snack, setSnack] = useState(false);
  const [vis, setVis] = useState(false);

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
    setShareURL(`http://localhost:5173/TaskList/${activeTask.id}`);
    setShare(true);
    setVis(activeTask.data().public);
    handleClose();
  };

  const handleEdit = (task) => {
    setTaskName(activeTask.data().name);
    setTaskContent(activeTask.data().content);
    setPriority(activeTask.data().priority);
    handleClose();
    setEditing(true);
    setOpen(true);
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
    setEditing(false);
    setTaskContent("");
    setTaskName("");
    setPriority("1");
  };

  const handleSubmit = () => {
    if (editing) {
      updateDoc(doc(db, "tasks", activeTask.id), {
        name: taskName,
        content: taskContent,
        priority: priority,
      })
        .then(() => {
          update();
          handleCancel();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const newTask = {
        name: taskName,
        status: "Not completed",
        date: Timestamp.fromDate(new Date()).toDate(),
        priority: priority,
        content: taskContent,
        public: false,
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
              handleCancel();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const changeVis = () => {
    updateDoc(doc(db, "tasks", activeTask.id), {
      public: !activeTask.data().public,
    })
      .then(() => {
        setVis(!vis);
        update();
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
          <Typography variant="h5">Task List</Typography>
          <Typography>{tasks.length} Tasks</Typography>
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
              defaultValue={taskName}
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
              defaultValue={taskContent}
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
        <Dialog open={share} onClose={handleCancel}>
          <DialogTitle>Share!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please copy the link below to share this task with someone. Please
              note that the task has to either be public or the authenticated
              user's email must be added to the task.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="URL"
              defaultValue={shareURL}
              type="email"
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      navigator.clipboard
                        .writeText(shareURL)
                        .then((r) => setSnack(true));
                    }}
                  >
                    <ContentCopyIcon></ContentCopyIcon>
                  </IconButton>
                ),
              }}
            />
            <FormControlLabel
              control={<Switch checked={vis} onChange={(e) => changeVis()} />}
              label="Public"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShare(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snack}
          autoHideDuration={6000}
          onClose={() => setSnack(false)}
          message="URL Copied"
        />
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
                primary={
                  <Typography variant="h6">{task.data().name}</Typography>
                }
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Description: {task.data().content}</Typography>
                    <Box sx={{ mb: 1, ml: -18, my: ".5rem" }}>Shared with</Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", ml: -21.75 }}
                    >
                      {task.data().sharedWith.length > 0
                        ? task
                            .data()
                            .sharedWith.map((user, index) => (
                              <Avatar
                                key={index}
                                sx={{ ml: 1 }}
                                alt={user}
                                src={`https://i.pravatar.cc/32?u=${user}`}
                              />
                            ))
                        : "No one"}
                    </Box>

                    <Typography
                      sx={{
                        ml: "-1.5rem",
                      }}
                    >
                      Created on: {task.data().date.toDate().toDateString()}
                    </Typography>
                  </Box>
                }
                sx={{ ml: 2, mt: 1 }}
              />
              <Stack direction="row" alignItems="center" spacing={1}>
                <LinearProgress
                  variant="determinate"
                  value={0}
                  sx={{ width: 100 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {/*{`${task.data().progress}%`}*/}
                  0%
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
