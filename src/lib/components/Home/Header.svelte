<script>
    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte'

    export let openSettings;
    export let exitFullscreen;
    export let getName;
    export let isMobile;
    export let isFullscreen;
</script>

<div class="navbar bg-base-100 fixed z-40 shadow-xl">
    <div class="z-20 w-full flex justify-between">
        <div class="flex gap-2">
            <Sidebar {openSettings} {getName}/>
            <div class="btn btn-ghost text-xl p-0">Daisy AI</div>
        </div>
        <div class="flex items-center gap-2">
            <button id="stopAudio" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" class="w-7 h-7" viewBox="0 0 75 75" stroke="currentColor">
                    <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                    style="stroke:#111;stroke-width:5;stroke-linejoin:round;"
                    />
                    <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke-width:5;stroke-linecap:round"/>
                </svg>
            </button>
            {#if isMobile || !isMobile && isFullscreen}
                <button class="btn btn-ghost btn-circle" on:click={exitFullscreen}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 18.008 18.009" >
                        <path id="Exit-Icon-SVG-0987678" d="M13.2,13.788V15.2a2.817,2.817,0,0,1-2.814,2.814H3.314A2.817,2.817,0,0,1,.5,15.2V2.814A2.817,2.817,0,0,1,3.314,0h7.07A2.817,2.817,0,0,1,13.2,2.814V4.221a.7.7,0,0,1-1.407,0V2.814a1.409,1.409,0,0,0-1.407-1.407H3.314A1.409,1.409,0,0,0,1.907,2.814V15.2A1.409,1.409,0,0,0,3.314,16.6h7.07A1.409,1.409,0,0,0,11.791,15.2V13.788a.7.7,0,0,1,1.407,0Zm4.8-5.992L16.419,6.221a.7.7,0,0,0-.995.995l1.12,1.121H8.1a.7.7,0,0,0,0,1.407h8.447l-1.12,1.121a.7.7,0,1,0,.995.995l1.575-1.575a1.761,1.761,0,0,0,0-2.487Zm0,0" transform="translate(-0.5)"/>
                    </svg>
                </button>
            {/if}
        </div>
    </div>
</div>