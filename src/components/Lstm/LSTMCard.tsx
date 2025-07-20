import React, { useEffect, useState } from 'react'; 
import {Typography, Paper, Box, CircularProgress} from '@mui/material';
import FetchPrediction from './FetchPrediction';

interface LSTMCardProps {
  ticker: string;
}

function LSTMCard({ ticker }: LSTMCardProps) {
    const [forecast, setForecast] = useState<number>(0);
    const [latestPrice, setLatestPrice] = useState<number>(0);
    const [latestDate, setLatestDate] = useState<string>('2025-01-01');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchPrediction(ticker);
            if (data) {
                setForecast(data.forecast);
                setLatestPrice(data.latest_price);
                setLatestDate(data.latest_date);
            }
            setLoading(false);
        };
        fetchData();
    }, [ticker]);

    return(
        <Paper elevation={3}
                sx = {{width: 1,
                    marginLeft: 2, 
                    marginRight: 2,
                    padding: 2
                }}>
            
            {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress size={30} />
                    <Typography variant="body2">
                        Processing your request...
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', padding: 2, width: '100%'}}>
                <Typography variant="h6" gutterBottom>
                    Forecast for {ticker}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Forecast: {forecast}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Latest Price: {latestPrice}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Latest Date: {latestDate}
                </Typography>
            </Box>
            )}
        </Paper>
    );

}
export default LSTMCard;