import React, { useState } from "react";
import { TextField, Box, Paper, CircularProgress, Typography } from "@mui/material";
import CallGenAI from '../Textfield/CallGenAI';
import ReactMarkdown from 'react-markdown';

function AiChat() {
    // handle llm calls
    const [value, setValue] = useState<string>(''); 
    const [submitted, setSubmitted] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            setIsLoading(true); 
            setSubmitted(''); 
            try {
                const data = await CallGenAI(value);
                if(data) {
                    setSubmitted(data);
                } else {
                    setSubmitted('no output');
                }
            } catch(error) {
                console.error("Error calling GenAI:", error);
                setSubmitted('Failed to get a response from the AI. Please try again.'); 
            } finally{
                setIsLoading(false)
            }
        }
    };

    return (
        <>
            <Paper elevation={3}
                sx = {{width: 1,
                    marginLeft: 2, 
                    marginRight: 2,
                    marginBottom: 1, 
                    padding: 2
                }}>
                    {isLoading ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '100%', margin: 2}}>
                                <CircularProgress size={30} />
                                <Typography variant="body2">
                                    Processing your request...
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ textAlign: 'left', width: '100%', fontFamily: 'monospace', padding: 2 }}>
                            <ReactMarkdown>
                                {submitted || "AI response will appear here."}
                            </ReactMarkdown>
                            </Box>
                        )}
           
            </Paper>
            <Paper elevation={3}
                sx = {{width: 1,
                    marginLeft: 2, 
                    marginRight: 2,
                    padding: 2
                }}>
            <TextField fullWidth value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    label="Enter your query"
                    sx = {{
                            borderRadius: 5,
                            variant: "filled"}}/>
            </Paper>
        </>
            ); 
}

export default AiChat;