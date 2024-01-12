const requestCompletion = async (message, apiKey) => {
    try {
        const CHAT_API_URL = 'https://api.openai.com/v1/chat/completions';
        const OPENAI_API_KEY = apiKey

        console.log(`User message: ${message}`)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            }),
        };

        const response = await fetch(CHAT_API_URL, requestOptions);
        const data = await response.json();

        const aiMessage = data.choices[0].message.content;

        console.log(`System message: ${aiMessage}`)

        return aiMessage;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
};

export default requestCompletion;
