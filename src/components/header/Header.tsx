import * as React from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Tooltip, IconButton} from "@mui/material";
import MenuIcon from "./MenuIcon.tsx"; 

function Header() {
    return (     
        <AppBar position="fixed" margin = "10">
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
