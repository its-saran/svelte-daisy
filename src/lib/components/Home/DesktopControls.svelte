<!-- <script>
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;
    export let isMobile;
    export let iconSize = isMobile ? 25 : 35;

    let canEdit = false;

    let initialHeight = isMobile ? 10 : 15;
    let keyboardHeight;

    const sendMessage = () => {
        updateContent()
    }

    let isKeyboardOpen = false;

    const handleFocus = () => {
        isKeyboardOpen = true;
        updateControlsPosition();
    }

    const handleBlur = () => {
        setTimeout(() => {
            isKeyboardOpen = false;
            updateControlsPosition();
        }, 100);
    }

    const updateControlsPosition = () => {
        if (isKeyboardOpen) {
            keyboardHeight = 40
        } else {
            keyboardHeight = initialHeight
        }
    }
</script>

<div id="desktopControls" class="flex flex-col" style={`height: ${keyboardHeight}%`}>
    <div id="controls">
        <div class="left">
            <button id="mic" class:large={!isMobile}>
                <Microphone width={iconSize} height={iconSize}/>
            </button>
            <textarea id="messageArea" class="textarea" placeholder="Talk with me"  bind:value={textValue} on:focus={handleFocus} on:blur={handleBlur} disabled={!canEdit}></textarea>
        </div>
        <button id="send" class:large={!isMobile} on:click={sendMessage}>
            <Send width={iconSize} height={iconSize}/>
        </button>
    </div>
</div>

<style lang="postcss">
    #desktopControls {
        @apply bg-base-100 flex items-center z-10 my-2 mx-1;
        transition: height 0.5s ease;
    }

    #controls {
        @apply flex items-center justify-center w-full gap-1 md:gap-3;
    }

    #controls .left{
        @apply flex bg-base-200 border border-base-300 gap-3 px-2 w-full md:w-2/3 py-2 md:py-2 h-full;
        border-radius: 50px;
    }

    #mic, #send{
        @apply cursor-pointer flex items-center justify-center rounded-full border-gray-500 bg-primary text-base-100;
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
        -webkit-tap-highlight-color: transparent;
        tap-highlight-color: rgba(0,0,0,0);
        border-width: 1px;
        padding: 11px 10px;
    }

    #mic.large, #send.large {
        padding: 15px 14px;
    }

    #messageArea {
        @apply bg-base-200 w-full text-lg resize-none h-12 outline-none focus:outline-none border-none focus:border-none px-0 md:px-2;
    }
</style>
 -->


<script>
    import { onMount } from 'svelte';
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;
    export let clearText;
    // export let isSessionRunning;

    export let isMobile;
    export let iconSize = isMobile ? 25 : 35;
    let initialHeight = isMobile ? 6.5 : 15;
    let canEdit = false;

    const sendMessage = () => {
        updateContent()
    }

    let isFullscreen;
    let deepgramKey;
    let openaiKey;

    let mediaRecorder, mediaStream, socket;
    let transcriptSet = [];
    
    let focusElement;

    let isRecording = false;
    let isLocked = false;
    let isMicActive = false;
    let isTouchActive = false;

    let touchStartCoordinates = {};
    let touchEndCoordinates = {};

    let touchStartTime
    let touchEndTime;


    const handleTouchStart = (event) => {
        if (!isRecording) isTouchActive = true;

        touchStartTime = performance.now();

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

            // const micContainerElement = document.getElementById('mic-container');
            // const micContainerElementRect = micContainerElement.getBoundingClientRect();

            // const lockElement = document.getElementById('lock');
            // const lockElementRect = lockElement.getBoundingClientRect();

            if (isInsideElement(touchMoveCoordinates, touchElementRect)) {
                focusElement = 'mic'
            } else if (isInsideElement(touchMoveCoordinates, clearElementRect)) {
                focusElement = 'clear'
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


        const clearElement = document.getElementById('clear');
        const clearElementRect = clearElement.getBoundingClientRect();

        if (isInsideElement(touchEndCoordinates, touchElementRect)) {
            stopRecording()
        } else if (isInsideElement(touchEndCoordinates, clearElementRect)) {
            handleClear();
            stopRecording()
        } else {
            handleOutside();
        }

        touchEndTime = performance.now()
        const touchTimeElapsed = touchEndTime - touchStartTime;

        if ((touchTimeElapsed < 1000) && isTouchActive) { isTouchActive = false; }
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

    // const handleLock = () => {
    //     isLocked = true;
    //     console.log('Recording locked!')
    // }

    // const handleUnlock = () => {
    //     if (isLocked || isRecording) {
    //         stopRecording()
    //     }
    // }

    const startRecording = async () => {
        if (!isRecording) {
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

<div id="desktopControls" class="flex flex-col" style={`height: ${initialHeight}%`}>
    <div id="controls">
        <div class="left">
            <button id="clear" class:large={!isMobile} on:click={handleClear}>
                <Microphone width={iconSize} height={iconSize}/>
            </button>
            <textarea id="messageArea" class="textarea" placeholder="Talk with me"  bind:value={textValue} disabled={!canEdit}></textarea>
        </div>
        <button id="mic" class:large={!isMobile} class:active={isMicActive} on:touchstart={handleTouchStart} on:touchend={handleTouchEnd} on:touchmove={handleTouchMove}>
            <Microphone width={iconSize} height={iconSize}/>
        </button>
    </div>
</div>

<style lang="postcss">
    #desktopControls {
        @apply bg-base-100 flex items-center z-10 my-2 mx-1;
        transition: height 0.5s ease;
    }

    #controls {
        @apply flex items-center justify-center w-full gap-1 md:gap-3;
    }

    #controls .left{
        @apply flex bg-base-200 border border-base-300 gap-3 px-2 w-full md:w-2/3 py-2 md:py-2 h-full;
        border-radius: 50px;
    }

    #mic, #send, #clear{
        @apply cursor-pointer flex items-center justify-center rounded-full border-gray-500 bg-primary text-base-100;
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
        -webkit-tap-highlight-color: transparent;
        tap-highlight-color: rgba(0,0,0,0);
        border-width: 1px;
        padding: 11px 10px;
    }

    #mic.large, #send.large, #clear.large {
        padding: 15px 14px;
    }

    #mic-disabled {
        @apply my-4 cursor-pointer flex items-center justify-center rounded-full border-2 border-zinc-500;
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
        -webkit-tap-highlight-color: transparent;
        padding: 22px 20px;
    }


    #mic.active {
        transform:scale(1.7);
        /* background: #050801; */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
    }

    #messageArea {
        @apply bg-base-200 w-full text-lg resize-none h-12 outline-none focus:outline-none border-none focus:border-none px-0 md:px-2;
    }
</style>

