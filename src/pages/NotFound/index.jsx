import React from 'react';
import {Box, Typography} from "@mui/material";

export default function NotFound(){
    return (
        <Box sx={{color: 'white'}}>
            <Typography variant='h3'>
                404
                NOT FOUND
            </Typography>
        </Box>
    )
}