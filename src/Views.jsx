import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Account } from "./components/Account";
import { Typography } from "@mui/material";

const handle404 = () => {
  return (
    <Typography variant="h3" align="center">
      Page not Found!
    </Typography>
  );
};
const Views = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/Home" />} />
      <Route path="/auth">
        <Route index element={<Auth />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Route>
      <Route path="/Home" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/Timer" element={<Timer />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/TaskList" element={<TaskList />} />
      </Route>
      <Route path="*" element={handle404()} />
    </Routes>
  );
};

export default Views;