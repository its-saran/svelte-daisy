import { writable } from 'svelte/store';

// Create a writable store to manage the authentication state
export const auth = writable({
    isAuthenticated: false,
    user: null,
});

// Function to update the authentication state
export const setAuth = (isAuthenticated, user) => {
    auth.set({ isAuthenticated, user });
};
