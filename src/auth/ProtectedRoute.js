import Cookies from 'js-cookie';
import {Navigate, Outlet} from "react-router-dom";

const useAuth = () => {
    console.log(Cookies.get('login'));
    return (Cookies.get('login') === 'true');
}
const ProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to='/Login' />;
}

export default ProtectedRoute;