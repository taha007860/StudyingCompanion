import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField, Typography} from "@mui/material";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            <Typography variant='h3'>Welcome back!</Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={
                (e) => {
                    setEmail(e.target.value)
            }}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {
                setPassword(e.target.value);
            }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '30rem',
                mt: '1rem'
            }}>
                <Button variant="contained" onClick={handleSignIn}>
                    Login
                </Button>
                <Button variant="contained" onClick={handleGoogleSignIn}>
                    Google Login
                </Button>
            </Box>

        </Container>
    )
}

