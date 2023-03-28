import React from 'react';
import TaskList from './components/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<TaskList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
