<template>
    <div>
        <!-- Hero Section -->
        <Hero :post="heroPost" />

        <!-- Popular Articles -->
        <PopularArticles :posts="otherPosts" />
    </div>
</template>

<script setup>
const blog = useBlogStore();

const { data: postsData, error } = await useAsyncData(
    "posts",
    async () => {
        await blog.fetchPosts();
        return {
            heroPost: blog?.getPosts?.heroPost,
            otherPosts: blog?.getPosts?.otherPosts,
        };
    },
    {
        ssr: false,
    }
);

const heroPost = computed(() => postsData.value?.heroPost);
const posts = computed(() => postsData.value?.posts);
const otherPosts = computed(() => postsData.value?.otherPosts);
</script>
