const CallGenAI = async (prompt: string): Promise<string> => {
    try {
        const res = await fetch('http://localhost:4000/api/deepseek', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });


        const data = await res.json();
        return data.reply;
    } catch (err) {
        console.error('Error calling backend:', err);
        return 'Error getting response';
    }
};

export default CallGenAI;