import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Views from "./Views";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from './styles/theme';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
const tasks = [
    {
      name: 'Task 1',
      progress: 50,
      sharedWith: ['User 1', 'User 2']
    },
    {
      name: 'Task 2',
      progress: 25,
      sharedWith: ['User 3', 'User 4']
    },
    {
      name: 'Task 3',
      progress: 75,
      sharedWith: ['User 1', 'User 4']
    }
  ];
  const task = {name: 'Task 1' , status: 'Not completed', progress: 50};
function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <Header />
                    <TaskList tasks={tasks} />
                    <TaskDetails task={task}/>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>

    );
}

export default App;
