import React, {useState}from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import style from './SignIn.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignIn = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleApi = () => {
        console.log(email, password)
        axios.post('https://reqres.in/api/login',{
            email: email,
            password: password
        })
        .then(result => {
            console.log(result.data)
            navigate("/addPlace")
        })
        .catch(error => {
            console.log(error)
            alert('Error')
        })
    }
    const navigate = useNavigate();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={style.boxIn}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>

                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
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
                        value={email}
                        onChange={handleEmail}
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
                        value={password}
                        onChange={handlePassword}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember Me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant='contained'
                        sx={{ mt: 2, mb: 3 }}
                        onClick={handleApi}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item >
                            <Link to="/sign-up" variant='body2'>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default SignIn

/* https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications */