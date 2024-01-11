<script>
    import { onMount } from "svelte";

    export let closeSettings;
    export let changeTheme;

    let deepgramKey;
    let openaiKey;

    let modalRef;

    const openModal = () => modalRef.showModal();
    const submit = () => {
        if (deepgramKey && openaiKey) {
            modalRef.close()
            localStorage.setItem('deepgramKey', deepgramKey)
            localStorage.setItem('openaiKey', openaiKey)
        }
    }

    const setDefaultTheme = () => { 
        console.log('Default')
    }

    const setLightTheme = () => {
        changeTheme('light')
        localStorage.setItem('theme', 'light')
    }

    const setDarkTheme = () => {
        changeTheme('dark')
        localStorage.setItem('theme', 'dark')
    }

    onMount(() => {
        deepgramKey = localStorage.getItem('deepgramKey')
        openaiKey = localStorage.getItem('openaiKey')
    })


</script>

<div id="settings">
    <div class="bg-base-100 fixed z-40 w-full">
        <div class="navbar z-20 flex gap-2">
            <button class="btn btn-ghost btn-circle btn-md" on:click={closeSettings}>
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
    <div class="h-full pt-24 flex flex-col gap-4 bg-base-200">
        <div id="profile" class="flex flex-col items-center gap-2">
            <div class="avatar">
                <div class="w-24 h-24 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profile"/>
                </div>
            </div>
            <div class="text-lg font-medium">Saran</div>
        </div>
        <div id="settings-items" class="h-full w-full p-4 flex justify-center">
            <ul class="flex flex-col gap-4">
                <li class="flex items-center justify-between px-12">
                    <div class="text-lg font-medium pr-36">Theme</div>
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn">
                          Default
                          <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                        </div>
                        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                        <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                            <li>
                                <input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default" on:click={setDefaultTheme}/>
                            </li>
                            <li>
                                <input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light" on:click={setLightTheme}/>
                            </li>
                            <li>
                                <input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" on:click={setDarkTheme}/>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="flex items-center justify-between px-12">
                    <div class="text-lg font-medium">API Keys</div>
                    <div>
                        <button class="btn w-24" on:click={openModal}>Edit</button>
                        <dialog id="api_keys" class="modal" bind:this={modalRef}>
                            <div class="modal-box">
                                <form class="card-body">
                                    <div class="form-control">
                                    <label class="label" for="">
                                        <span class="label-text">Deepgram</span>
                                    </label>
                                    <input type="password" placeholder="API Key" class="input input-bordered" bind:value={deepgramKey} required/>
                                    </div>
                                    <div class="form-control">
                                    <label class="label" for="">
                                        <span class="label-text">OpenAI</span>
                                    </label>
                                    <input type="password" placeholder="API key" class="input input-bordered" bind:value={openaiKey} required/>
                                    </div>
                                    <div class="form-control mt-6">
                                    <button class="btn btn-primary" on:click={submit}>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </li>
                <li id="about" class="flex items-center justify-between px-12">
                    <div class="text-lg font-medium">About</div>
                    <div>
                        <button class="btn w-24" onclick="about_dialog.showModal()">View</button>
                        <dialog id="about_dialog" class="modal">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">About</h3>
                                <p class="py-4">Press ESC key or click outside to close</p>
                                <div class="modal-action">
                                    <form method="dialog">
                                      <button class="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>


<style lang="postcss">
    #settings {
        @apply w-full h-full;
    }
</style>
