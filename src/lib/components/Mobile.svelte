<script>
      import { onMount } from 'svelte';

    import Header from '$lib/components/Home/Header.svelte'
    import Settings from '$lib/components/Settings/Settings.svelte';
    import Playground from '$lib/components/Home/Playground.svelte';
    import Controls from '$lib/components/Home/Controls.svelte';
    import Display from '$lib/components/Home/Display.svelte';
    import requestCompletion from '$lib/utils/requestCompletion.js';
    import requestAudio from '$lib/utils/requestAudio.js';
    import requestAI from '$lib/utils/requestAI.js';
  
    export let exitFullscreen;
    export let changeTheme;

    let waitForAudio = true;

    let isSettings = false;
    let openaiKey;

    const openSettings = () => isSettings = true
    const closeSettings = () => isSettings = false
    const getName = () => localStorage.getItem('name')

    let textValue = '';
    let count = 0;
    let messages = [];

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

            try {
                if (waitForAudio) {
                    const textCompletion = await requestAI(userText, openaiKey);
                    const systemMessage = { id: count++, text: textCompletion, role: 'system' };
                    addMessage(systemMessage);
                    console.log('Waited for audio')
                } else {
                    const textCompletion = await requestCompletion(userText, openaiKey);
                    const systemMessage = { id: count++, text: textCompletion, role: 'system' };
                    addMessage(systemMessage);
                    requestAudio(textCompletion, openaiKey)
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    };

    onMount(() => {
        openaiKey = localStorage.getItem('openaiKey');
    })

</script>


{#if !isSettings}
    <div class="h-screen overflow-hidden">
        <Header {openSettings} {exitFullscreen} {getName}/>
        <Playground bind:messages/>
        <Display bind:textValue/>
        <Controls bind:textValue {updateContent} {clearText}/>
    </div>
{:else}
    <Settings {closeSettings} {changeTheme}/>
{/if}


<style lang="postcss">

</style>
