import React, {useState} from 'react';
import {auth, googleProvider} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {
    Button,
    Container, FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(
                navigate('/Timer')
            ); // logic that checks for a valid email needs to be implemented, just joseph
        } catch (e) {
            console.error(e);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.error(e);
        }
    }

    return (

        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '30rem',
            mt: '1rem'
        }}>
            <Typography variant='h3' my='1rem'>Welcome back!</Typography>
            <FormControl sx={{m: 1}} variant="outlined">
                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-email"
                    label="Email"
                    onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }}
                />
            </FormControl>
            <FormControl sx={{m: 1}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </FormControl>

            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '20rem',
                my: '1rem'
            }}>
                <Button variant="contained" onClick={handleSignIn} sx={{
                    m: 1
                }}>
                    Login
                </Button>
                <Button variant="contained" startIcon={<GoogleIcon/>} sx={{
                    m: 1
                }} onClick={handleGoogleSignIn}>
                    Login with Google
                </Button>
            </Container>

        </Container>
    )
}

