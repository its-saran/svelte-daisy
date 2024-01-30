<script>
    import MessageCard from "$lib/components/Home/MessageCard.svelte";
    import { afterUpdate } from "svelte";

    export let messages;
    let container;

    afterUpdate(() => {
        container.scrollTop = container.scrollHeight;
    });
</script>

<div id="playground" bind:this={container}>
    <ul>
        {#each messages as { id, text, role } (id)}
            <MessageCard {id} {text} {role}/>
        {/each}
    </ul>
</div>

<style lang=postcss>
    #playground{
        @apply flex-grow flex flex-col items-center p-4 overflow-y-auto break-words whitespace-pre-wrap gap-6;
        height: 80%;
    }

    ul {
        @apply flex flex-col h-full pt-16 md:w-2/3;
    }
</style>
