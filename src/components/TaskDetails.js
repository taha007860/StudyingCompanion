import { useState, useEffect } from "react";
import { Button, Modal, Select, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function TaskDetails() {
  // Setting up state for tasks, filter type and value, filtered tasks, edited task and share modal
  const [tasks, setTasks] = useState([
    {
      name: "Task 1",
      description: "Lorem ipsum dolor sit amet",
      dueDate: "2023-03-22",
      priority: "High",
      status: "In Progress",
    },
    {
      name: "Task 2",
      description: "consectetur adipiscing elit",
      dueDate: "2023-03-25",
      priority: "Low",
      status: "In Progress",
    },
    {
      name: "Task 3",
      description: "sed do eiusmod tempor",
      dueDate: "2023-03-27",
      priority: "Medium",
      status: "Not Started",
    },
  ]);
  const [filterType, setFilterType] = useState("status");
  const [filterValue, setFilterValue] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(null);
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState({});
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Filtering tasks based on filter type and value
  useEffect(() => {
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
    setFilteredTasks(filteredTasks.length > 0 ? filteredTasks : null);
  }, [filterType, filterValue, tasks]);

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

  // Handling input change in edited task form
  const handleInputChange =
    (key) =>
    ({ target: { value } }) => {
      setEditedTask({ ...editedTask, [key]: value });
    };
    return(
        <div>
            <h1>Task Details</h1>
            <div>
                <Select
                    value={filterType}
                    onChange={handleFilterTypeChange}
                >
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                    <option value="name">Name</option>
                    <option value="description">Description</option>
                </Select>
                <TextField
                    value={filterValue}
                    onChange={handleFilterValueChange}
                />  
                <Button onClick={handleClearFilter}>Clear Filter</Button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Priority</TableCell> 
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks &&
                            filteredTasks.map((task, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {editTaskIndex === index ? (
                                            <TextField
                                                value={editedTask.name}
                                                onChange={handleInputChange("name")}
                                            />
                                        ) : (
                                            task.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editTaskIndex === index ? (
                                            <TextField
                                                value={editedTask.description}
                                                onChange={handleInputChange("description")}
                                            />
                                        ) : (
                                            task.description
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editTaskIndex === index ? (
                                            <TextField
                                                value={editedTask.dueDate}
                                                onChange={handleInputChange("dueDate")}
                                            />
                                        ) : (
                                            task.dueDate
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editTaskIndex === index ? (
                                            <TextField
                                                value={editedTask.priority}
                                                onChange={handleInputChange("priority")}
                                            />
                                        ) : (
                                            task.priority
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editTaskIndex === index ? (
                                            <TextField
                                                value={editedTask.status}
                                                onChange={handleInputChange("status")}
                                            />
                                        ) : (
                                            task.status
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editTaskIndex === index ? (
                                            <>
                                                <Button onClick={() => handleSaveTask(index)}>Save</Button>
                                                <Button onClick={handleCancelEdit}>Cancel</Button>
                                            </>
                                        ) : (
                                            <Button onClick={() => handleEditTask(index, task)}>Edit</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={() => setIsShareModalOpen(true)}>Share</Button>
            <Modal
                open={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
            >
                <div>
                    <h1>Share</h1>
                    <TextField />
                    <Button>Share</Button>
                </div>
            </Modal>
        </div>
        );
    }
export default TaskDetails;