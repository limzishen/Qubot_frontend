import React, { useEffect, useState } from 'react';
import FetchReport from './FetchReport';  
import {Typography, Paper, Box} from '@mui/material';
import SummaryTableProps from '../../types/SummaryTableProps';

function SummaryTable({ ticker, quarter, year }: SummaryTableProps) {
    const [revenue, setRevenue] = useState<number>(0);
    const [netIncome, setnetIncome] = useState<number>(0);
    const [opIncome, setopIncome] = useState<number>(0);
    const [netCash, setnetCash] = useState<number>(0);
    const [assets, setAssets] = useState<number>(0);

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
            if (data && data.length > 0) {
                for (const companyReport of data) {
                    if (companyReport.fiscal_period === quarter && companyReport.fiscal_year === `${year}` ) {
                        const financials = companyReport.financials;

                        setRevenue(get(['income_statement', 'revenues', 'value'], financials)); 
                        setnetIncome(getEitherOr('income_statement', 'net_income', financials));
                        setAssets(get(['balance_sheet', 'assets', 'value'], financials));

                        setopIncome(getEitherOr('income_statement', 'operating_income', financials));

                        setnetCash(get(['cash_flow_statement', 'net_cash_flow', 'value'], financials));
                    }
                }
            }
        };
        fetchData();  
    }, [ticker, year, quarter]); 

    return (
        <>
        <Paper elevation={3}
                            sx = {{width: 1,
                                margin: 1
                            }}>
            <Box sx = {{margin : 1}}> 
            <Typography variant="h6" gutterBottom>
                Financial Summary for {ticker} FY{year} {quarter}
            </Typography>
            <Typography>Revenue:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{revenue}</Typography>

            <Typography>Net Income:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{netIncome}</Typography>

            <Typography>Operating Income:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{opIncome}</Typography>

            <Typography>Net Cash Flow:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{netCash}</Typography>

            <Typography>Total Assets:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{assets}</Typography>
            </Box> 
            
        </Paper>
        </>
    ); 

}

export default SummaryTable; 


