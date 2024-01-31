<script>
    import { onMount } from 'svelte';

    import Header from '$lib/components/Home/Header.svelte'
    import Settings from '$lib/components/Settings/Settings.svelte';
    import Playground from '$lib/components/Home/Playground.svelte';
    import Controls from '$lib/components/Home/Controls.svelte';
    import DesktopControls from '$lib/components/Home/DesktopControls.svelte';
    import Display from '$lib/components/Home/Display.svelte';
    import openAI from '$lib/utils/openAI.js';
    import audioPlayer from '$lib/utils/audioPlayer.js'
    import Crypto from '$lib/utils/crypto.js';
  
    export let exitFullscreen;
    export let changeTheme;
    export let messages;
    export let count;
    export let isMobile;
    export let isFullscreen;

    let playgroundHeight = 100;

    let waitForAudio = true;
    let isMute = false;
    let isSessionRunning = false;

    let isSettings = false;
    let openaiKey;

    const openSettings = () => isSettings = true
    const closeSettings = () => isSettings = false
    const getName = () => localStorage.getItem('name')
    const getGender = () => localStorage.getItem('gender')
    const toggleMute = () => isMute = !isMute;

    let textValue = '';

    const addMessage = (userMessage) => {
        messages = [...messages, userMessage];
    }

    const clearText = () => {
        textValue = '';
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const updateContent = async () => {
        if (textValue) {
            const userText = capitalizeFirstLetter(textValue)
            const userMessage = { id: count++, text: userText, role: 'user' };
            addMessage(userMessage);

            clearText();

            if (!isMute) {
                try {
                    if (waitForAudio) {
                        isSessionRunning = true;
                        const chatCompletion = await openAI.chatCompletion(userText, openaiKey);
                        const speech = await openAI.textToSpeech(chatCompletion, openaiKey)
                        await audioPlayer.play(speech) 
                        const systemMessage = { id: count++, text: chatCompletion, role: 'system' };
                        addMessage(systemMessage);
                        isSessionRunning = false;
                    } else {
                        isSessionRunning = true; 
                        const chatCompletion = await openAI.chatCompletion(userText, openaiKey);
                        const systemMessage = { id: count++, text: chatCompletion, role: 'system' };
                        addMessage(systemMessage);
                        const speech = await openAI.textToSpeech(chatCompletion, openaiKey)
                        await audioPlayer.play(speech) 
                        isSessionRunning = false;
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            } else {
                isSessionRunning = true;
                const chatCompletion = await openAI.chatCompletion(userText, openaiKey);
                const systemMessage = { id: count++, text: chatCompletion, role: 'system' };
                addMessage(systemMessage);
                isSessionRunning = false;
            }
        }
    };

    onMount(() => {
        openaiKey = localStorage.getItem('openaiKey');
    })

</script>


{#if !isSettings}
    <div id="app" class="h-screen overflow-hidden">
        <Header {openSettings} {exitFullscreen} {getName} {getGender} bind:isMobile bind:isFullscreen bind:isMute {toggleMute}/>
        <Playground bind:messages bind:playgroundHeight/>
        {#if isMobile}
            <!-- <Display bind:textValue/>
            <Controls bind:textValue {updateContent} {clearText} bind:isSessionRunning/> -->
            <DesktopControls bind:textValue {updateContent} {clearText} bind:isSessionRunning bind:isMobile bind:playgroundHeight/>
        {:else}
            <DesktopControls bind:textValue {updateContent} {clearText} bind:isSessionRunning bind:isMobile bind:playgroundHeight/>
        {/if}
    </div>
{:else}
    <Settings {closeSettings} {getName} {getGender} {changeTheme}/>
{/if}


<style lang="postcss">
    #app {
        @apply bg-base-100 flex flex-col;
    }
</style>
