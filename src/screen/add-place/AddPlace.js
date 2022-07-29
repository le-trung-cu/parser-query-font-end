import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import style from './AddPlace.module.css'
const AddPlace = () => {
   const options = [
    { name:'car', label:'Xe cộ'},
    { name:'car_dealer', label:'Đại lý xe oto'},
    { name:'motorcycle_dealer', label:'Đại lý xe máy'},
    { Name: 'bicycle_store', label:'Đại lý xe đạp'}

   ]
    return (
        <Container component="main" maxWidth="xs">
            <Link to="/">
                <Typography className={style.lognOut}>Logn out</Typography>
            </Link>
            <Typography className={style.titleAdd} component="h1" variant="h5">
                Add place type name
            </Typography>
            <Box component="form">
                <Grid  className={style.boxSelect}>
                    <Typography>Place type</Typography>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={options}
                            renderInput={(params)=>
                            <TextField
                                {...params}
                                label="Select"
                                required
                            />}
                        />
                    </FormControl>
                </Grid>
                <Grid  className={style.boxText}>
                    <Typography>Place type name</Typography>
                    <TextField
                        fullWidth
                        placeholder='Type email here'
                        required
                    >
                    </TextField>
                </Grid>
                <Grid  className={style.boxText}>
                    <Button type="submit" variant="contained">submit</Button>
                </Grid>
            </Box>
        </Container>
        
    )
}

export default AddPlace

/* cancellation */