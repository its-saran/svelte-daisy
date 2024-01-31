<!-- <script>
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
        setTimeout(() => {
            isKeyboardOpen = false;
            updateControlsPosition();
        }, 100);
    }

    const updateControlsPosition = () => {
        if (isKeyboardOpen) {
            playgroundHeight = 40
        } else {
            playgroundHeight = 100
        }
    }
</script>

<div id="desktopControls" class="flex flex-col">
    <div id="controls">
        <div class="left">
            <button id="mic" class:large={!isMobile}>
                <Microphone width={iconSize} height={iconSize}/>
            </button>
            <textarea id="messageArea" class="textarea" placeholder="Talk with me"  bind:value={textValue} on:focus={handleFocus} on:blur={handleBlur}></textarea>
        </div>
        <button id="send" class:large={!isMobile} on:click={sendMessage}>
            <Send width={iconSize} height={iconSize}/>
        </button>
    </div>
</div>

<style lang="postcss">
    #desktopControls {
        @apply bg-base-100 flex flex-grow items-center z-10 my-2 mx-1;
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
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;
    export let isMobile;
    export let iconSize = isMobile ? 25 : 35;

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
            <textarea id="messageArea" class="textarea" placeholder="Talk with me"  bind:value={textValue} on:focus={handleFocus} on:blur={handleBlur}></textarea>
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






