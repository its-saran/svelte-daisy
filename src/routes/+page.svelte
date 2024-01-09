<script>

    import { onMount  } from "svelte";

    let isChecked = false;

    function handleCheckboxChange() {
        console.log(`Checkbox is ${isChecked ? 'checked' : 'unchecked'}`);
        updateBodyOverflow();
    }

    // This function will be called once the component is mounted to the DOM
    onMount(() => {
        updateBodyOverflow();
    });

    function updateBodyOverflow() {
        document.body.style.overflow = isChecked ? 'hidden' : 'auto';
    }
</script>

<div class="h-screen">
    <div class="navbar bg-base-100 fixed z-40">
        <div class="z-20">
            <div class="drawer">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={isChecked} on:change={handleCheckboxChange}/>
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
    <div class="playground px-4 py-4 flex flex-col gap-4 pt-20 pb-4">
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>        
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>        
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>        
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>     
        <div class="chat chat-start">
            <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
        </div>
        <div class="chat chat-end">
            <div class="chat-bubble">You underestimate my power!</div>
        </div>  
    </div>
    <div class="controls btm-nav z-10">
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span class="btm-nav-label">Home</span>
        </button>
        <button class="active">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span class="btm-nav-label">Warnings</span>
        </button>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span class="btm-nav-label">Statics</span>
        </button>
    </div>
</div>

