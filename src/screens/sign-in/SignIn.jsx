import { Box, Stack, TextField, Button, Checkbox, FormControlLabel, Link, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate, Link as LinkRouter } from "react-router-dom";

export const SignIn = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [state, setState] = useState({
        email: '',
        password: '',
        rememberMe: true,
    });
    const [rememberMe, setRememberMe] = useState(false);

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [error, setError] = useState({
        email: null,
        password: null,
        signInFailMessage: null,
        summary: [],
    });

    function inputChangeHandler(event) {
        setState((current) => {
            return{ ...current, [event.target.name]: event.target.value }});
    }

    function validate() {

        let hasError = false;
        let _error = {
            email: null,
            password: null,
            signInFailMessage: null,
        };

        if (state.email.length === 0) {
            hasError = true;
            _error = {
                ..._error,
                email: 'Email is required',
            }
        }

        if (state.password.length === 0) {
            hasError = true;
            _error = {
                ..._error,
                password: 'Password is required',
            }
        }

        setError(_error);

        return !hasError;
    }

    async function signInSubmit() {
        if (validate()) {
            const { data, error } = await signIn({
                userNameOrEmailAddress: state.email,
                password: state.password,
                rememberMe,
            });
            if (error) {
                setError((current) => ({ ...current, summary: [error.message] }))
            } else {
                navigate('/');
            }
        }
    }

    return (
        <Box component="form" data-testid="sign-in" id="sign-in" maxWidth={400} margin="auto" noValidate>
            <Stack direction="column" justifyContent="center" alignItems="center">
                <h1 className="text-center">Sign in</h1>
                <TextField margin="normal" fullWidth label="User name or Email" variant="outlined"
                    placeholder="User name or Email"
                    name="email"
                    required
                    onChange={inputChangeHandler}
                    error={error.email != null}
                    helperText={error.email} />

                <TextField margin="normal" fullWidth label="Password" variant="outlined"
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                    onChange={inputChangeHandler}
                    error={error.password != null}
                    helperText={error.password} />

                <Box marginBottom={3} width="100%">
                    <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e, checked) => setRememberMe(checked)} name="rememberMe" />} label="Remember me" />
                </Box>
                {error?.summary?.length > 0 && (
                    <Box marginBottom={1}>
                        <Alert severity="error" color="error">
                            {error?.summary?.map(item => <p key={item}>{item}</p>)}
                            {/* <ul>
                            </ul> */}
                        </Alert>
                    </Box>
                )}
                <Button data-testid="btn-submit" fullWidth type="button" variant="contained" onClick={signInSubmit}>Sign In</Button>
                <Stack width="100%" direction="row" justifyContent="end">
                    <Link component={LinkRouter} mt={1} align="left" to="/sign-up">Don't have an account? Sign Up</Link>
                </Stack>
            </Stack>
        </Box>
    )
}