import Header from "../components/header/Header"
import React,  { useEffect, useState } from 'react';
import CandleStick from '../components/StockChart/CandleStick'; 
import StockDataProps from '../types/StockDataProps';
import { Autocomplete, TextField } from '@mui/material';
import { stockList } from './stockList'; 
import dayjs, { Dayjs } from 'dayjs'; 

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Template () {

    const today = dayjs();
    const [tickerState, setTickerState] = useState<string | null>('MSFT');
    const [fromState, setFromState] = useState<string>(today.subtract(1, 'year').format('YYYY-MM-DD'));
    const [toState, setToState] = useState<string | null>(today.format('YYYY-MM-DD'));

    const handleTickerChange = (event: any, newValue: string | null) => {
        setTickerState(newValue);
        console.log(tickerState);
    };

    const handleToDate = (newValue: Dayjs | null) => {

        if(!newValue) {
            setToState(today.format('YYYY-MM-DD'));
        } else  {
            setToState(newValue.format('YYYY-MM-DD'));
        }
    }

    const handleFromDate = (newValue: Dayjs | null) => {

        if(!newValue) {
            setFromState(today.subtract(1, 'year').format('YYYY-MM-DD'));
        } else  {
            setFromState(newValue.format('YYYY-MM-DD'));
        }
    }

    
    const props: StockDataProps = {
        ticker: tickerState || 'MSFT',
        from: fromState,
        to: toState || today.format('YYYY-MM-DD')
    }; 

    return(
        <>
        <Header/>
        <Autocomplete
              disablePortal
              options={stockList}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Ticker" />}
              value={tickerState} 
              onChange={handleTickerChange} />
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="To Date"
          value={dayjs(toState)}
          onChange={handleToDate}
          disableFuture
        />
        <DatePicker
          label="From Date"
          value={dayjs(fromState)}
          onChange={handleFromDate}
          disableFuture
          minDate={dayjs(fromState)}
        />
        </LocalizationProvider>
        
        <CandleStick ticker={props.ticker} from={props.from} to={props.to} />
        </>

    ); 

}

export default Template;    