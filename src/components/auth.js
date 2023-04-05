import '../styles/App.css';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
import {Button, Container, Typography} from "@mui/material";

const Auth = () => {
    const handleGuest = () => {
        Cookies.set("login", true)
    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
            width: '25rem'
        }}>
            <Typography align='center' variant='h2' my='1rem'>Welcome!</Typography>
            <Container>
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mb: '1rem'
                }} >
                    <Link to='/auth/Login'>
                        <Button variant="contained">
                            Login
                        </Button>
                    </Link>
                    <Link to='/auth/Signup'>
                        <Button variant="contained">
                            Sign Up
                        </Button>
                    </Link>
                </Container>
                <Container>
                    <Link to='/Timer'>
                      <Button variant="contained" color="secondary" onClick={handleGuest} sx={{
                            width: '100%'
                      }}>
                        Continue as Guest
                        </Button>
                    </Link>
                </Container>
            </Container>
        </Container>
    );
}

export default Auth;