import { writable } from 'svelte/store';

// Initial state
const initialState = {
    loggedIn: false,
    username: null,
    theme: 'light',
    gender: null
};


// Create a writable store with the initial state
const appState = writable(initialState);

// Custom functions to update the state
const updateState = (newState) => {
    appState.update((state) => {
        const updatedState = { ...state, ...newState };
        return updatedState;
    });
};



// Export the store and any utility functions
export { appState, updateState};
