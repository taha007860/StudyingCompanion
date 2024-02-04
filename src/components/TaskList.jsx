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
  InputLabel,
  Select,
  FormControl,
  Snackbar,
  Switch,
  FormControlLabel,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../models/firebase";
import { auth } from "../models/firebase";
import Image1 from "../../assets/Image1.jpg";
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
  getDoc,
} from "firebase/firestore";
import defaultTasks from "./defaultTasks";
import background from "../../assets/background.jpg";

function TaskList() {
  const [anchorEl, setAnchorEl] = useState(null);
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
  const [alert, setAlert] = useState(auth.currentUser?.isAnonymous);
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
      if (taskList?.data().tasks.length === 0) {
        setTasks([]);
      } else {
        const taskSnapshot = await getDocs(
          query(tasksRef, where(documentId(), "in", taskList.data().tasks))
        );
        taskSnapshot.forEach((task) => {
          tasks.push(task);
        });
      }
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
    try {
      if (!auth.currentUser || auth.currentUser.isAnonymous) {
        setTasks([]); // Set tasks to an empty array for Guest users
      } else {
        return update();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setActiveTask(task);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTaskDetails = (task) => {
    if (auth.currentUser?.isAnonymous) {
      console.log("hi");
    } else {
      if (activeTask) {
        navigate(`/TaskList/${activeTask.id}`);
      } else {
        navigate(`/TaskList/${task.id}`);
      }
    }
  };

  const handleShare = () => {
    setShareURL(`http://localhost:5173/TaskList/${activeTask.id}`);
    setShare(true);
    setVis(activeTask.data().public);
    handleClose();
  };

  const handleEdit = () => {
    setTaskName(activeTask.data().name);
    setTaskContent(activeTask.data().content);
    setPriority(activeTask.data().priority);
    handleClose();
    setEditing(true);
    setOpen(true);
  };

  const handleDelete = () => {
    if (auth.currentUser?.isAnonymous) {
      setTasks(tasks.filter((task) => task.id !== activeTask.id));
      handleClose();
    } else {
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
        handleClose();
    }
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
    if (auth.currentUser?.isAnonymous) {
      if (editing) {
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].id === activeTask.id) {
            tasks[i] = {
              id: activeTask.id,
              data: function () {
                return {
                  name: taskName,
                  status: "Not completed",
                  date: Timestamp.fromDate(new Date()).toDate(),
                  priority: priority,
                  content: taskContent,
                  public: false,
                  sharedWith: activeTask.data().sharedWith,
                };
              },
            };
          }
        }
        handleCancel();
      } else {
        setTasks([
          ...tasks,
          {
            id: tasks.length + 1,
            data: function () {
              return {
                name: taskName || `Task #${tasks.length + 1}`,
                status: "Not completed",
                date: Timestamp.fromDate(new Date()).toDate(),
                priority: priority,
                content: taskContent,
                public: false,
                sharedWith: [],
              };
            },
          },
        ]);
        handleCancel();
      }
    } else {
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
        console.log("Task list ID: ", taskListID);
        addDoc(tasksRef, {
          name: taskName || `Task #${tasks.length + 1}`,
          status: "Not completed",
          date: Timestamp.fromDate(new Date()).toDate(),
          priority: priority,
          content: taskContent,
          public: false,
          sharedWith: [],
        })
          .then((docRef) => {
            updateDoc(doc(db, "TaskList", taskListID), {
              tasks: arrayUnion(docRef.id),
            })
              .then(() => {
                addDoc(collection(db, "tasks", docRef?.id, "subTasks"), {
                  name: "Sample Subtask",
                  description: "This is a sample subtask. You can delete it.",
                  priority: "1",
                  dueDate: Timestamp.fromDate(new Date()).toDate(),
                  status: "Not completed",
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
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
    <div
      className="Background"
      style={{
        backgroundImage: `url(${Image1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "92.75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
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
            <Typography>
              {tasks.length} Task{tasks.length > 1 ? "s" : ""}
            </Typography>
          </Container>
          <IconButton
            size="large"
            aria-label="add task"
            onClick={handleAddTask}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <List
          sx={{
            width: "100%",
            maxWidth: 560,
            bgcolor: "background.paper",
            borderRadius: 10,
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
                Please copy the link below to share this task with someone.
                Please note that the task has to either be public or the
                authenticated user&apos;s email must be added to the task.
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
                          .then(() => setSnack(true));
                      }}
                    >
                      <ContentCopyIcon></ContentCopyIcon>
                    </IconButton>
                  ),
                }}
              />
              <FormControlLabel
                control={<Switch checked={vis} onChange={() => changeVis()} />}
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
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    transform: "translateY(-45px)",
                  }}
                >
                  {auth.currentUser?.displayName?.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6">{task.data().name}</Typography>}
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1">
                      {task.data().content && (
                        <>
                          <Box sx={{ mb: 1 }}>Description:</Box>
                          <Box sx={{ mb: 1, ml: 0 }}>{task.data().content}</Box>
                        </>
                      )}
                      Priority: {task.data().priority === 1 ? 'Low' : task.data().priority === 2 ? 'Medium' : task.data().priority === 3 ? 'High' : 'Low'}
 {/* Display the priority label */}
                    </Typography>
                    <Typography
                      sx={{
                        ml: "0rem",
                        mt: "1rem",
                      }}
                    >
                      Created on:{" "}
                      {auth.currentUser &&
                        (auth.currentUser?.isAnonymous
                          ? task?.data().date.toDateString()
                          : task?.data().date.toDate().toDateString())}
                    </Typography>
                  </Box>
                }
                sx={{ ml: 2, mt: 1 }}
              />
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
  {/* Remove the "Task Details" MenuItem */}
  <MenuItem onClick={() => handleShare()}>Share</MenuItem>
  <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
  <MenuItem onClick={(e) => handleDelete(e)}>Delete</MenuItem>
</Menu>

        </List>
      </Container>
      <Container
        sx={{
          position: "absolute",
          width: "30%",
          bottom: 0,
          left: 0,
        }}
      >
        <Snackbar open={alert} onClose={() => setAlert(false)} message="">
          <Alert
            onClose={() => setAlert(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Guest account — <strong>progress not saved!</strong>
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default TaskList;