import { supabase } from '../../supabaseClient'; 

const GetUserMessages = async () => {
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

        const res = await fetch('http://localhost:4000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
        return data;
    } catch(err) {
        console.error('Error calling backend:', err);
        return 'Error getting response';
    }
}

export default GetUserMessages;