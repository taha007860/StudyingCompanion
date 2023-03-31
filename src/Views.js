import {Navigate, Route, Routes} from "react-router-dom";
import LoginScreen from "./auth/LoginScreen";
import ProtectedRoute from "./auth/ProtectedRoute";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";

const handle404 = () => {
    return (
        <p className='d-flex align-self-center justify-content-center fs-1 fw-bold'>Page not found!</p>
    );
}
const Views = () => {
    return (
        <Routes>
            <Route index element={<Navigate to='/Login' /> } />
            <Route path="/Login" element={<LoginScreen />} />
            <Route element={<ProtectedRoute />}>

                <Route path="/TaskList" element={<TaskList />}/>
                <Route path="/Timer" element={<Timer />}/>
            </Route>
            <Route path="*" element={handle404()} />
        </Routes>
    )
}

export default Views;