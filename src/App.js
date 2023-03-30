import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import TaskList from './components/TaskList';
import LoginScreen from "./components/LoginScreen";
import Timer from './components/Timer';

function App() {
    const [login, setLogin] = useState(false); // Login state variables

    return (
        <BrowserRouter>
            <Header />
            {
                login ? ( // Checks if user is logged in by checking the token, redirects them to the login page if they aren't
                    <Routes>
                        <Route path="/TaskList" element={<TaskList/> }/>
                        <Route path="/Timer" element={<Timer />} />
                    </Routes>
                ) : (
                    <LoginScreen />
                )
            }

        </BrowserRouter>
    );
}

export default App;
