<script>
    export let updateName;
    export let updateGender;

    let name;
    let gender = 'male';

    const setFemale = () => { gender = 'female' }
    const setMale = () => { gender = 'male' }

    const saveProfile = () => {
        if (name && gender) {
            const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)
            name = capitalizeFirstLetter(name)

            localStorage.setItem('name', name);
            console.log(`Name saved as ${name}`) 
            updateName(name)

            localStorage.setItem('gender', gender);
            console.log(`Gender saved as ${gender}`) 
            updateGender(gender)
        }
    }
</script>

<div class="h-screen flex flex-col items-center justify-center gap-12 bg-base-100">
    <div class="flex items-center justify-center flex-col gap-3 w-full">
        <div class="avatar">
            <div class="w-52 rounded-full">
                <img alt="" src="{gender === 'male' ? './Avatars/Male.png' : './Avatars/Female.png'}" />
            </div>
        </div>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">What is your name?</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" bind:value={name}/>
        </label>
        <div class="flex items-center justify-center w-full max-w-xs gap-4">
            <h2 class="font-medium text-lg">Gender:</h2>
            <div class="flex gap-3">
                <div class="form-control">
                    <label class="label cursor-pointer flex gap-2">
                      <span class="label-text text-lg">Male</span> 
                      <input type="radio" name="male" class="radio checked:bg-primary" checked={gender === 'male'} on:change={setMale}/>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer flex gap-2">
                      <span class="label-text text-lg">Female</span> 
                      <input type="radio" name="female" class="radio checked:bg-primary" on:change={setFemale} checked={gender === 'female'}/>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary w-36" on:click={saveProfile}>Next</button>
</div>
