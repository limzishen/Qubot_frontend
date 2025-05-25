import Header from "../components/header/Header"
import React from 'react';
import { Typography, Button, Tooltip, Box } from "@mui/material";
import CandleStick from '../components/StockChart/CandleStick'; 
import StockDataProps from '../types/StockDataProps';




function Template () {
    const props: StockDataProps = {
        ticker: 'AAPL',
        from: '2024-01-01',
        to: '2025-01-31'
    }; 

    return (
        <>
            <Header />
            <CandleStick ticker={props.ticker} from={props.from} to={props.to} />
        </>
    );
}

export default Template;    