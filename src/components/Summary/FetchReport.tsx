import { restClient } from '@polygon.io/client-js';

async function FetchReport(ticker: string, year: number) {
    try {
        const rest = await restClient(process.env.REACT_APP_API_KEY);
        const data = await rest.reference.stockFinancials({
                                ticker: ticker,
                                "filing_date.gte": `${year - 1}-05-01`,
                                "filing_date.lte": `${year + 1}-05-31`,
                                timeframe: "quarterly",
                                order: "asc",
                                limit: 10,
                                sort: "filing_date"
                            })

        if(data.results) {
            return data.results; 
        } else {
            console.warn("No data results found for the given parameters.");
            return undefined;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return undefined;
    }
}

// const get = (path: string[], obj: object): number => {
//     return path.reduce((acc: any, part: string) => acc && acc[part], obj) ?? 0;
// };

// async function AggregateData({ticker, from, to}: StockDataProps):Promise<AggregateReportData | undefined> {
//     const aggregated = {
//                 revenues: 0,
//                 netIncome: 0,
//                 totalAssets: 0,
//                 totalLiabilities: 0,
//                 operatingIncome: 0,
//                 netCashFlow: 0,
//             };
        
//     try {
//         const results = await FetchReport({ ticker, from, to }); 
        
//         if (results && results.length > 0) {
//             for (const companyReport of results) { // Loop through each company report
//                 const financials = companyReport.financials;

//                 // Safely get the values, defaulting to 0 if not found or null
//                 const revenue = get(['income_statement', 'revenues', 'value'], financials); 
//                 const netIncome = get(['income_statement', 'net_income_loss', 'value'], financials);
//                 const totalAssets = get(['balance_sheet', 'assets', 'value'], financials);
//                 const totalLiabilities = get(['balance_sheet', 'liabilities', 'value'], financials);
//                 const operatingIncome = get(['income_statement', 'operating_income_loss', 'value'], financials);
//                 const netCashFlow = get(['cash_flow_statement', 'net_cash_flow', 'value'], financials);

//                 // Accumulate all quarterly data.
//                 // If you strictly want *annual* totals from *quarterly* data,
//                 // you would need more complex logic to sum four quarters into one annual period.
//                 // For now, this will sum all available quarterly data within the date range.
//                 aggregated.revenues += revenue;
//                 aggregated.netIncome += netIncome;
//                 aggregated.totalAssets = totalAssets; // For balance sheet items, summing isn't typically how you get a "total" for a period. Usually, you'd want the *latest* value.
//                 aggregated.totalLiabilities = totalLiabilities; // Same as above for liabilities.
//                 aggregated.operatingIncome += operatingIncome;
//                 aggregated.netCashFlow += netCashFlow;
//             }
//             return aggregated; 
//         } else {
//             console.warn("No data results found for the given parameters for aggregation.");
//             return undefined;
//         }
//     } catch(error) {
//         console.error("Error fetching data:", error);
//         return undefined;
//     } 
// } 

export default FetchReport;
