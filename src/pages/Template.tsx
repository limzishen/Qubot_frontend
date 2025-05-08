import Header from "../components/header/Header.tsx"
import React from 'react';
import { Box, Grid } from "@mui/material";
import placeholderGraph from '../placeholder-image/placeholder-graph.png'; 

function Template () {
    return (
        <>
        <Header/>
        <Grid container spacing={2} sx={{ paddingTop: '64px' }}>
        <Grid item> 
          icon
        </Grid>
        
        <Grid item> 
          <Box sx={{ backgroundColor: 'lightgreen', padding: 2 }}>
            something here that can refresh graph 
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ paddingTop: '64px' }}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} size={6}>
            <Box sx={{ width: '50%', height: 'auto', display: 'flex'}}>
                <img src = {placeholderGraph} alt = "placeholder" max-width = "20%" max-height = "100%"/> 
            </Box>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
            <Box>
                chat bot here 
            </Box>
        </Grid>
      </Grid>

      </>
    );
}

export default Template;    