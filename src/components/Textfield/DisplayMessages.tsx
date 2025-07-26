import React, { useState, useEffect, useRef } from 'react';
import GetUserMessages from "./GetUserMessages";
import { 
  TextField, 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  CircularProgress,
  Paper,
  Divider
} from "@mui/material"; 
import { DialogProps } from '@mui/material/Dialog';
import { MuiMarkdown } from 'mui-markdown';

function DisplayMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const descriptionElementRef = useRef<HTMLElement>(null);

    // Focus management when dialog opens - for accessibility
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Fetch messages when dialog opens
    useEffect(() => {
        if (open) {
            const fetchMessages = async () => {
                try {
                    setLoading(true);
                    const data = await GetUserMessages();
                    setMessages(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch messages:', error);
                    setLoading(false);
                }
            };
            fetchMessages();
        }
    }, [open]);

    // Component to display each prompt/response pair
    const MessageItem = ({ prompt, response, timestamp }: { 
        prompt: string; 
        response: string; 
        timestamp?: string;
    }) => (
        <Paper 
            elevation={2} 
            sx={{ 
                p: 2, 
                mb: 2, 
                bgcolor: 'grey.50' 
            }}
        >
            <Typography variant="subtitle2" color="primary" gutterBottom>
                Prompt:
            </Typography>
            <MuiMarkdown>{prompt || 'No prompt provided'}</MuiMarkdown>
            
            <Divider sx={{ my: 1 }} />
            
            <Typography variant="subtitle2" color="secondary" gutterBottom>
                Response:
            </Typography>
            <MuiMarkdown>{response || 'No response provided'}</MuiMarkdown>
            
            {timestamp && (
                <Typography variant="caption" display="block" align="right" sx={{ mt: 1 }}>
                    {new Date(timestamp).toLocaleString()}
                </Typography>
            )}
        </Paper>
    );

    return (
        <>
            <Button 
                variant="outlined" 
                onClick={handleClickOpen}
                sx={{ margin: 1 }}
            >
                View Chat History
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="chat-history-dialog-title"
                aria-describedby="chat-history-dialog-description"
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="chat-history-dialog-title">
                    Chat History
                </DialogTitle>
                
                <DialogContent 
                    dividers={true}
                    ref={descriptionElementRef}  // This assigns the ref to the dialog content
                >
                    {loading ? (
                        <Box display="flex" justifyContent="center" p={2}>
                            <CircularProgress />
                        </Box>
                    ) : messages && messages.length > 1 ? (
                        <Box>
                            {messages.map((message, index) => (
                                <MessageItem
                                    key={index}
                                    prompt={message.prompt || 'No prompt'}
                                    response={message.reply || 'No response'}
                                    timestamp={message.created_at || message.timestamp}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                            No chat history found
                        </Typography>
                    )}
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    ); 
}

export default DisplayMessages;