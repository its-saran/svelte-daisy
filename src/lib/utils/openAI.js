let count = 0;
let messages = []


const chatCompletion = async (message, apiKey) => {
    try {

        let content;
        const CHAT_API_URL = 'https://api.openai.com/v1/chat/completions';
        const OPENAI_API_KEY = apiKey

        const prompt = "You are my friend, a native English speaker named Daisy. We are going to start a conversation. Don't use long paragraphs or more than four sentences while talking with me. If my sentence has a grammar mistake, respond with something like 'Do you mean?' and provide the corrected version. Additionally, if you think there needs to be an improvement in the following sentence, suggest what I should say instead. After that, respond to that corrected sentence. don't correct punctuation mistakes."

        if (count === 0) {
            content = prompt + '\n' + 'Sentence:' + message
            count ++
        } else {
            content = message
        }

        console.log(`User message: ${message}`)

        let userMessage = { role: 'user', content}
        messages = [...messages, userMessage]

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages,
            }),
        };

        const response = await fetch(CHAT_API_URL, requestOptions);
        const data = await response.json();

        const aiMessage = data.choices[0].message.content;

        let systemMessage = { role: 'system', content: aiMessage}
        messages = [...messages, systemMessage]

        console.log(`System message: ${aiMessage}`)

        return aiMessage;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
};

const textToSpeech = async (message, apiKey) => {
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

        const speech = await fetch(SPEECH_API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData),
        });

        if (!speech.ok) {
            throw new Error(`HTTP error! Status: ${speech.status}`);
        }

        return speech
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};



export default { chatCompletion, textToSpeech };






