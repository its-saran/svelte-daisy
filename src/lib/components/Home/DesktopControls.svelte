<script>
    import Microphone from '$lib/components/Icons/Microphone.svelte';
    import Send from '$lib/components/Icons/Send.svelte';

    export let textValue;
    export let updateContent;

    let iconSize = 32;

    let keyboardHeight;

    const sendMessage = () => {
        updateContent()
    }
</script>

<div id="desktopControls" class="flex flex-col" style={`height: ${keyboardHeight}%`}>
    <div id="controls">
        <div class="left">
            <button id="mic">
                <Microphone width={iconSize} height={iconSize}/>
            </button>
            <textarea id="messageArea" class="textarea" placeholder="Talk with me"  bind:value={textValue}></textarea>
        </div>
        <button id="send" on:click={sendMessage}>
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
        padding: 15px 14px;
    }


    #messageArea {
        @apply bg-base-200 w-full text-lg resize-none h-12 outline-none focus:outline-none border-none focus:border-none px-0 md:px-2;
    }
</style>

