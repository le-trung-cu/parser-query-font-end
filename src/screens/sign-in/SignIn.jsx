import { Box, Stack, TextField, Button, Checkbox, FormControlLabel, Link, FormControl } from "@mui/material";
import { useState } from "react";
import { getApi, signInByEmailAndPassword } from "../../api/api";

export const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        email: null,
        password: null,
        signInFailMessage: null,
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
            _error  = {
                ..._error,
                password: 'Password is required',
            }
        }

        setError(_error);

        return !hasError;
    }

    async function signInSubmit() {
        if (validate()) {
            const signInResult = await signInByEmailAndPassword(email, password);
            if (signInResult && signInResult.errorMessage) {
                setError({
                    ...error,
                    signInFailMessage: signInResult.errorMessage,
                });
            }
        }
    }

    return (
        <Box component="form" data-testid="sign-in" id="sign-in" maxWidth={400} margin="auto">
            <Stack direction="column" justifyContent="center" alignItems="center">
                <h1 className="text-center">Sign in</h1>

                <TextField margin="normal" fullWidth label="Email" variant="outlined"
                    placeholder="Email"
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
                <Button data-testid="btn-submit" fullWidth type="button" variant="contained" onClick={signInSubmit}>Sign In</Button>
                <Stack width="100%" direction="row" justifyContent="end">
                    <Link mt={1} align="left" href="#">Don't have an account? Sign Up</Link>
                </Stack>
            </Stack>
        </Box>
    )
}