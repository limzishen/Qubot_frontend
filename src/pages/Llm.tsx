// src/pages/AITestPage.tsx
import React from 'react';
import CustomTextField from '../components/Textfield/CustomTextField'; // Make sure this path is correct
import { SideBar } from '../components/SideBar'
import Box, { BoxProps } from '@mui/material/Box';
import { GlobalStyle } from '@/styles/global'; 
import RectangleRegion from '@/components/Boxes/RectangleRegion'; 
import Grid from '@mui/material/Grid';

export default function AITestPage() {
  return (
    <Box sx={{ 
      display: 'flex',
      position: 'absolute',
      inset: 0,
      height: '100%'
     }}>
      <GlobalStyle /> 
      <Box sx={{ 
        width:'70px',
      }}> 
        <SideBar /> 
      </Box>

      <Box sx={{ 
        flexGrow: 1,
        display:'flex',
        gap:'16px',
        flexDirection:'column', 
        }}> 
        <RectangleRegion sx={{ height:'65%', }}> 
        </RectangleRegion>
        <RectangleRegion sx={{ height:'35%', color:'black' }}>
          <CustomTextField /> 
        </RectangleRegion>
      </Box>
    </Box>
    
  );
}