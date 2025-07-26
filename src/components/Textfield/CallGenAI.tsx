import { supabase } from '../../supabaseClient'; 

const CallGenAI = async (prompt: string): Promise<string> => {

    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();


        if (sessionError || !session) {
            console.error('No active session found:', sessionError?.message);
            return 'Error: Not authenticated. Please log in.';
        }

        const accessToken = session.access_token;
        const { error } = await supabase.auth.getUser(accessToken);

        if (error) {
            console.log(supabase.auth.getUser(accessToken))
        }
        const baseURL = `https://qubot-backend.vercel.app/`

        const res = await fetch(`${baseURL}api/deepseek`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
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