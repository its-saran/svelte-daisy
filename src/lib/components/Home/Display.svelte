<script>
    export let textValue;
</script>

<div id="display">
    <div class="text">{textValue}</div>
</div>

<style lang="postcss">
    #display {
        @apply flex items-center justify-center pt-4 w-full px-2 bg-base-200;
        box-shadow: rgba(60, 64, 67, 0.3) 0px -1px 2px 0px, rgba(60, 64, 67, 0.15) 0px -1px 3px 1px;
        height: 5%;
    }
</style>