import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";

const ProtectedRoute = () => {
	return !(auth.currentUser === null) ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
