import { Stack, Link, Button, Modal, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const style = {
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
            <Stack direction="row" justifyContent="flex-end" spacing={2} padding={2} alignItems="center">
                <Link variant='button' component={RouteLink} to="add-place">add place</Link>
                {!user?.authenticated && <Link variant='button' component={RouteLink} to="sign-in">sign in</Link>}
                {user?.authenticated && <Button onClick={() => setIsShowConfirmSignOutModal(true)} variant='button'>sign out</Button>}
                <Link variant='button' component={RouteLink} to="sign-in">{user?.userName}</Link>
            </Stack>
            <Modal
                open={isShowConfirmSignOutModal}
                onClose={() => setIsShowConfirmSignOutModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography marginBottom={5} id="modal-modal-title" variant="h6" component="h2">
                        Confirm sign out
                    </Typography>

                    <Button variant='contained' color='warning' onClick={signOutConfirm}>Confirm</Button>
                </Box>
            </Modal>

        </>

    )
}