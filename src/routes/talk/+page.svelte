<script>
    import { onMount } from 'svelte';

    import Mobile from '$lib/components/Mobile.svelte';
    import Desktop from '$lib/components/Desktop.svelte';
    import Settings from '$lib/components/Settings/Settings.svelte';
    
    let isMobile = false;
    let isSettings = false;
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
        isFullscreen = false
        document.exitFullscreen().catch((err) => console.error(err));
    }
    const openSettings = () => isSettings = true
    const closeSettings = () => isSettings = false
    const handleResize = () => updateIsMobile();


    onMount(() => {
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

<main class="w-screen h-screen overflow-hidden">
    <div id="enter">
        {#if !isFullscreen}
            <button id="start-app" class="btn btn-primary" on:click={enterFullscreen}>
            Start App
            </button>
        {/if}
    </div>
    <div id="content">
        {#if isFullscreen}
            {#if isSettings}
                <Settings {closeSettings}/>
            {:else}
                <Mobile {openSettings} {exitFullscreen}/>
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

