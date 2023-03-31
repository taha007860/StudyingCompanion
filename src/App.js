import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, useParams} from 'react-router-dom';
import Header from './components/Header';
import TaskList from './components/TaskList';
import LoginScreen from "./auth/LoginScreen";
import Timer from './components/Timer';
import ProtectedRoute from "./auth/ProtectedRoute";
import Views from "./Views";

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Views />
        </BrowserRouter>
    );
}

export default App;
