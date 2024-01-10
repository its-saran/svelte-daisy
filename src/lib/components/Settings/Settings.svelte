<script>
    export let closeSettings;
</script>

<div class="navbar bg-base-100 fixed z-40">
    <div class="z-20 flex gap-2">
        <button for="my-drawer" class="btn btn-ghost btn-circle btn-md" on:click={closeSettings}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 117.248 103.773" fill="none">
                <g id="Group_27717" data-name="Group 27717" transform="translate(7.071 7.071)">
                  <line id="Line_8" data-name="Line 8" x1="44.815" y2="44.815" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="10"/>
                  <line id="Line_41" data-name="Line 41" x1="100.647" transform="translate(4.529 44.815)" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="10"/>
                  <line id="Line_9" data-name="Line 9" x1="44.815" y1="44.815" transform="translate(0 44.815)" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="10"/>
                </g>
              </svg>              
        </button>
        <div class="btn btn-ghost text-xl p-0">Settings</div>
    </div>
</div>