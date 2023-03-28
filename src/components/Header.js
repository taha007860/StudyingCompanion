import React, { useState } from 'react';
import logo from '../assets/Supernova-Logo 2.png';
import TaskForm from './TaskForm';
import '../styles/Header.css';
function Header() {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const handleShowAddTaskForm = () => {
        setShowAddTaskForm(true);
    };

    const handleCloseAddTaskForm = () => {
        setShowAddTaskForm(false);
    };

    return (
        <header>
            <img src={logo} alt="Task Manager Logo" />
            <div>
                <button className={showAddTaskForm ? 'hide' : ''} onClick={handleShowAddTaskForm}>+ Add Task</button>
                <div className="user-profile">
                    <span>User Name</span>
                    <button>Log Out</button>
                </div>
            </div>
            {showAddTaskForm && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseAddTaskForm}>&times;</span>
                        <TaskForm onAddTask={() => {}} />
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;