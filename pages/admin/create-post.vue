
<script setup>

import { useNuxtApp } from '#app';
import { faker } from '@faker-js/faker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

definePageMeta({
    middleware: ["auth"],
});

const blog = useBlogStore();
const { $firestore } = useNuxtApp();

const title = ref('');
const content = ref('');
const category = ref('');
const is_hero = ref(false);
const imageUrl = ref('');
const categories = computed(() => blog?.getCategories);


onMounted(() => {
    imageUrl.value = faker.image.url(350, 480, "nature", true)
})

const handleSubmit = async () => {
    try {

        if (!title.value || !content.value || !category.value || !imageUrl.value) {
            alert('All fields are required, including Category, Title, Content, and Image.');
            return;
        }

        const postsCollection = collection($firestore, 'posts');
        await addDoc(postsCollection, {
            title: title.value,
            content: content.value,
            category: category.value,
            is_hero: is_hero.value,
            image_url: imageUrl.value,
            createdAt: serverTimestamp()
        });

        await blog.fetchPosts();
        alert('Post created successfully!');
        navigateTo('/posts')

        title.value = '';
        content.value = '';
        category.value = '';
        is_hero.value = false;

    } catch (error) {
        console.error('Failed to create post:', error);
        alert('Failed to create post. Please try again.');
    }
};

const changingImage  = ref(false)
const refreshImage = () => {
    changingImage.value = true
    imageUrl.value = faker.image.url(350, 480, "flowers", true)
    changingImage.value = false
}

</script>
<template>
    <div>
        <form class="max-w-2xl mx-auto my-20" @submit.prevent="handleSubmit">
            <div class="mb-5">
                <label for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category:</label>
                <select id="countries" v-model="category" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Please Select a Category</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.title">
                        {{ cat.title }}
                    </option>
                </select>

            </div>
            <div class="mb-5">
                <label for="titke" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
                <input type="text" id="title" v-model="title"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-100"
                    placeholder="Enter Post Title" required />
            </div>
            <div class="mb-5">
                <label for="content"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content:</label>
                <textarea id="content" rows="10" placeholder="Post Content" v-model="content"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-100"
                    required></textarea>
            </div>
            <div class="mb-8 mt-8">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
                    Image
                </label>
                <a href="javascript:;" class="mb-4 relative font-xl font-semibold text-blue-700" @click="refreshImage">Change Image</a>
                <NuxtImg :src="imageUrl" loading="lazy" class="h-80" />

            </div>
            <div class="flex items-center mb-5">
                <input id="default-checkbox" v-model="is_hero" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Hero
                    Post</label>
            </div>

            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

    </div>
</template>
