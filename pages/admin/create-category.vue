<template>
    <div>
        <form class="max-w-2xl mx-auto my-20" @submit.prevent="handleSubmit">
            <div class="mb-5">
                <label for="titke" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Title:</label>
                <input type="text" id="category-title" v-model="title"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-100"
                    placeholder="Enter Post Title" required />
            </div>
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

    </div>
</template>

<script setup>
import { collection, addDoc } from 'firebase/firestore';
import { useNuxtApp } from '#app';
definePageMeta({
  middleware: ["auth"],
});

const blog = useBlogStore();

const title = ref('');

const { $firestore } = useNuxtApp();


const handleSubmit = async () => {
    const postsCollection = collection($firestore, 'categories');
    await addDoc(postsCollection, {
        title: title.value,
    });
    await blog.fetchCategories()
    alert('Category created successfully!');
    title.value = ''
};
</script>