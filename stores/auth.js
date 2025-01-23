import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNuxtApp } from '#app';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(email, password) {
            const { $firebaseAuth } = useNuxtApp();
            try {
                const userCredential = await signInWithEmailAndPassword($firebaseAuth, email, password);
                this.user = userCredential.user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.error('Login failed:', error.message);
                throw error;
            }
        },

        async logout() {
            const { $firebaseAuth } = useNuxtApp();
            try {
                await signOut($firebaseAuth);
                this.user = null;
                localStorage.removeItem('user');
            } catch (error) {
                console.error('Logout failed:', error.message);
                throw error;
            }
        },

        async initializeAuth() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.user = user;
            }
        },
    },
});
