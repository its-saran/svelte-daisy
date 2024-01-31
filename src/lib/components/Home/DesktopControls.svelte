<script>
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;
    export let isMobile;
    export let iconSize = isMobile ? 25 : 35;
    export let playgroundHeight;

    const sendMessage = () => {
        updateContent()
    }

    let isKeyboardOpen = false;

    const handleFocus = () => {
        isKeyboardOpen = true;
        updateControlsPosition();
    }

    const handleBlur = () => {
        isKeyboardOpen = false;
        updateControlsPosition();
    }

    const updateControlsPosition = () => {
        if (isKeyboardOpen) {
            playgroundHeight = 50
        } else {
            playgroundHeight = 80
        }
    }
</script>

<div id="desktopControls" class="flex flex-col">
    <div id="controls">
        <button id="mic" class:large={!isMobile}>
            <Microphone width={iconSize} height={iconSize}/>
        </button>
        <textarea id="messageArea" class="textarea" placeholder="Talk with me"  bind:value={textValue} on:focus={handleFocus} on:blur={handleBlur}></textarea>
        <button id="send" class:large={!isMobile} on:click={sendMessage}>
            <Send width={iconSize} height={iconSize}/>
        </button>
    </div>
</div>

<style lang="postcss">
    #desktopControls {
        @apply flex flex-grow items-center z-10;
    }

    #controls {
        @apply flex items-center gap-3 px-2 w-full mx-1 md:w-2/3 md:py-3 bg-base-200 border border-base-300 h-20;
        /* md:mb-12 */
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




<!-- 
<script>
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;
    export let isMobile;
    export let iconSize = isMobile ? 25 : 35;

    const sendMessage = () => {
        updateContent();
    }

    let isKeyboardOpen = false;

    const handleFocus = () => {
        isKeyboardOpen = true;
    }

    const handleBlur = () => {
        isKeyboardOpen = false;
    }

</script>

<div id="desktopControls">
    <div id="controls" class:keyboard-open={isKeyboardOpen}>
        <button id="mic" class:large={!isMobile}>
            <Microphone width={iconSize} height={iconSize}/>
        </button>
        <textarea
            id="messageArea"
            class="textarea"
            placeholder="Talk with me"
            bind:value={textValue}
            on:focus={handleFocus}
            on:blur={handleBlur}
        ></textarea>
        <button id="send" class:large={!isMobile} on:click={sendMessage}>
            <Send width={iconSize} height={iconSize}/>
        </button>
    </div>
</div>

<style lang="postcss">
    #desktopControls {
        @apply flex items-center justify-center z-10 h-16 md:h-20;
    }

    #controls {
        @apply flex items-center h-full gap-3 px-2 w-full mx-1 md:w-2/3 md:py-3 bg-base-200 border border-base-300 md:mb-12;
        border-radius: 50px;
        transition: transform 0.3s ease-out;
        transform: translateY(0);
    }

    #controls.keyboard-open {
        transform: translateY(-500%);
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




<!-- <script>
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;
    export let isMobile;
    export let iconSize = isMobile ? 25 : 35;

    const sendMessage = () => {
        updateContent();
    }

    let isKeyboardOpen = false;

    const handleFocus = () => {
        isKeyboardOpen = true;
        updateControlsPosition();
    }

    const handleBlur = () => {
        isKeyboardOpen = false;
        updateControlsPosition();
    }

    const updateControlsPosition = () => {
        const controls = document.getElementById('controls');
        if (controls) {
            controls.style.transform = isKeyboardOpen ? 'translateY(-500%)' : 'translateY(0)';
        }
    }

    // Listen for resize events to detect changes in window size (keyboard open/close)
    window.addEventListener('resize', updateControlsPosition);
</script>

<div id="desktopControls">
    <div id="controls" class:keyboard-open={isKeyboardOpen}>
        <button id="mic" class:large={!isMobile}>
            <Microphone width={iconSize} height={iconSize}/>
        </button>
        <textarea
            id="messageArea"
            class="textarea"
            placeholder="Talk with me"
            bind:value={textValue}
            on:focus={handleFocus}
            on:blur={handleBlur}
        ></textarea>
        <button id="send" class:large={!isMobile} on:click={sendMessage}>
            <Send width={iconSize} height={iconSize}/>
        </button>
    </div>
    <div id="keyboardArea" class="h-32 bg-green-300 w-full">

    </div>
</div>

<style lang="postcss">
    #desktopControls {
        @apply flex items-center flex-col justify-center z-10 h-16 md:h-20;
    }

    #controls {
        @apply flex items-center h-full gap-3 px-2 w-full mx-1 md:w-2/3 md:py-3 bg-base-200 border border-base-300 md:mb-12;
        border-radius: 50px;
        transition: transform 0.3s ease-out;
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




