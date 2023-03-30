import React, {useEffect, useState} from "react";
import '../styles/TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([
        {
            name: 'Task 1',
            description: 'Lorem ipsum dolor sit amet',
            dueDate: '2023-03-22',
            priority: 'High',
            status: 'In Progress'
        },
        {
            name: 'Task 2',
            description: 'consectetur adipiscing elit',
            dueDate: '2023-03-25',
            priority: 'Low',
            status: 'In Progress'
        },
        {
            name: 'Task 3',
            description: 'sed do eiusmod tempor',
            dueDate: '2023-03-27',
            priority: 'Medium',
            status: 'Not Started'
        }
    ]);

    const [filterType, setFilterType] = useState("status");
    const [filterValue, setFilterValue] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(null);

    const [editTaskIndex, setEditTaskIndex] = useState(-1);
    const [editedTask, setEditedTask] = useState({});

    useEffect(() => {
        const filteredTasks = tasks.filter((task) => {
            if (filterValue.trim() === "") {
                return true;
            }

            if (filterType === "status") {
                return task.status.toLowerCase().includes(filterValue.toLowerCase());
            } else if (filterType === "priority") {
                return task.priority.toLowerCase().includes(filterValue.toLowerCase());
            } else if (filterType === "name") {
                return task.name.toLowerCase().includes(filterValue.toLowerCase());
            } else if (filterType === "description") {
                return task.description.toLowerCase().includes(filterValue.toLowerCase());
            }

            return false;
        });

        setFilteredTasks(filteredTasks.length > 0 ? filteredTasks : null);
    }, [filterType, filterValue, tasks]);

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
        setFilterValue("");
        setFilteredTasks(null);
    };

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
    };

    const handleClearFilter = () => {
        setFilterType("status");
        setFilterValue("");
        setFilteredTasks(null);
    };

    const handleEditTask = (index, task) => {
        setEditTaskIndex(index);
        setEditedTask(task);
    };

    const handleSaveTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index] = editedTask;
        setTasks(newTasks);
        setEditTaskIndex(-1);
    };

    const handleCancelEdit = () => {
        setEditTaskIndex(-1);
        setEditedTask({});
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setEditedTask((prevTask) => ({...prevTask, [name]: value}));
    };

    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const filteredList = filteredTasks ? filteredTasks : tasks;

    return (
        <div>
            <h2 className="task">Task List</h2>

            <label htmlFor="filter-type">Filter By:</label>
            <select id="filter-type" value={filterType} onChange={handleFilterTypeChange}>
                <option value="status">Status</option>
                <option value="priority">Priority</option>
                <option value="name">Name</option>
                <option value="description">Description</option>
            </select>

            <label htmlFor="filter-value">Filter Value:</label>
            <input id="filter-value" type="text" value={filterValue} onChange={handleFilterValueChange}/>

            <button onClick={handleClearFilter}>Clear Filter</button>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredList.map((task, index) => (
                    <tr key={index}>
                        {editTaskIndex === index ? (
                            <React.Fragment>
                                <td>
                                    <input type="text" name="name" value={editedTask.name}
                                           onChange={handleInputChange}/>
                                </td>
                                <td>
                                    <input type="text" name="description" value={editedTask.description}
                                           onChange={handleInputChange}/>
                                </td>
                                <td>
                                    <input type="date" name="dueDate" value={editedTask.dueDate}
                                           onChange={handleInputChange}/>
                                </td>
                                <td>
                                    <select name="priority" value={editedTask.priority} onChange={handleInputChange}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="status" value={editedTask.status} onChange={handleInputChange}>
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleSaveTask(index)}>Save</button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </td>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <td>{task.name}</td>
                                <td>{task.description}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td>
                                    <button onClick={() => handleEditTask(index, task)}>Edit</button>
                                    <button onClick={() => deleteTask(index)}>Delete</button>
                                </td>
                            </React.Fragment>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;