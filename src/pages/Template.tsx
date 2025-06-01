import Header from "../components/header/Header"
import React,  { useState } from 'react';
import CandleStick from '../components/StockChart/CandleStick'; 
import StockDataProps from '../types/StockDataProps';
import { Autocomplete, TextField, Box } from '@mui/material';
import { stockList } from './stockList'; 
import dayjs, { Dayjs } from 'dayjs'; 
import Grid from '@mui/system/Grid';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CssBaseline from '@mui/material/CssBaseline'; 
import { useTheme } from '@mui/material/styles';
import CustomTextField from "../components/Textfield/CustomTextField";

function Template () {

    const theme = useTheme();
    const today = dayjs();
    const [tickerState, setTickerState] = useState<string | null>('MSFT');
    const [fromState, setFromState] = useState<string>(today.subtract(1, 'year').format('YYYY-MM-DD'));
    const [toState, setToState] = useState<string | null>(today.format('YYYY-MM-DD'));

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
            sx={{marginBottom: 2,
                marginLeft: 1
            }}>
            <Grid>
            <Autocomplete
              disablePortal
              options={stockList}
              sx={{ width: 200,
                    backgroundColor: theme.palette.primary.main,
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
                    backgroundColor: theme.palette.primary.main,
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
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 10,
                }}
                    />
                </LocalizationProvider>
                </Grid>
        </Grid>
        
        <Box
        sx = {{ width: 4/9, 
                height: 450,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 5,
                paddingTop: 2, 
                marginLeft: 1}}>
        <CandleStick ticker={props.ticker} from={props.from} to={props.to} />
        </Box>
        <Box>
            <CustomTextField />
        </Box>
        </>
    ); 

}

export default Template;    