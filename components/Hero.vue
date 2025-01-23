<template>
    <section class="bg-white py-16">
        <div class=" mx-auto px-4">
            <h1 class="text-5xl font-bold">{{ 'Events in Minutes Ideas' }}</h1>
            <p class="text-normal tracking-widest leading-10 text-subtitle mt-2">Welcome to our Ideas Hub, where we
                share tips. trends and <br /> inspiration for unforgettable events.</p>

            <!-- Main Card -->
            <div class="pt-16 pb-28 border-b border-gray-200">
                <div class="flex flex-col xl:flex-row rounded-xl relative">
                    <!-- Image Section -->
                    <div class="flex-shrink-0 w-full xl:w-1/2">
                        <NuxtImg :src="post?.image_url" alt="Hero Image" class="object-cover w-full h-full rounded-t-xl xl:rounded-tr-none xl:rounded-l-xl"
                        :style="{ height : '400px' }" loading="lazy" />
                    </div>
                    <!-- Content Section -->
                    <div
                        class="flex flex-col justify-between w-full xl:w-1/2 p-8 bg-white rounded-b-xl xl:rounded-none xl:rounded-r-xl shadow-xl">
                        <div ref="contentRef">
                            <p class="text-subtitle text-sm">{{ post?.createdAt }}</p>
                            <h2 class="text-3xl leading-10 mt-2 break-words">{{ post?.title }}</h2>
                            <p class="text-subtitle mt-2 pb-4 border-b border-gray-200 break-words line-clamp">
                                {{ truncatedContent }}
                            </p>
                        </div>
                        <div class="mt-4 flex justify-between items-center">
                            <span class="px-3 py-2 bg-gray-100 text-subtitle text-sm rounded-md">
                                {{ post?.category }}
                            </span>
                            <NuxtLink :to="'/posts/post/'+post?.id" class="text-dark text-sm">Read →</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </section>
</template>
<script setup>
const props = defineProps(['post']);

const truncatedContent = computed(() => {
    const maxWords = 50;
    if (!props?.post?.content) return '';
    const words = props?.post?.content.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : props?.post?.content;
});
</script>
