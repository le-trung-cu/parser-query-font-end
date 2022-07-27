import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import style from './AddPlace.module.css'
const AddPlace = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Link to="/">
                <Typography className={style.lognOut}>Logn out</Typography>
            </Link>
            <Typography className={style.titleAdd} component="h1" variant="h5">
                Add place type name
            </Typography>
            <Box component="form">
                <Grid xs={12} className={style.boxSelect}>
                    <Typography>Place type</Typography>
                    <FormControl fullWidth>
                        <InputLabel>Select</InputLabel>
                        <Select
                            labelId='select-label'
                            id='select'
                            label="Select"
                            required
                        >
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} className={style.boxText}>
                    <Typography>Place type name</Typography>
                    <TextField
                        fullWidth
                        placeholder='Type email here'
                        required
                    >
                    </TextField>
                </Grid>
                <Grid xs={12} className={style.boxText}>
                    <Button type="submit" variant="contained">submit</Button>
                </Grid>
            </Box>
        </Container>
        
    )
}

export default AddPlace

/* cancellation */