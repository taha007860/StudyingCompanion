import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Views from "./Views";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from './styles/theme';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import {useState} from 'react';
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
function App() {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <Header />
                    <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
                    {selectedTask && <TaskDetails task={selectedTask} />}
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>

    );
}

export default App;
