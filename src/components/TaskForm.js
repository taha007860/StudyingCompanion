import React, {useState} from 'react';
import '../styles/TaskForm.css';

function TaskForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const handleShowAddTaskForm = () => {
        setShowAddTaskForm(true);
    };

    const handleCloseAddTaskForm = () => {
        setShowAddTaskForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            name,
            description,
            date,
            status
        };
        props.onAddTask(newTask);
        setName('');
        setDescription('');
        setDate('');
        setStatus('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <button className={showAddTaskForm ? 'hide' : ''} onClick={handleShowAddTaskForm}>Add Task +</button>
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)}/>
            </label>
            <label>
                Date:
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
            </label>
            <label>
                Status:
                <select value={status || 'Not Started'} onChange={(event) => setStatus(event.target.value)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </label>
            <input type="submit" value="Submit"/>
        </form>

    // {showAddTaskForm && (
    //     <div className="modal">
    //         <div className="modal-content">
    //             <span className="close" onClick={handleCloseAddTaskForm}>&times;</span>
    //             <TaskForm onAddTask={() => {
    //             }}/>
    //         </div>
    //     </div>
    // )}
    );
}

export default TaskForm;