<script>
    import { appState, updateState} from '$lib/stores/preferences.js'

    const handleButtonClick = () => {
        updateState({ theme: 'dark' }); // Change the theme to 'dark' when the button is clicked
    };
</script>

<div class="h-32 bg-blue-400">
    <h1>{$appState.theme}</h1>
    <button class="btn" on:click={handleButtonClick}>Dark</button>
</div>