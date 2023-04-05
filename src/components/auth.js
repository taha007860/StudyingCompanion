import {Button} from "react-bootstrap";
import '../styles/App.css';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';

const Auth = () => {
    const handleGuest = () => {
        Cookies.set("login", true)
    }

    return (
        <div className='loginContainer'>
            <p className='text-center fs-2 my-1'>Welcome!</p>
            <div>
                <div className='d-flex justify-content-between mb-1'>
                    <Link to='/auth/Login'>
                        <Button className='btn-lg'>
                            Login
                        </Button>
                    </Link>
                    <Link to='/auth/Signup'>
                        <Button className='btn-lg'>
                            Sign Up
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link to='/Timer'>
                      <Button className='btn-lg btn-secondary w-100' onClick={handleGuest}>
                        Continue as Guest
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Auth;