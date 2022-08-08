import React, { useState } from 'react'
import { Box, TextField, Button, Link, Alert } from "@mui/material";

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import style from './SignUp.module.css';
import { useAuth } from '../../hooks/use-auth';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { signUpApi } from '../../api/api';
import { useNavigate } from 'react-router-dom';

YupPassword(yup);

let yupSchema = yup.object().shape({
    userName: yup.string().required(),
    emailAddress: yup.string().required().email(),
    password: yup.string().required()
        .min(4, 'password must contain 4 or more characters with at least one of each: uppercase, lowercase, number and special')
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character'),

})

const SignUp = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [state, setState] = useState({
        userName: 'test@gmail.com',
        emailAddress: 'test@gmail.com',
        password: 'User@123',
    })
    const [error, setError] = useState({
        summary: [],
    });

    const [showSignUpSuccessMessage, setShowSignUpSuccessMessage] = useState(false);

    function handleChangeState(event) {
        setState((currentValue) => ({
            ...currentValue,
            [event.target.name]: event.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            await yupSchema.validate(state, { abortEarly: false });
            const { data, error } = await signUpApi(state);
            if (error) {
                setError(error);
            } else {
                setShowSignUpSuccessMessage(true);
                // sign up success.
                const error = await signIn({ userNameOrEmailAddress: state.userName, password: state.password, rememberMe: true });
                if(!error){
                    navigate('/')
                }
            }
        } catch (error) {
            let errorObject = {}
            errorObject.summary = error.errors;
            setError(errorObject);
        }
    }

    return (
        <div className={style.containerSignUp}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className={style.boxUp}>
                    <h1 className='text-center'>Sign Up</h1>
                    <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
                        <ul>
                            {error?.summary?.map(item =>
                                <Box color="red" fontSize={14} component="li">{item}</Box>
                            )}
                        </ul>
                        <TextField
                            value={state.userName}
                            onChange={handleChangeState}
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Full Name"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                        />
                        <TextField
                            value={state.emailAddress}
                            onChange={handleChangeState}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email address"
                            name="emailAddress"
                            autoComplete="email"
                            autoFocus
                            type="email"
                        />
                        <TextField
                            value={state.password}
                            onChange={handleChangeState}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {showSignUpSuccessMessage && (
                            <Alert severity="success" color="info">
                                sign up was success.
                            </Alert>)}
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
        </div>
    )
}

export default SignUp