<script>
    export let updateName;

    let name;

    const saveName = () => {
        if (name) {
            const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)
            name = capitalizeFirstLetter(name)

            localStorage.setItem('name', name);
            console.log(`Name saved as ${name}`) 
            updateName(name)
        }
    }
</script>

<div class="h-screen flex flex-col items-center justify-center gap-12">
    <div class="flex items-center justify-center flex-col gap-4 w-full">
        <div class="avatar">
            <div class="w-52 rounded-full">
                <img alt="" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">What is your name?</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" bind:value={name}/>
        </label>
    </div>
    <button class="btn btn-primary w-36" on:click={saveName}>Next</button>
</div>
