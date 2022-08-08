import { useAuth } from "../hooks/use-auth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

export const AuthenticatedRedirect = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.authenticated) {
            const id = setTimeout(() => {
                navigate('/sign-in');
            }, 1000);
            return () => clearTimeout(id);
        }
    }, [user]);

    return user.authenticated ? children : (
    <Box  justifyContent="center" textAlign="center">
        <CircularProgress/>
    </Box>)
}