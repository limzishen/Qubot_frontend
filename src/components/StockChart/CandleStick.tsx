import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts'; 
import FetchPolyData from './FetchPolyData';
import ApexCandleStickData from '../../types/ApexCandleStickData';
import ReactApexChart from 'react-apexcharts';
import StockDataProps from '../../types/StockDataProps';


function CandleStick({ticker, from, to}: StockDataProps) {
    const [chartData, setChartData] = useState<ApexCandleStickData[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchPolyData({ ticker, from, to });

            // Ensure data is not undefined before setting state
            if (data) {
                setChartData(data);
            } else {
                setChartData([]); // Clear data if no results or error
            }
        };
        fetchData();
    }, [ticker, from, to]); 

    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
    }; 

    return (
        <div>
        <ReactApexChart
            series = {
                [
                    {data: chartData}
                ]
            }
            options = {chartOptions}
            type = "candlestick"
        />
        </div>
    ); 

}

export default CandleStick; 

