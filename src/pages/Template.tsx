import Header from "../components/header/Header"

import React,  { useState } from 'react';

import CandleStick from '../components/StockChart/CandleStick'; 
import StockDataProps from '../types/StockDataProps';
import { stockList } from './stockList';

import { Autocomplete, TextField, Box, CircularProgress, Typography, Paper } from '@mui/material';
import Grid from '@mui/system/Grid';

import dayjs, { Dayjs } from 'dayjs'; 


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CssBaseline from '@mui/material/CssBaseline'; 

import CallGenAI from '../components/Textfield/CallGenAI';

import SummaryTable from "../components/Summary/SummaryTable";

import LSTMCard from "../components/Lstm/LSTMCard";


function Template () {
    const today = dayjs();
    const [tickerState, setTickerState] = useState<string | null>('MSFT');
    const [fromState, setFromState] = useState<string>(today.subtract(1, 'year').format('YYYY-MM-DD'));
    const [toState, setToState] = useState<string | null>(today.format('YYYY-MM-DD'));

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

    const handleTickerChange = (event: any, newValue: string | null) => {
        setTickerState(newValue);
        console.log(tickerState);
    };

    const handleToDate = (newValue: Dayjs | null) => {
        console.log(newValue);
        setToState(newValue ? newValue.format('YYYY-MM-DD') : today.format('YYYY-MM-DD'))
    }

    const handleFromDate = (newValue: Dayjs | null) => {
        console.log(newValue);
        setFromState(newValue ? newValue.format('YYYY-MM-DD') : today.subtract(1, 'year').format('YYYY-MM-DD'))
    }

    
    const props: StockDataProps = {
        ticker: tickerState || 'MSFT',
        from: fromState,
        to: toState || today.format('YYYY-MM-DD')
    }; 

    return(
        <>
        <CssBaseline />
        <Header/>
        < Grid container spacing={2}
            sx={{
                display: 'flex', 
                flexDirection: 'column',
                gap: '10px', 
                height:'100%',
            }}
            columns={{ xs: 4, sm: 8, md: 12 }}>

        <Grid sx={{ 
            display:'flex', 
            flexDirection: 'row', 
            width:'100%',
            height:'70%',
         }}>
            <Paper elevation={3}
                    sx = {{width: 1,
                        marginLeft: 2, 
                        padding: 2
                    }}>
            < Grid container spacing={2}
                sx={{marginBottom: 2,
                    marginLeft: 1, 
                }}>
                <Grid>
                <Autocomplete
                disablePortal
                options={stockList}
                sx={{ width: 200,
                        backgroundColor: '#ffffff',
                        borderRadius: 10, 
                }}
                renderInput={(params) => <TextField {...params} label="Ticker" />}
                value={tickerState} 
                onChange={handleTickerChange} />
                </Grid>

                <Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="To Date"
                    value={dayjs(toState)}
                    onChange={handleToDate}
                    disableFuture
                    sx={{ width: 200,
                        backgroundColor: '#ffffff',
                        borderRadius: 10,
                    }}
                    />
                    </LocalizationProvider>
                </Grid>

                <Grid>    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="From Date"
                        value={dayjs(fromState)}
                        onChange={handleFromDate}
                        disableFuture
                        minDate={today.subtract(2, 'year')}
                        sx={{ width: 200,
                        backgroundColor: '#ffffff',
                        borderRadius: 10,
                    }}
                        />
                    </LocalizationProvider>
                    </Grid>
            </Grid>
            
            <Box
            sx = {{ 
                    height: 450,
                    backgroundColor: '#ffffff',
                    borderRadius: 5,
                    paddingTop: 2, 
                    marginBottom:1,
                    marginLeft: 1}}>
            <CandleStick ticker={props.ticker} from={props.from} to={props.to} />
            </Box>
        </Paper>
        
        <Grid sx={{ height:'70%', 
                    width: '100%'
         }}>
            <SummaryTable ticker = {tickerState || 'MSFT'} year = {2019} />
        </Grid>
        
        </Grid>
        <LSTMCard ticker = {tickerState || 'MSFT'} />
            <Grid sx={{ height:'30%' }}>
            <Paper elevation={3}
                sx = {{
                    width: 1,
                    marginLeft: 2, 
                    marginRight: 2,
                    marginBottom: 1,
                    padding: 2
                }}>
                    {isLoading ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CircularProgress size={30} />
                                <Typography variant="body2">
                                    Processing your request...
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'left', width: '100%' }}>
                                {submitted || "AI response will appear here."}
                            </Typography>
                        )}
           
            </Paper>
            <Paper elevation={3}
                sx = {{
                    width: 1,
                    marginLeft: 2, 
                    marginRight: 2,
                    marginBottom: 1,
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
            </Grid>
        </Grid>
        
        </>
    ); 

}

export default Template;    