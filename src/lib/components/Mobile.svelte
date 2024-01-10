<script>
</script>

<div class="h-screen overflow-hidden">
    <div class="navbar bg-base-100 fixed z-40 shadow-xl">
        <div class="z-20">
            <div class="drawer">
                <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
                <div class="drawer-content">
                  <!-- Page content here -->
                  <label for="my-drawer" class="btn btn-ghost btn-circle drawer-button btn-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                  </label>
                </div> 
                <div class="drawer-side">
                  <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                  <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <!-- Sidebar content here -->
                    <li><a>Settings</a></li>
                    <li><a>Usage</a></li>
                  </ul>
                </div>
            </div>
            <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
    </div>
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
        <div class="h-16 w-16 border border-black rounded-full flex items-center justify-center">Mic</div>
    </div>
</div>

<style>
    .playground {
        height: 80vh; 
        overflow-y: auto; 
    }

    .controls {
        height: 22vh;
    }
</style>
