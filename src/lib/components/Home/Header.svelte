<script>
    import Sidebar from '$lib/components/Sidebar/Sidebar.svelte'

    export let openSettings;
    export let getName;
</script>

<div class="navbar bg-base-100 fixed z-40 shadow-xl">
    <div class="z-20">
        <Sidebar {openSettings} {getName}/>
        <a class="btn btn-ghost text-xl">daisy AI</a>
    </div>
</div>