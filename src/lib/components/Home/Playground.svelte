<script>
    import MessageCard from "$lib/components/Home/MessageCard.svelte";

    export let messages;
</script>

<div id="playground">
    <ul>
        {#each messages as { id, text, role } (id)}
            <MessageCard {id} {text} {role}/>
        {/each}
    </ul>
    
</div>

<style lang=postcss>
    #playground{
        @apply flex-grow flex flex-col p-4 overflow-y-auto break-words whitespace-pre-wrap gap-6;
        height: 80%;
    }

    ul {
        @apply flex flex-col h-full pt-16;
    }

</style>