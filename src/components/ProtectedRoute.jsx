import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../models/firebase";
import { useState } from "react";

const ProtectedRoute = () => {
  const [user, setUser] = useState();

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return user === null ? <Navigate to="/auth" /> : <Outlet />;
};

export default ProtectedRoute;
