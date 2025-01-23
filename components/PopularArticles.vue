<script setup>
const props = defineProps(['posts']);
</script>
<template>
    <section class="py-4 bg-white">
        <div class="mx-auto px-4">
            <h2 class="text-2xl font-bold mb-8">Popular Articles</h2>
            <div class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 bg-white">
                <!-- Card -->
                <template v-for="post in posts" :key="post.id">
                    <ArticleCard :post="post" />
                </template>
                <!-- Additional Cards Go Here -->
            </div>

            <div class="mt-6 text-left">
                <button
                    class="px-6 py-2 border border-gray-300 hover:bg-gray-100 hover:border-dark hover:text-dark text-subtitle rounded-full">View
                    More</button>
            </div>
        </div>
    </section>

</template>