import OpenAI from "openai";

async function CallGenAI(input: string): Promise<string | null> {
    try {
        // 创建 DeepSeek 兼容的 OpenAI 客户端
        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_DEEPSEEK_API_KEY, // 使用 DeepSeek API 密钥
            baseURL: "https://api.deepseek.com",  // 使用 DeepSeek 的基础 URL
            dangerouslyAllowBrowser: true,
        });

        // 调用 DeepSeek 模型
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat", // 使用 DeepSeek 的模型标识
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: input || "Who are you?" } // 使用传入的 input 参数
            ],
        });

        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    } catch (error) {
        console.log("API Key:", process.env.REACT_APP_DEEPSEEK_API_KEY);
        console.log(`Error message: ${error}`);
        // DeepSeek 错误文档（需要确认官方是否有公开文档）
        console.log("For more information, see: https://docs.deepseek.com/"); 
        return 'api down';
    }
}

export default CallGenAI;