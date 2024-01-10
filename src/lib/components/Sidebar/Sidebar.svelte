<script>
    import { onMount } from "svelte";

    export let openSettings;
    export let getName;
    
    let name;
    let firstLetter;

    onMount(() => {
        name = getName()
        firstLetter = name.charAt(0);
    })
</script>

<div class="drawer select-none">
    <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-content">
      <!-- Page content here -->
      <label for="my-drawer" class="btn btn-ghost btn-circle drawer-button btn-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="w-80 min-h-full bg-base-200 text-base-content flex">
          <!-- Sidebar content here -->
          <button class="self-end border-t border-zinc-600 w-full flex items-center px-3 py-2 gap-4" on:click={openSettings}>
              <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-full w-12">
                      <span>{firstLetter}</span>
                  </div>
              </div> 
              <div>{name}</div>
              <div class="ml-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 27.39 27.385" fill="currentColor" stroke="currentColor">
                    <g id="settings-gears-SVG-0976789" transform="translate(-0.001 -4.737)">
                      <path id="Path_6080" data-name="Path 6080" d="M3.035,21.434a11.251,11.251,0,0,0,1.006,2.389L2.827,25.355a1.257,1.257,0,0,0,.094,1.666l2.092,2.092a1.252,1.252,0,0,0,1.666.094L8.2,28a11.058,11.058,0,0,0,2.484,1.051l.228,1.958a1.254,1.254,0,0,0,1.244,1.11h2.96a1.254,1.254,0,0,0,1.244-1.11l.218-1.889a11.185,11.185,0,0,0,2.662-1.076l1.472,1.165a1.257,1.257,0,0,0,1.666-.094l2.092-2.092a1.252,1.252,0,0,0,.094-1.666L23.42,23.907a10.925,10.925,0,0,0,1.1-2.618l1.765-.2a1.254,1.254,0,0,0,1.11-1.244v-2.96a1.254,1.254,0,0,0-1.11-1.244l-1.74-.2a11,11,0,0,0-1.051-2.588l1.071-1.353a1.257,1.257,0,0,0-.094-1.666L22.379,7.741a1.252,1.252,0,0,0-1.666-.094L19.4,8.688a11.033,11.033,0,0,0-2.722-1.14l-.2-1.7a1.254,1.254,0,0,0-1.244-1.11h-2.96a1.254,1.254,0,0,0-1.244,1.11l-.2,1.7a10.987,10.987,0,0,0-2.791,1.18L6.679,7.647a1.257,1.257,0,0,0-1.666.094L2.921,9.833A1.252,1.252,0,0,0,2.827,11.5l1.14,1.443a10.784,10.784,0,0,0-1.031,2.613l-1.824.208A1.254,1.254,0,0,0,0,17.007v2.96a1.254,1.254,0,0,0,1.11,1.244Zm10.723-8.006A4.893,4.893,0,1,1,8.865,18.32,4.9,4.9,0,0,1,13.758,13.427Z"/>
                    </g>
                  </svg>
              </div>
          </button>
      </div>
    </div>
</div>