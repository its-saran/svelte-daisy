<script>
    export let updateKeys;

    let deepgramKey;
    let openaiKey;

    const submitKeys = () => {
        if (deepgramKey && openaiKey) {
            localStorage.setItem('deepgramKey', deepgramKey);
            localStorage.setItem('openaiKey', openaiKey);

            updateKeys(deepgramKey, openaiKey)
        }
    }

</script>

<div class="h-screen flex flex-col items-center justify-center gap-12">
    <div class="flex items-center justify-center flex-col gap-4 w-full">
        <div class="text-lg font-medium">Please enter API keys</div>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Deepgram</span>
            </div>
            <input type="text" placeholder="API key" class="input input-bordered w-full max-w-xs " bind:value={deepgramKey} required/>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">OpenAI</span>
            </div>
            <input type="text" placeholder="API key" class="input input-bordered w-full max-w-xs" bind:value={openaiKey} required/>
        </label>
    </div>
    <button class="btn btn-primary w-36" on:click={submitKeys}>Submit</button>
</div>