let currentAudio = null;

const play = async (speech) => {
    const blob = await speech.blob();
    const blobUrl = URL.createObjectURL(blob);

    stop(currentAudio);

    const audio = new Audio(blobUrl);
    audio.autoplay = true;
    document.body.appendChild(audio);

    currentAudio = audio;

    const stopButton = document.getElementById('stopAudio');

    stopButton.addEventListener('click', () => stop(currentAudio));
}

const stop = (audioElement) => {
    if (audioElement && audioElement.parentNode) {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.parentNode.removeChild(audioElement);
    }
};

export default { play, stop }
