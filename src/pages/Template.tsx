import Header from "../components/header/Header"
import React from 'react';
import { Typography, Button, Tooltip, Box } from "@mui/material";
import StockChart from "../components/StockChart/StockChart";
import { Ticker } from "../types/Ticker";  


function Template () {
    const tickerData: Ticker = {
        ticker: "AAPL",
        range: "1mo",
        interval: "1d"
    };

    return (
        <>
            <StockChart ticker={tickerData}/>
        </>
    );
}

export default Template;    