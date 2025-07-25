import * as React from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import MenuIcon from "./MenuIcon"; 
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation(); 
    const navigate = useNavigate(); 

    const handleDashBoardClick = () => {
        navigate('/dashboard'); 
    }

    const handleHomeClick = () => {
        navigate('/navigate')
    }

    const shouldDisableButtons = location.pathname === '/';

    return (     
        <AppBar position="static" 
        sx={{   margin: 1,
                width: '100%', 
                borderRadius: 29, 
                marginTop: 1, 
                marginBottom: 2,
                backgroundColor: '#1B1A55'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuIcon/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#FFFFFF !important',
                            textDecoration: 'none',
                        }}
                    >
                        Qubot
                    </Typography>
                    {!shouldDisableButtons && (
                        <>
                    <Button
                        variant="outlined" 
                        color="inherit" 
                        onClick={handleHomeClick}
                        sx={{
                            mr: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                                borderColor: 'rgba(255, 255, 255, 0.7)',  
                            },
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleDashBoardClick}
                        sx={{
                            mr: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'rgba(255, 255, 255, 0.7)',
                            },
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        Dashboard
                    </Button>
                    </> 
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
