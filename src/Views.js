import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskList from "./components/TaskList";
import Timer from "./components/Timer";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Account } from "./components/Account";

const handle404 = () => {
	return (
		<p className="d-flex align-self-center justify-content-center fs-1 fw-bold">
			Page not found!
		</p>
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
				<Route path="/TaskList" element={<TaskList />} />
				<Route path="/Timer" element={<Timer />} />
				<Route path="/Account" element={<Account />} />
			</Route>
			<Route path="*" element={handle404()} />
		</Routes>
	);
};

export default Views;
