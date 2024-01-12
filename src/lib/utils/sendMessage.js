const sendMessage = async (message, apiKey) => {
    try {
        const CHAT_API_URL = 'https://api.openai.com/v1/chat/completions';
        const SPEECH_API_URL = 'https://api.openai.com/v1/audio/speech';
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

        const requestData = {
            model: 'tts-1',
            input: aiMessage,
            voice: 'alloy',
        };

        const headers = {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        };

        const speechResponse = await fetch(SPEECH_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData),
        });

        if (!speechResponse.ok) {
            throw new Error(`HTTP error! Status: ${speechResponse.status}`);
        }

        const blob = await speechResponse.blob();
        const blobUrl = URL.createObjectURL(blob);

        const audio = new Audio(blobUrl);
        audio.autoplay = true;
        document.body.appendChild(audio);

        console.log(`Audio file available for playback.`);

        return aiMessage;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
};

export default sendMessage;
