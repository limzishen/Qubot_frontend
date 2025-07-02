import React, {ReactNode} from 'react'; 
import { Box, ThemeProvider, createTheme, SxProps, Theme } from '@mui/system';

type RectangleRegionProps = {
    children?: ReactNode; 
    sx?: SxProps<Theme>;
}; 

const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        }, 
        text:{
            primary: '#1735A5E', 
            secondary: '#46505A',
        }, 
        action: {
            active: '#001E3C',
        },
        success: {
            dark: '#009688',
        }, 
    },
}); 

export default function RectangleRegion({ children,sx }: RectangleRegionProps) {
    return (
        <ThemeProvider theme={theme}> 
            <Box 
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow:1, 
                    borderRadius:2, 
                    p:2, 
                    minWidth:300,
                    ...sx,
                }}
            >
                {children}
            </Box>
        </ThemeProvider>
    )
}