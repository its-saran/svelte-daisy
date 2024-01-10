<script>
    import { onMount } from 'svelte';

    let name;

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

    const saveName = () => {
        localStorage.setItem('name', name);
        console.log(`Name saved as ${name}`)
    }
    

    onMount(() => {
        name = localStorage.getItem('name')
 
        updateIsMobile();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<main class="w-screen h-screen overflow-hidden">
    {#if name}
        <Mobile/>
    {:else}
        <Setup bind:name={name} {saveName}/>
    {/if}
</main>

<style>
    /* Add your styles here */
</style>


        <!-- {#if isMobile}
            
        {:else}
            <Desktop/>
        {/if} -->