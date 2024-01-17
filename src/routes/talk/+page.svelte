<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    import App from '$lib/components/App.svelte';
    import Welcome from '$lib/components/Welcome.svelte';
    import Keys from '$lib/components/Keys.svelte';
    import Loader from '$lib/components/Loader.svelte'

    let initialTheme;
    let theme;

    let count = 0;
    let messages = [];

    let name;
    let deepgramKey;
    let openaiKey;

    let isMobile = false;
    let isFullscreen = false;
    let isLoading = true;

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
    };

    const handleResize = () => updateIsMobile();
    const updateName = (text) => (name = text);
    const updateKeys = (dKey, oKey) => {
        deepgramKey = dKey;
        openaiKey = oKey;
    };

    const changeTheme = (newTheme) => {
        theme.update((currentTheme) => newTheme);
    };

    onMount(async () => {
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

        // Simulate an asynchronous operation (e.g., fetching data)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set loading to false once the data is ready
        isLoading = false;
    });
</script>

<main class="w-screen h-screen overflow-hidden" data-theme={$theme}>
    {#if isLoading}
        <!-- Loading screen -->
        <Loader/>
    {:else}
        <div class="enter">
            {#if isMobile}
                <div id="enter">
                    {#if !isFullscreen}
                        <button id="start-app" class="btn btn-primary" on:click={enterFullscreen}>
                            Start App
                        </button>
                    {/if}
                </div>
            {/if}
        </div>
        <div id="content">
            {#if !name}
                <Welcome {updateName} />
            {:else}
                {#if (deepgramKey && openaiKey)}
                    <App {exitFullscreen} {changeTheme} bind:messages bind:count bind:isMobile bind:isFullscreen/>
                {:else}
                    <Keys {updateKeys} />
                {/if}
            {/if}
        </div>
    {/if}
</main>

<style lang="postcss">
    #enter {
        @apply h-screen flex items-center justify-center;
    }
    #content {
        @apply bg-white h-full w-full flex flex-col select-none overflow-hidden;
    }

</style>


