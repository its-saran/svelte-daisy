<script>
    import { onMount } from "svelte";
    import { appState, updateState} from '$lib/stores/preferences.js'

    export let closeSettings;
    export let getName;
    export let getGender;

    let deepgramKey;
    let openaiKey;
    let name;
    let gender;
    let isLightTheme;

    let modalRef;
    let themeModal;

    const openModal = () => modalRef.showModal();
    const submit = () => {
        if (deepgramKey && openaiKey) {
            modalRef.close()
            localStorage.setItem('deepgramKey', deepgramKey)
            localStorage.setItem('openaiKey', openaiKey)
            console.log(deepgramKey)
            console.log(openaiKey)
        }
    }

    const setLightTheme = () => {
        updateState({theme: 'light'})
        isLightTheme = true;
        localStorage.setItem('theme', 'light')
        themeModal.close()
    }

    const setDarkTheme = () => {
        updateState({theme: 'dark'})
        isLightTheme = false;
        localStorage.setItem('theme', 'dark')
        themeModal.close()
    }

    onMount(() => {
        const theme = localStorage.getItem('theme');

        console.log($appState.theme)

        if (theme === 'light') isLightTheme = true;

        name = getName()
        gender = getGender()
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
    <div class="h-full pt-24 flex flex-col gap-4 bg-base-100">
        <div id="profile" class="flex flex-col items-center gap-2">
            <div class="avatar">
                <div class="w-24 h-24 rounded-full">
                  <img src="{gender === 'male' ? './Avatars/Male.png' : './Avatars/Female.png'}" alt="profile"/>
                </div>
            </div>
            <div class="text-lg font-medium">{name}</div>
        </div>
        <div id="settings-items" class="h-full w-full p-4 flex justify-center">
            <ul class="flex flex-col gap-4">
                <li id="theme_section" class="flex items-center justify-between px-12">
                    <div class="text-lg font-medium">Theme</div>
                    <div>
                        <button class="btn btn-neutral w-24" onclick="theme_dialog.showModal()">View</button>
                        <dialog id="theme_dialog" class="modal" bind:this={themeModal}>
                            <div class="modal-box w-56">
                                <h3 class="font-bold text-lg mb-2">Theme</h3>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                      <span class="label-text">Light</span> 
                                      <input type="radio" name="radio-10" class="radio checked:bg-primary" on:click={setLightTheme} checked={isLightTheme}/>
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                      <span class="label-text">Dark</span> 
                                      <input type="radio" name="radio-10" class="radio checked:bg-primary" on:click={setDarkTheme} checked={!isLightTheme}/>
                                    </label>
                                </div>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </li>
                <li id="api_keys_section" class="flex items-center justify-between px-12">
                    <div class="text-lg font-medium">API Keys</div>
                    <div>
                        <button class="btn btn-neutral w-24" on:click={openModal}>Edit</button>
                        <dialog id="api_keys" class="modal" bind:this={modalRef}>
                            <div class="modal-box">
                                <form class="card-body">
                                    <div class="text-lg font-medium">API Keys</div>
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
                <li id="about_section" class="flex items-center justify-between px-12">
                    <div class="text-lg font-medium">About</div>
                    <div>
                        <button class="btn btn-neutral w-24" onclick="about_dialog.showModal()">View</button>
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

    #settings-items ul li {
        @apply gap-12;
    }
</style>
