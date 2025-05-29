import * as React from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Tooltip, IconButton} from "@mui/material";
import MenuIcon from "./MenuIcon"; 

function Header() {
    return (     
        <AppBar position="static" 
        sx={{   margin: '0px',
                width: '100%', 
                borderRadius: 29, 
                marginBottom: 2,
                backgroundColor: '#1B1A55'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MenuIcon/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Qubot
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
