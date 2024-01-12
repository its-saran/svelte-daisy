<script>
    export let textValue;
</script>

<div id="display">
    <div class="text">{textValue}</div>
</div>

<style lang="postcss">
    #display {
        @apply flex items-center justify-center pt-4 w-full px-2;
        box-shadow: rgba(99, 99, 99, 0.2) 8px 0px 0px 0px;
        height: 5%;
    }
</style>