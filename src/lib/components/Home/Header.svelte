<script>
    import { onMount } from 'svelte';

    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
    import Speaker from '$lib/components/Icons/Speaker.svelte';
    import Mute from '$lib/components/Icons/Mute.svelte';
    import Exit from '$lib/components/Icons/Exit.svelte';

    export let openSettings;
    export let exitFullscreen;
    export let getName;
    export let getGender;
    export let isMobile;
    export let isFullscreen;
    export let isMute;
    export let toggleMute;

</script>

<div id="navbar">
    <div class="navbar bg-base-100 fixed z-40 shadow-xl">
        <div class="z-20 w-full flex justify-between">
            <div class="flex gap-2">
                <Sidebar {openSettings} {getName} {getGender}/>
                <div class="btn btn-ghost text-xl p-0 md:p-2">Daisy AI</div>
            </div>
            <div class="flex items-center gap-2">
                <button id="stopAudio" class="btn btn-ghost btn-circle" on:click={toggleMute}>
                    {#if isMute}
                        <Mute/>
                    {:else}
                        <Speaker/>
                    {/if}
                </button>
                {#if isMobile || !isMobile && isFullscreen}
                    <button class="btn btn-ghost btn-circle" on:click={exitFullscreen}>
                        <Exit/>
                    </button>
                {/if}
            </div>
        </div>
    </div>
    <div class="navbarFiller h-16"></div>
</div>

