import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "./components/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import {Signup} from "./components/Signup";
import {Login} from "./components/Login";
import {Home} from './components/Home';
import TaskDetails from "./components/TaskDetails";
import {useState} from "react";
const tasks = [
    {
      name: 'Task 1',
      progress: 50,
      status: 'Not completed',
      date: '4/6/2023',
      description: 'Lorem ipstum',
      sharedWith: ['User 1', 'User 2']
    },
    {
      name: 'Task 2',
      progress: 25,
      status: 'Not completed',
      date: '4/6/2023',
      description: 'Lorem ipstum',
      sharedWith: ['User 3', 'User 4']
    },
    {
      name: 'Task 3',
      progress: 75,
      status: 'Not completed',
      date: '4/6/2023',
      description: 'Lorem ipstum',
      sharedWith: ['User 1', 'User 4']
    }
  ];
const handle404 = () => {
    return (
        <p className='d-flex align-self-center justify-content-center fs-1 fw-bold'>Page not found!</p>
    );
}
const Views = () => {
    const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
    return (
        <Routes>
            <Route index element={<Navigate to='/Home' />} />
            <Route path="/auth">
                <Route index element={<Auth />} />
                <Route path='Login' element={<Login />} />
                <Route path='Signup' element={<Signup />} />
            </Route>
            <Route path='/Home' element={<Home />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/TaskList" element={<TaskList tasks={tasks} onTaskClick={handleTaskClick} />} />
                {selectedTask && <TaskDetails task={selectedTask} />}
                <Route path="/Timer" element={<Timer />} />
            </Route>
            <Route path="*" element={handle404()} />
        </Routes>
    )
}

export default Views;