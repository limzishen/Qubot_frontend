import { restClient } from '@polygon.io/client-js';

async function FetchReport(ticker: string, year: number) {
    try {
        const rest = await restClient(process.env.REACT_APP_API_KEY);
        const data = await rest.reference.stockFinancials({
                                ticker: ticker,
                                "filing_date.gte": `${year - 1}-05-01`,
                                "filing_date.lte": `${year + 1}-05-31`,
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



export default FetchReport;
