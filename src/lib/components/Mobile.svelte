<script>
    import Header from '$lib/components/Home/Header.svelte'
    import Settings from '$lib/components/Settings/Settings.svelte';
    import Playground from '$lib/components/Home/Playground.svelte';
    import Controls from '$lib/components/Home/Controls.svelte';
    import Display from '$lib/components/Home/Display.svelte';
    import sendMessage from '$lib/utils/sendMessage.js';
    import { onMount } from 'svelte';

    export let exitFullscreen;
    export let changeTheme;

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
                const newText = await sendMessage(userText, openaiKey);
                const systemMessage = { id: count++, text: newText, role: 'system' };
                addMessage(systemMessage);
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
