<script setup>
const props = defineProps(['post']);

const truncatedContent = computed(() => {
    const maxWords = 20;
    if (!props?.post?.content) return '';
    const words = props?.post?.content.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : props?.post?.content;
});
</script>
<template>
    <div class="rounded-lg overflow-hidden">
        <NuxtImg :src="post?.image_url" alt="Article" class="rounded-lg w-full h-48 object-cover" loading="lazy" />
        <div class="py-4">
            <p class="text-subtitle mb-4 text-sm">{{ post?.createdAt }}</p>
            <NuxtLink :to="'/posts/post/'+post.id">
                <h3 class="text-xl font-semibold mt-2">
                    {{ post?.title }}
                </h3>
            </NuxtLink>
            <p class="text-subtitle mt-4 text-sm">
                {{ truncatedContent }}
            </p>
        </div>
    </div>
</template>
