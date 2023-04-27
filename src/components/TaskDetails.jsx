import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Container,
  Skeleton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
} from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Email, Facebook, Twitter, Instagram } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../models/firebase";
import styled from "styled-components";
import auth from "./auth";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const TaskDetails = () => {
  // Setting up state for tasks, filter type and value, filtered tasks, edited task and share modal
  const [tasks, setTasks] = useState([]);
  const [filterType, setFilterType] = useState("status");
  const [filterValue, setFilterValue] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState({});
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [taskID, setTaskID] = useState(useParams());
  const [mainTask, setMainTask] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const subtasksRef = collection(db, "tasks", taskID.id, "subTasks");
  const [taskName, setTaskName] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [priority, setPriority] = useState("");

  const getMainTask = async () => {
    const docRef = doc(db, "tasks", taskID.id);
    const docSnap = await getDoc(docRef);
    setMainTask(docSnap);
  };
  const update = () => {
    let tasks = [];

    getMainTask();

    const fetchTasks = async () => {
      const taskSnapshot = await getDocs(query(subtasksRef));
      taskSnapshot.forEach((task) => {
        tasks.push(task);
      });
    };

    fetchTasks()
      .then(() => {
        console.log("Successfully fetched tasks");
        setTasks(tasks);
        const filteredTasks = tasks.filter((task) => {
          if (filterValue.trim() === "") {
            return true;
          }

          if (filterType === "status") {
            return task.status
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          } else if (filterType === "priority") {
            return task.priority
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          } else if (filterType === "name") {
            return task.name.toLowerCase().includes(filterValue.toLowerCase());
          } else if (filterType === "description") {
            return task.description
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }

          return false;
        });

        // Updating filtered tasks state
        setFilteredTasks(filteredTasks.length >= 0 ? filteredTasks : null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Filtering tasks based on filter type and value
  useEffect(() => {
    return update();
  }, []);

  // Handling filter type change
  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue("");
    setFilteredTasks(null);
  };
  const StyledTableCell = styled(TableCell)`
    font-weight: bold;
    text-transform: uppercase;
  `;
  const StyledTableActionsCell = styled(TableCell)`
    display: flex;
    justify-content: space-between;
  `;
  const StyledTableButton = styled(Button)`
    margin-right: 10px;
  `;
  const TableWrapper = styled(TableContainer)`
    max-height: 500px;
    overflow-y: scroll;
  `;
  const ClearFilterButton = styled(Button)`
    margin-right: 16px;
  `;
  const ShareButton = styled(Button)`
    background-color: #1976d2;
    color: #fff;

    &:hover {
      background-color: #1565c0;
    }
  `;
  const statusColors = {
    "Not completed": "#f44336",
    "In progress": "#ff9800",
    Completed: "#4caf50",
  };

  // Handling filter value change
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Handling clear filter button click
  const handleClearFilter = () => {
    setFilterType("status");
    setFilterValue("");
    setFilteredTasks(null);
  };

  // Handling task edit button click
  const handleEditTask = (index, task) => {
    setEditTaskIndex(index);
    setEditedTask(task);
  };

  // Handling save task button click
  const handleSaveTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = editedTask;
    setTasks(newTasks);
    setEditTaskIndex(-1);
  };

  // Handling cancel edit button click
  const handleCancelEdit = () => {
    setEditTaskIndex(-1);
    setEditedTask({});
  };

  const deleteTask = (task) => {
    deleteDoc(doc(db, "tasks", taskID.id, "subTasks", task.id))
      .then((r) => {
        update();
        console.log(r);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  // Handling input change in edited task form
  const handleInputChange =
    (key) =>
    ({ target: { value } }) => {
      setEditedTask({ ...editedTask, [key]: value });
    };

  const handleCancel = () => {
    setOpen(false);
    setTaskContent("");
    setTaskName("");
    setPriority("1");
  };

  function handleSubmit() {
    addDoc(subtasksRef, {
      name: taskName || `Task #${tasks.length + 1}`,
      description: taskContent,
      priority: priority,
      dueDate: Timestamp.fromDate(new Date()).toDate(),
      status: "Not completed",
    })
      .then((r) => {
        update();
        handleCancel();
        console.log("r", r);
      })
      .catch((e) => {
        console.error(e);
      });
    setOpen(false);
  }

  return (
    <Container>
      <Dialog open={open} fullWidth={true}>
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
      <Container
        sx={{
          mt: ".5rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          my="2rem"
          onClick={() => navigate(-1)}
          endIcon={<KeyboardBackspaceIcon />}
        >
          Back
        </Button>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexGrow: 0,
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" align="center" my="1rem">
          {mainTask.data && mainTask.data().name}
        </Typography>
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "rgba(66, 66, 66, 0.3)",
              borderRadius: "10px",
            },
          }}
        >
          <ShareIcon onClick={handleShareClick} />
        </IconButton>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "vertical",
          justifyContent: "space-between",
        }}
      >
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Filter Type</InputLabel>
          <Select
            labelId="filter-type-label"
            id="filter-type"
            value={filterType}
            onChange={handleFilterTypeChange}
            label="Filter Type"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="description">Description</MenuItem>
          </Select>
        </FormControl>
        <TextField value={filterValue} onChange={handleFilterValueChange} />
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: 0,
            mx: ".2rem",
          }}
        >
          <ClearFilterButton
            onClick={handleClearFilter}
            sx={{
              mx: ".2rem",
              my: "1rem",
            }}
          >
            Clear Filter
          </ClearFilterButton>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              my: "1.2rem",
            }}
            startIcon={<AddIcon />}
          >
            Add Task
          </Button>
        </Container>
      </Container>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell style={{ paddingLeft: "60px" }}>
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks &&
              filteredTasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell>
                    {editTaskIndex === index ? (
                      <TextField
                        value={editedTask.name}
                        onChange={handleInputChange("name")}
                      />
                    ) : (
                      task.data().name
                    )}
                  </TableCell>
                  <TableCell>
                    {editTaskIndex === index ? (
                      <TextField
                        value={editedTask.data().description}
                        onChange={handleInputChange("description")}
                      />
                    ) : (
                      task.data().description
                    )}
                  </TableCell>
                  <TableCell>
                    {editTaskIndex === index ? (
                      <TextField
                        value={editedTask.dueDate}
                        onChange={handleInputChange("dueDate")}
                      />
                    ) : (
                      task.data().dueDate.toDate().toDateString()
                    )}
                  </TableCell>
                  <TableCell>
                    {editTaskIndex === index ? (
                      <TextField
                        value={editedTask.priority}
                        onChange={handleInputChange("priority")}
                      />
                    ) : (
                      task.data().priority
                    )}
                  </TableCell>
                  <TableCell>
                    {editTaskIndex === index ? (
                      <TextField
                        value={editedTask.status}
                        onChange={handleInputChange("status")}
                      />
                    ) : (
                      task.data().status
                    )}
                  </TableCell>
                  <StyledTableActionsCell>
                    {editTaskIndex === index ? (
                      <>
                        <StyledTableButton
                          onClick={() => handleSaveTask(index)}
                        >
                          Save
                        </StyledTableButton>
                        <StyledTableButton onClick={handleCancelEdit}>
                          Cancel
                        </StyledTableButton>
                      </>
                    ) : (
                      <>
                        <StyledTableButton
                          onClick={() => handleEditTask(index, task)}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </StyledTableButton>
                        <StyledTableButton
                          onClick={() => deleteTask(task)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </StyledTableButton>
                      </>
                    )}
                  </StyledTableActionsCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Container>
  );
};
