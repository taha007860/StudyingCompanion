import React, { useState } from 'react';
import '../styles/TaskForm.css';
function TaskForm(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

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
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
            </label>
            <label>
                Date:
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
            <label>
                Status:
                <select value={status || 'Not Started'} onChange={(event) => setStatus(event.target.value)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}
export default TaskForm;