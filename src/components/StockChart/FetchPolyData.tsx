import { restClient } from '@polygon.io/client-js';
import ApexCandleStickData from '../../types/ApexCandleStickData';
import StockDataProps from '../../types/StockDataProps';


async function FetchPolyData(DataProps: StockDataProps): Promise<ApexCandleStickData[] | undefined> {
    try {
        const rest = await restClient(process.env.REACT_APP_API_KEY);
        const data = await rest.stocks.aggregates(DataProps.ticker, 1, "day", DataProps.from, DataProps.to); 

        if(data.results) {
            const result: ApexCandleStickData[] = data.results.map((candle) => ({
                x: new Date(candle.t!), // Polygon timestamp is in Unix MS
                y: [candle.o!, candle.h!, candle.l!, candle.c!], // open, high, low, close
            }));
            console.log(result);
            return result;
        } else {
            console.warn("No data results found for the given parameters.");
            return undefined;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return undefined;
    }
}

export default FetchPolyData;
