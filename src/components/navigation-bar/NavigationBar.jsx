import { Stack, Button, Modal, Box, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import style from './NavigationBar.module.css';

const modalStyle = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const NavigationBar = () => {
    const { user, signOut } = useAuth();
    const [isShowConfirmSignOutModal, setIsShowConfirmSignOutModal] = useState(false);

    async function signOutConfirm() {
        await signOut();
        setIsShowConfirmSignOutModal(false);
    }

    return (
        <>
            <Stack direction="row" justifyContent="flex-end" spacing={2} padding={2} maxWidth={1100} alignItems="center">
                {user.authenticated &&
                    <Alert severity="success" color="info">
                        Hi {user?.userName}
                    </Alert>
                }
                <NavLink className={({ isActive }) => isActive ? style.activeLink : style.unactiveLink} to="add-place">
                    <Button>add place</Button>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? style.activeLink : style.unactiveLink} to='/review-place'>
                    <Button>Review</Button>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? style.activeLink : style.unactiveLink} to="/list-place">
                    <Button>Place List</Button>
                </NavLink>
                {!user?.authenticated && (
                    <NavLink className={({ isActive }) => isActive ? style.activeLink : style.unactiveLink} to="/sign-in">
                        <Button>Sign in</Button>
                    </NavLink>)}
                {!user?.authenticated && (
                    <NavLink className={({ isActive }) => isActive ? style.activeLink : style.unactiveLink} to="/sign-up">
                        <Button>Sign up</Button>
                    </NavLink>)}
                {user?.authenticated && <Button onClick={() => setIsShowConfirmSignOutModal(true)} variant='button'>sign out</Button>}
            </Stack>
            <Modal
                open={isShowConfirmSignOutModal}
                onClose={() => setIsShowConfirmSignOutModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography marginBottom={5} id="modal-modal-title" variant="h6" component="h2">
                        Confirm sign out
                    </Typography>

                    <Button variant='contained' color='warning' onClick={signOutConfirm}>Confirm</Button>
                </Box>
            </Modal>
        </>
    )
}