<script>
    export let id;
    export let text;
    export let role;
</script>

<li class="flex flex-col" key={id} {role}>
    <div class="message">
        {text}
    </div>
</li>


<style lang="postcss">
    li { 
        @apply mb-4; 
        width: 90%
    }

    li[role='user'] { 
        @apply mr-auto; 
    }

    li[role='system'] { 
        @apply ml-auto; 
    }

    .message {
        @apply bg-base-200 font-normal rounded-md py-4 px-4;
        /* #F5F5F5 */
    }

    li[role='user'] .message {
        @apply mr-auto;
    }

    li[role='system'] .message {
        @apply ml-auto;
    }


</style>