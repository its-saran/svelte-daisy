<script>
    import Header from '$lib/components/Home/Header.svelte'
    export let openSettings;
    export let exitFullscreen;

    const getName = () => localStorage.getItem('name')

</script>

<div class="h-screen overflow-hidden">
    <Header {openSettings} {exitFullscreen} {getName}/>
    <div class="playground px-4 py-4 flex flex-col gap-4 pt-20 pb-4 text-neutral-content">
        <div class="chat chat-start">
            <div class="bg-neutral p-4 rounded-xl">It's over Anakin, <br/>I have the high ground.
            </div>
        </div>
        <div class="chat chat-end">
            <div class="bg-neutral p-4 rounded-xl">You underestimate my power!</div>
        </div>
        <div class="chat chat-start">
            <div class="bg-neutral p-4 rounded-xl">It's over Anakin, <br/>I have the high ground.
            </div>
        </div>
        <div class="chat chat-end">
            <div class="bg-neutral p-4 rounded-xl">You underestimate my power!</div>
        </div>
        <div class="chat chat-start">
            <div class="bg-neutral p-4 rounded-xl">It's over Anakin, <br/>I have the high ground.
            </div>
        </div>
        <div class="chat chat-end">
            <div class="bg-neutral p-4 rounded-xl">You underestimate my power!</div>
        </div>
        <div class="chat chat-start">
            <div class="bg-neutral p-4 rounded-xl">It's over Anakin, <br/>I have the high ground.
            </div>
        </div>
        <div class="chat chat-end">
            <div class="bg-neutral p-4 rounded-xl">You underestimate my power!</div>
        </div>
        <div class="chat chat-start">
            <div class="bg-neutral p-4 rounded-xl">It's over Anakin, <br/>I have the high ground.
            </div>
        </div>
        <div class="chat chat-end">
            <div class="bg-neutral p-4 rounded-xl">You underestimate my power!</div>
        </div>
    </div>
    <div class="controls flex flex-col items-center justify-center border border-zinc-400 gap-4 px-12 pt-4 ">
        <textarea class="textarea textarea-bordered w-full h-16 resize-none" placeholder="Bio"></textarea>
        <!-- <textarea class="w-full h-16 resize-none border border-zinc-300" placeholder="Bio"></textarea> -->
        <div class="h-16 w-16 border border-black rounded-full flex items-center justify-center">Mic</div>
    </div>
</div>

<style lang="postcss">
    .playground {
        height: 80vh; 
        overflow-y: auto; 
    }

    .controls {
        height: 22vh;
    }

    textarea {
        @apply outline-none;
    }
</style>
