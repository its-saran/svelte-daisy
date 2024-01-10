<script>
    import { onMount } from 'svelte';

    import Mobile from '$lib/components/Mobile.svelte';
    import Desktop from '$lib/components/Desktop.svelte';
    import Settings from '$lib/components/Settings/Settings.svelte';
    
    let isMobile = false;
    let isSettings = false;

    const updateIsMobile = () => {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    };

    const openSettings = () => {
        isSettings = true
    }

    const closeSettings = () => {
        isSettings = false;
    }

    const handleResize = () => updateIsMobile();

    onMount(() => {
 
        updateIsMobile();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<main class="w-screen h-screen overflow-hidden">
    {#if isSettings}
        <Settings {closeSettings}/>
    {:else}
        <Mobile {openSettings}/>
    {/if}

    <!-- <Mobile/> -->
</main>

<style>
    /* Add your styles here */
</style>


<!-- {#if isMobile}
    
{:else}
    <Desktop/>
{/if} -->