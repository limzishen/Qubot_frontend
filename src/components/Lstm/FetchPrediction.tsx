import { PredictionResult } from "../../types/PredictionResult";
import axios, { AxiosError } from 'axios';


async function predict(ticker: string): Promise<PredictionResult| undefined> {
    const url = 'https://zzzz-shen-qubot-ml.hf.space/gradio_api/call/predict';

    const postData = {
        data: [ticker]
    }

    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
    };


    try {
        const postResponse = await axios.post(url, postData, { headers });
        const eventId = postResponse.data.event_id;

        const getUrl = `${url}/${eventId}`;
        const getResponse = await axios.get(getUrl);
        const responseString = getResponse.data

        const dataMatch = /data:\s*(\[.*\])/.exec(responseString);

        if (dataMatch) {
            const data = JSON.parse(dataMatch[1]);
            console.log(data[0])

            const result: PredictionResult = {
                ticker: data[0].ticker,
                forecast: data[0].forecast, 
                latest_price: data[0].latest_price, 
                latest_date: data[0].latest_date, 
            }

            return result;
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error("Axios request failed:", axiosError.message);
            console.error("Response status:", axiosError.response?.status);
            console.error("Response data:", axiosError.response?.data);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        return undefined;
    }
}


export default predict;
