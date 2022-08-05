import { Box, Stack, TextField, Button, Checkbox, FormControlLabel, Link, Alert } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

export const SignIn = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        email: null,
        password: null,
        signInFailMessage: null,
        summary: [],
    });

    function validate() {

        let hasError = false;
        setError({
            email: null,
            password: null,
            signInFailMessage: null,
        });
        let _error = {
            email: null,
            password: null,
            signInFailMessage: null,
        };


        if (email.length === 0) {
            hasError = true;
            _error = {
                ..._error,
                email: 'Email is required',
            }
        }

        if (password.length === 0) {
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
            const { error } = await signIn({ userNameOrEmailAddress: email, password });
            if (error) {
                setError((current) => ({ ...current, summary: [error.message] }))
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
                    onChange={(e) => setEmail(e.target.value)}
                    error={error.email != null}
                    helperText={error.email} />

                <TextField margin="normal" fullWidth label="Password" variant="outlined"
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    error={error.password != null}
                    helperText={error.password} />

                <Box marginBottom={3} width="100%">
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                    {error.signInFailMessage && <Box color={'red'} marginY={1}>
                        <span>{error.signInFailMessage}</span>
                    </Box>
                    }
                </Box>
                {error?.summary?.length > 0 && (
                    <Box marginBottom={1}>
                        <Alert severity="error" color="error">
                            <ul>
                                {error?.summary?.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </Alert>
                    </Box>
                )}
                <Button data-testid="btn-submit" fullWidth type="button" variant="contained" onClick={signInSubmit}>Sign In</Button>
                <Stack width="100%" direction="row" justifyContent="end">
                    <Link mt={1} align="left" href="#">Don't have an account? Sign Up</Link>
                </Stack>
            </Stack>
        </Box>
    )
}