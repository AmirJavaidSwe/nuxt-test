import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyB1_AGkJIuVh0f4QPeoZDJZzmtwff9fDYw",
        authDomain: "nuxt-blog-54912.firebaseapp.com",
        projectId: "nuxt-blog-54912",
        storageBucket: "nuxt-blog-54912.firebasestorage.app",
        messagingSenderId: "945075508934",
        appId: "1:945075508934:web:704aa8f79367d0e56e29c7",
        measurementId: "G-XHHSG7V79L"
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const firebaseAuth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);

    return {
        provide: {
            firebaseApp,
            firebaseAuth,
            firestore
        },
    };
});
