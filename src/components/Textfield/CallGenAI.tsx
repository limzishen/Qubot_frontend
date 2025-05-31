import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_API_KEY_GENAI });

async function CallGenAI(input: string): Promise<string| undefined> {
    // const response = await ai.models.generateContent({
    //     model: "gemini-2.0-flash",
    //     contents: input, 
    // });
    
    // if (response.text) {
    //     return response.text; 
    // } else {
    //     return 'error'; 
    // }

    return 'This just gotta work'; 
}

export default CallGenAI;

