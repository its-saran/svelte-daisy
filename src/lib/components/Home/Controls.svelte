<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    // import Crypto from '$lib/utils/crypto.js';
    
    import Clear from '$lib/components/Icons/Clear.svelte';
    import Lock from '$lib/components/Icons/Lock.svelte';
    import Microphone from '$lib/components/Icons/Microphone.svelte';

    let isFullscreen;

    export let textValue;
    export let updateContent;
    export let clearText;
    export let isSessionRunning;

    let deepgramKey;
    let openaiKey;

    let mediaRecorder, mediaStream, socket;
    let transcriptSet = [];
    
    let focusElement;

    let isRecording = false;
    let isLocked = false;
    let isMicActive = false;

    let touchStartCoordinates = {};
    let touchEndCoordinates = {};

    const handleTouchStart = (event) => {
        event.preventDefault();
        startRecording()

        touchStartCoordinates = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };

    }

    const handleTouchMove = (event) => {
        event.preventDefault();
        if (isRecording) {
            const touchMoveCoordinates = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };

            const touchElement = document.getElementById('mic');
            const touchElementRect = touchElement.getBoundingClientRect();
            
            const clearElement = document.getElementById('clear');
            const clearElementRect = clearElement.getBoundingClientRect();

            const micContainerElement = document.getElementById('mic-container');
            const micContainerElementRect = micContainerElement.getBoundingClientRect();

            const lockElement = document.getElementById('lock');
            const lockElementRect = lockElement.getBoundingClientRect();

            if (isInsideElement(touchMoveCoordinates, touchElementRect)) {
                focusElement = 'mic'
            } else if (isInsideElement(touchMoveCoordinates, micContainerElementRect)) {
                focusElement = 'mic-container'
            } else if (isInsideElement(touchMoveCoordinates, clearElementRect)) {
                focusElement = 'clear'
            } else if (isInsideElement(touchMoveCoordinates, lockElementRect)) {
                focusElement = 'lock'
            } else {
                focusElement = 'playground'
                stopRecording()
            }
        }
    }

    const handleTouchEnd = (event) => {

        event.preventDefault();

        touchEndCoordinates = {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY
        };

        const touchElement = document.getElementById('mic');
        const touchElementRect = touchElement.getBoundingClientRect();

        const micContainerElement = document.getElementById('mic-container');
        const micContainerElementRect = micContainerElement.getBoundingClientRect();

        const clearElement = document.getElementById('clear');
        const clearElementRect = clearElement.getBoundingClientRect();

        const lockElement = document.getElementById('lock');
        const lockElementRect = lockElement.getBoundingClientRect();

        if (isInsideElement(touchEndCoordinates, touchElementRect)) {
           stopRecording()
        } else if (isInsideElement(touchEndCoordinates, micContainerElementRect)) {
           stopRecording()
        } else if (isInsideElement(touchEndCoordinates, clearElementRect)) {
            handleClear();
            stopRecording()
        } else if (isInsideElement(touchEndCoordinates, lockElementRect)) {
            handleLock();
        } else {
            handleOutside();
        }
    }

    const isInsideElement = (coordinates, elementRect) => {
        return (
            coordinates.x >= elementRect.left &&
            coordinates.x <= elementRect.right &&
            coordinates.y >= elementRect.top &&
            coordinates.y <= elementRect.bottom
        );
    }

    const handleClear = () => {
        clearText()
        console.log('recording cleared')
    }

    const handleOutside = () => {   

    }

    const handleLock = () => {
        isLocked = true;
        console.log('Recording locked!')
    }

    const handleUnlock = () => {
        if (isLocked || isRecording) {
            stopRecording()
        }
    }

    const startRecording = async () => {
        if (!isLocked && !isRecording) {
            isMicActive = true;

            mediaStream = mediaStream || await navigator.mediaDevices.getUserMedia({ audio: true });

            if (!MediaRecorder.isTypeSupported('audio/webm')) {
                return alert('Browser not supported');
            }

            mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && socket.readyState === 1) {
                    socket.send(event.data);
                }
            };

            mediaRecorder.onstop = () => {

            };

            socket = new WebSocket('wss://api.deepgram.com/v1/listen', ['token', deepgramKey]);

            socket.onopen = () => {
                // console.log({ event: 'onopen' });
                mediaRecorder.start(100);
                isRecording = true;
                focusElement = 'mic'
                console.log('Started recording');
            };

            socket.onmessage = (message) => {
                try {
                    const received = JSON.parse(message.data);
                    if (received && received.channel && received.channel.alternatives) {
                        const transcript = received.channel.alternatives[0].transcript;
                        if (transcript && received.is_final) {
                            updateTranscript(transcript);
                        }
                    }
                } catch (error) {
                    console.error('Error parsing or accessing message:', error);
                }
            };

            socket.onclose = () => { 
                // console.log({ event: 'onclose' }); 
            }
            socket.onerror = (error) => { 
                console.log({ event: 'onerror', error });
            }
        }
    }

    const stopRecording = () => {
        isLocked = false
        focusElement = null;

        if (isRecording && mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            isRecording = false;
            socket.close();
            isMicActive = false

            updateContent()
            console.log('Recording stopped!')
        }
    }

    const updateTranscript = (transcript) => {
        transcriptSet.push(transcript);
        textValue += transcript + ' ';
    };

    const checkFullscreen = () => {
        isFullscreen = document.fullscreenElement !== null;
        if (!isFullscreen) {
            stopRecording()
        }
    };

    onMount(() => {
        deepgramKey = localStorage.getItem('deepgramKey');
        openaiKey = localStorage.getItem('openaiKey');

        document.addEventListener('fullscreenchange', checkFullscreen);
    })
</script>

<div id="controls">
    {#if !isSessionRunning}
        <div id="clear">
            {#if isRecording && !isLocked}
                <button class:active={focusElement == 'clear'} on:click={handleClear}>
                    <Clear width={30} height={30}/>
                </button>
            {/if}
        </div>
        <div id="mic-container">
            <button id="mic" class:active={isMicActive} on:touchstart={handleTouchStart} on:touchend={handleTouchEnd} on:touchmove={handleTouchMove} on:click={() => console.log('Mic clicked')}>
                <Microphone width={50} height={50}/>
            </button>
        </div>
        <div id="lock">
            {#if isRecording || isLocked}
                <button class:active={focusElement == 'lock' || isLocked} class:focus={isLocked} on:click={handleUnlock}>
                    <Lock width={30} height={30}/>
                </button>
            {/if}
        </div>   
    {:else}
        <div id="mic-container-disabled">
            <button id="mic-disabled" class="cursor-none">
                <span class="loading loading-spinner loading-lg p-2"></span>
            </button>
        </div>
    {/if}

</div>

<style lang="postcss">

    #controls {
        @apply flex items-center justify-center z-10;
        height: 15%;
    }

    #clear, #lock {
        @apply flex items-center justify-center h-full;
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
        width: 30%;
    }

    #clear button, #lock button {
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
    }
    
    #clear button.active, #lock button.active {
        transform:scale(1.5);
    }

    #lock button.focus {
        transform:scale(1.5);
    }

    #mic-container {
        @apply flex items-center justify-center px-4 h-full;
    }

    #mic {
        @apply my-4 cursor-pointer flex items-center justify-center rounded-full border-2 border-zinc-500;
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
        -webkit-tap-highlight-color: transparent;
        tap-highlight-color: rgba(0,0,0,0);
        padding: 22px 20px;
    }

    
    #mic-disabled {
        @apply my-4 cursor-pointer flex items-center justify-center rounded-full border-2 border-zinc-500;
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
        -webkit-tap-highlight-color: transparent;
        padding: 22px 20px;
    }


    #mic.active {
        transform:scale(0.8);
        /* background: #050801; */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
    }

    @supports (-moz-appearance: none) {
        #controls {
            padding-bottom: 30px;
        }
    }

</style>


