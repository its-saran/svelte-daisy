<script>
    import { appState, updateState} from '$lib/stores/preferences.js'

    const handleButtonClick = () => {
        updateState({ theme: 'light' }); // Change the theme to 'dark' when the button is clicked
    };
</script>

<div class="h-32 bg-green-400">
    <h1>{$appState.theme}</h1>
    <button class="btn" on:click={handleButtonClick}>Light</button>
</div>