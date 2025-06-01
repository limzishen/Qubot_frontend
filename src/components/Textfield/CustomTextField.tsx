import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import CallGenAI from '../Textfield/CallGenAI';





function CustomTextField() {
    const theme = useTheme();
    const [value, setValue] = useState<string>(''); 
    const [submitted, setSubmitted] = useState('');

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const data = await CallGenAI(value);

            if(data) {
                setSubmitted(data);
            }
        
        }
    };
    
    return(
         <Box
        sx = {{ width: 4/9, 
                height: 150,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 5,
                paddingTop: 2, 
                marginLeft: 1}}>
        <TextField value={value} 
                   onChange={(e) => setValue(e.target.value)}
                   onKeyDown={handleKeyDown} 
                   sx = {{borderRadius: 5,
                            paddingTop: 2, 
                            marginLeft: 1}}/>
        <p>{submitted}</p>
        </Box>
    ); 
}

export default CustomTextField; 
