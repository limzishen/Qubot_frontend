import Header from "../components/header/Header.tsx"
import React from 'react';
import { Typography, Button, Tooltip, Box } from "@mui/material";
import placeholderImage from './placeholder.svg'; 

function Template () {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            `<Header/> 
            <Box 
            sx={{width: 500, 
                height: 500, 
                padding: 0, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                }}>
                <img src = {placeholderImage} alt = "placeholder"  
                    style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto' }}/>

            </Box>
            <Box sx={{
                    border: '2px solid blue',
                    margin: '0',
                    padding: '0',
                }}>
                <Typography variant="h1" align="center"
                sx={{
                    align: "center", 
                    color: "primary.main",
                }}>
                    Welcome to Qubot
                </Typography>
            </Box>`

            <Box sx={{
                    border: '2px solid blue',
                    margin: '0',
                    padding: '0',
                }}>
                <Typography variant="subtitle1" align="center"
                    sx={{
                        align: "center", 
                        color: "primary.main"
                    }}> 
                    Join Qubot to get started on your financial journey
                    </Typography>
            </Box>
            <Button> 
                Get Started 
            </Button>

        </Box>
    );
}

export default Template;    