import { useState, useEffect } from "react";
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
} from "@mui/material";
import { Email, Facebook, Twitter, Instagram } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../models/firebase";

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

  const subtasksRef = collection(db, "tasks", taskID.id, "subTasks");

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
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
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
  return (
    <Container>
      <Typography variant="h3" align="center" my="2rem">
        {mainTask.data && mainTask.data().name}
      </Typography>
      <Container>
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="name">Name</option>
          <option value="description">Description</option>
        </select>
        <TextField value={filterValue} onChange={handleFilterValueChange} />
        <Button onClick={handleClearFilter}>Clear Filter</Button>
        <Button variant="contained" onClick={handleShareClick}>
          Share
        </Button>
      </Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell style={{ paddingLeft: "60px" }}>Actions</TableCell>
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
                  <TableCell>
                    {editTaskIndex === index ? (
                      <>
                        <Button onClick={() => handleSaveTask(index)}>
                          Save
                        </Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEditTask(index, task)}>
                          Edit
                        </Button>
                        <Button onClick={() => deleteTask(index)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*<Modal open={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}>*/}
      {/*  <div>*/}
      {/*    <Button variant="contained" startIcon={<Email />}>*/}
      {/*      Gmail*/}
      {/*    </Button>*/}
      {/*    <Button variant="contained" startIcon={<Facebook />}>*/}
      {/*      Facebook*/}
      {/*    </Button>*/}
      {/*    <Button variant="contained" startIcon={<Twitter />}>*/}
      {/*      Twitter*/}
      {/*    </Button>*/}
      {/*    <Button variant="contained" startIcon={<Instagram />}>*/}
      {/*      Instagram*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</Modal>*/}
    </Container>
  );
};
