<script>
    import { onMount } from "svelte";

    let initialTheme;

    onMount(() => {
        const storedTheme = localStorage.getItem('theme');
        initialTheme = storedTheme || 'light';
    })
</script>

{#if (initialTheme)}
    <div id="loader">
        <span class="loading loading-spinner loading-lg"></span>
    </div>
{/if}


<style lang="postcss">
    #loader {
        @apply h-screen flex items-center justify-center;
    }
</style>