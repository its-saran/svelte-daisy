let currentAudio = null;

const stopAudio = (audioElement) => {
    if (audioElement && audioElement.parentNode) {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.parentNode.removeChild(audioElement);
    }
};

const requestAudio = async (message, apiKey) => {
    try {
        const SPEECH_API_URL = 'https://api.openai.com/v1/audio/speech';
        const OPENAI_API_KEY = apiKey;

        const requestData = {
            model: 'tts-1',
            input: message,
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

        // Stop the current audio before starting a new one
        stopAudio(currentAudio);

        const audio = new Audio(blobUrl);
        audio.autoplay = true;
        document.body.appendChild(audio);

        // Update the current audio
        currentAudio = audio;

        // Assuming you have a button with an id "stopButton" to stop the audio
        const stopButton = document.getElementById('stopAudio');

        // Attach the stopAudio function to the button click event
        stopButton.addEventListener('click', () => stopAudio(currentAudio));
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};



const requestAI = async (message, apiKey) => {
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

        requestAudio(aiMessage, apiKey)

        return aiMessage;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
};

export default requestAI;





