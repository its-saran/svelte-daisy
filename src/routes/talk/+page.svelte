<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import Mobile from '$lib/components/Mobile.svelte';
    import Desktop from '$lib/components/Desktop.svelte';
    import Welcome from '$lib/components/Welcome.svelte';
    import Keys from '$lib/components/Keys.svelte';

    let initialTheme;
    let theme

    let count = 0;
    let messages = []

    let name;
    let deepgramKey;
    let openaiKey;

    let isMobile = false;
    let isFullscreen = false;

    const updateIsMobile = () => {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    };

    const enterFullscreen = async () => {
        const content = document.getElementById('content');
        if (!document.fullscreenElement) {
            content.requestFullscreen().catch((err) => console.error(err));
        }
    };

    const exitFullscreen = () => { 
        isFullscreen = false;
        document.exitFullscreen().catch((err) => console.error(err));
    }
    const handleResize = () => updateIsMobile();
    const updateName = (text) => name = text
    const updateKeys = (dKey, oKey) => {
        deepgramKey = dKey;
        openaiKey = oKey;
    }

    const changeTheme = (newTheme) => {
        theme.update(currentTheme => newTheme)
    };

    onMount(() => {

        const storedTheme = localStorage.getItem('theme');
        initialTheme = storedTheme || 'light';
        theme = writable(initialTheme);

        name = localStorage.getItem('name');
        deepgramKey = localStorage.getItem('deepgramKey');
        openaiKey = localStorage.getItem('openaiKey');


        document.addEventListener('fullscreenchange', () => {
            isFullscreen = !!document.fullscreenElement;
        });
 
        updateIsMobile();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<main class="w-screen h-screen overflow-hidden" data-theme={$theme}>
    <div id="enter">
        {#if !isFullscreen}
            <button id="start-app" class="btn btn-primary" on:click={enterFullscreen}>
            Start App
            </button>
        {/if}
    </div>
    <div id="content">
        {#if isFullscreen}
            {#if !name}
                <Welcome {updateName}/>
            {:else}
                {#if (deepgramKey && openaiKey)}
                    <Mobile {exitFullscreen} {changeTheme} bind:messages bind:count/>
                {:else}
                    <Keys {updateKeys}/>
                {/if}
            {/if}

        {/if}
    </div>

</main>

<style lang="postcss">
    #enter {
        @apply h-full flex items-center justify-center;
    }
    #content {
        @apply bg-white h-full w-full flex flex-col select-none overflow-hidden;
    }
</style>

