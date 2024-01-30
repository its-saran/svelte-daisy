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
    }

    ul {
        @apply flex flex-col pt-16 w-full md:w-2/3 md:mb-4;
    }
</style>
