import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';

import { Ticker } from "../../types/Ticker";
import CallData from "./CallData";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type StockChartProps = {
    ticker: Ticker;
};



function StockChart({ ticker} : StockChartProps) {
    const [stockData, setStockData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });

    useEffect(
        () => {
            const fetchData = async () => {
                const data = await CallData(ticker); 

                if (
                    !data ||
                    !data.indicators ||
                    !data.indicators.quote ||
                    !data.indicators.quote[0] ||
                    !data.timestamp
                ) {
                    console.error("Data structure unexpected:", data);
                    return;
                }

                // ['volume', 'close', 'low', 'open', 'high']
                const quote = data.indicators.quote[0]; 
                const closePrices = quote.close ? quote.close : [];
                
                const timeStamp = data.timestamp; 
                const chartData = {
                    labels: timeStamp,
                    datasets: [
                        {
                            label: `Stock Price`,
                            data: closePrices, 
                            borderColor: 'rgba(75,192,192,1)',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                        }
                    ]
                };
            setStockData(chartData);
        };
        fetchData();
    }, [ticker]);

    return (
        <div><Line data={stockData} /></div>
    )
}

export default StockChart;
