import OpenAI from "openai";
// const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_API_KEY_GENAI });

async function CallGenAI(input: string): Promise<string| null> {
    try {
        const openai = new OpenAI(
            {
                // If the environment variable is not configured, replace the following line with your API key: apiKey: "sk-xxx",
                apiKey: process.env.DASHSCOPE_API_KEY,
                baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
            }
        );
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Who are you?" }
            ],
        });
        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content; 
    } catch (error) {
        console.log(`Error message: ${error}`);
        console.log("For more information, see: https://www.alibabacloud.com/help/en/model-studio/developer-reference/error-code");
        return 'api down';
    }
}

export default CallGenAI;

