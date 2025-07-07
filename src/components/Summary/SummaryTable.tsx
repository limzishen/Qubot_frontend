import React, { useEffect, useState } from 'react';
import FetchReport from './FetchReport';  
import {Typography, Paper, Box} from '@mui/material';
import SummaryTableProps from '../../types/SummaryTableProps';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { BarChart } from '@mui/x-charts/BarChart';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


function SummaryTable({ ticker }: SummaryTableProps) {

    const [currQuarter, setQuarter] = useState<number>(0); 
    const [year, setYear] = useState<number>(2025); 
    const today = dayjs();
    const [yearJs, setYearJs] = useState<dayjs.Dayjs | null>(today); 


    const [quarterlyData, setQuarterlyData] = useState<number[][]>([[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0 ], [0, 0, 0, 0, 0, 0 ]]);
    // revenue, gross profit, operation income, netincome, assets, net cash

    const handleChange = (event: SelectChangeEvent) => {
        setQuarter(Number(event.target.value));
    };

    const yearChange = (newYear: dayjs.Dayjs | null) => {
        if (newYear) {
            setYear(newYear.year());
            setYearJs(newYear);
        }
    };


    const get = (path: string[], obj: object): number => {
        return path.reduce((acc: any, part: string) => acc && acc[part], obj) ?? 0;
    };

    const getEitherOr = (sheet: string, type: string, financials: any) => {
        const getPositive = get([sheet, type, 'value'], financials)
        const getNegative = get([sheet, `${type}_loss`, 'value'], financials)

        if (getPositive > 0) {
            return getPositive;
        } else if (getNegative > 0) {
            return -getNegative;
        } else {
            return 0;
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchReport(ticker, year);
            let quarter = 0; 

            if (data && data.length > 0) {
                const currQuarterlyData: number[][] = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
                console.log(data); 
                for (const companyReport of data) {
                    const financials = companyReport.financials;
                    if (companyReport.fiscal_period === `Q${quarter + 1}` && companyReport.fiscal_year === `${year}` && quarter < 4) {
                        
                        console.log(quarter); 
                        currQuarterlyData[quarter][0] = get(['income_statement', 'revenues', 'value'], financials)
                        currQuarterlyData[quarter][1] = get(['income_statement', 'gross_profit', 'value'], financials)
                        currQuarterlyData[quarter][2] = getEitherOr('income_statement', 'operating_income', financials)
                        currQuarterlyData[quarter][3] = getEitherOr('income_statement', 'net_income', financials)
                        currQuarterlyData[quarter][4] = get(['balance_sheet', 'assets', 'value'], financials)
                        currQuarterlyData[quarter][5] = get(['cash_flow_statement', 'net_cash_flow', 'value'], financials)

                        quarter++; 
                    } else {
                        if (companyReport.fiscal_period === `FY` && companyReport.fiscal_year === `${year}`) {
                            currQuarterlyData[3][0] = get(['income_statement', 'revenues', 'value'], financials)
                            currQuarterlyData[3][1] = get(['income_statement', 'gross_profit', 'value'], financials)
                            currQuarterlyData[3][2] = getEitherOr('income_statement', 'operating_income', financials)
                            currQuarterlyData[3][3] = getEitherOr('income_statement', 'net_income', financials)
                            currQuarterlyData[3][4] = get(['balance_sheet', 'assets', 'value'], financials)
                            currQuarterlyData[3][5] = get(['cash_flow_statement', 'net_cash_flow', 'value'], financials)
                        }
                    }
                }
                setQuarterlyData(currQuarterlyData); 

            }
        };
        fetchData();  
    }, [ticker, year]); 

        const revenue = {
            data: [quarterlyData[0][0], quarterlyData[1][0], quarterlyData[2][0], quarterlyData[3][0]], 
            label: 'revenue'
        }

        const grossProfit = {
            data: [quarterlyData[0][1], quarterlyData[1][1], quarterlyData[2][1], quarterlyData[3][1]], 
            label: 'gross profit'
        }

        const operationIncome = {
            data: [quarterlyData[0][2], quarterlyData[1][2], quarterlyData[2][2], quarterlyData[3][2]], 
            label: 'operation income'
        }

        const netIncome = {
            data: [quarterlyData[0][3], quarterlyData[1][3], quarterlyData[2][3], quarterlyData[3][3]], 
            label: 'net income'
        }

    return (
        <>
         <Paper elevation={3}
                            sx = {{width: 0.9,
                                margin: 1
                            }}>
            <Box sx = {{margin : 1}}> 
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Quarter</InputLabel>
            <Select
            value={currQuarter.toString()}
            onChange={handleChange}
            >
            <MenuItem value="0">Q1</MenuItem>
            <MenuItem value="1">Q2</MenuItem>
            <MenuItem value="2">Q3</MenuItem>
            <MenuItem value="3">Q4</MenuItem>
            </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Year"
                views={['year']}
                value={yearJs} // Bind the value to the dayjs year state
                onChange={yearChange} // Use the new yearChange handler
                sx={{ m: 1, minWidth: 120 }}
                slotProps={{
                    textField: {
                        variant: 'standard',
                    },
                }}
            />
        </LocalizationProvider>
       
            <Typography variant="h6" gutterBottom>
                Financial Summary for {ticker} {year} {` ${(currQuarter < 3) ? `Q${currQuarter + 1}` : 'FY'}`}
            </Typography>
            <Typography>Revenue:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{quarterlyData[currQuarter][0]}</Typography>

            <Typography>Net Income:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{quarterlyData[currQuarter][3]}</Typography>

            <Typography>Operating Income:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{quarterlyData[currQuarter][3]}</Typography>

            <Typography>Net Cash Flow:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{quarterlyData[currQuarter][3]}</Typography>

            <Typography>Total Assets:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{quarterlyData[currQuarter][3]}</Typography>
            </Box> 
            <BarChart series={[
                        {...revenue, stack: 'total'},
                        {...grossProfit, stack: 'total'},
                        {...operationIncome, stack: 'total'},
                        {...netIncome, stack: 'total'}
                    ]}
                    height={300}
                    xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'FY'] }]}
                     />
            
        </Paper>
        </>
    ); 

}

export default SummaryTable; 


