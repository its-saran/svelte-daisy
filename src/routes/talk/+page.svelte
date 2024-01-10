<script>
    import { onMount } from 'svelte';

    import Mobile from '$lib/components/Mobile.svelte';
    import Desktop from '$lib/components/Desktop.svelte';
    import Setup from '$lib/components/Setup/Setup.svelte'
    
    let isMobile = false;

    const updateIsMobile = () => {
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }
    };

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
    <Setup/>
        <!-- {#if isMobile}
            <Mobile/>
        {:else}
            <Desktop/>
        {/if} -->
</main>

<style>
    /* Add your styles here */
</style>
