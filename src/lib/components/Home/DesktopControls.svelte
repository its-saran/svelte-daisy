<script>
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;
    export let clearText;
    export let isSessionRunning;
    export let isMobile;
    export let iconSize = isMobile ? 25 : 35;


    const sendMessage = () => {
        updateContent()
    }
</script>

<div id="desktopControls">
    <div id="controls">
        <button id="mic" class:large={!isMobile}>
            <Microphone width={iconSize} height={iconSize}/>
        </button>
        <textarea id="messageArea" class="textarea" placeholder="Talk with me" bind:value={textValue}></textarea>
        <button id="send" class:large={!isMobile} on:click={sendMessage}>
            <Send width={iconSize} height={iconSize}/>
        </button>
    </div>
</div>

<style lang="postcss">
    #desktopControls {
        @apply flex items-center justify-center z-10 h-16 md:h-20;
        /* height: 86px; */
    }

    #controls {
        @apply flex items-center h-full gap-3 px-2 w-full mx-1 md:w-2/3 md:py-3 bg-base-200 border border-base-300 md:mb-12;
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

    
    /* #mic-disabled {
        @apply my-4 cursor-pointer flex items-center justify-center rounded-full border-2 border-zinc-500;
        transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
        -webkit-tap-highlight-color: transparent;
        padding: 22px 20px;
    }


    #mic.active {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 0, 0, 0.5);
    } */

</style>