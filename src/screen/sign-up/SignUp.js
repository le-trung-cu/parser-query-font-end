import React from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import style from './SignUp.module.css';

const handleSubmit = (event) => {
    event.preventDefault();
}

const SignUp = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={style.boxUp}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Full Name"
                        name="fullname"
                        autoComplete="fullname"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant='contained'
                        sx={{ mt: 2, mb: 3 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item >
                            <Link to="/" variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp