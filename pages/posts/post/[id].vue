<script setup>
import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';

const route = useRoute();
const postId = route.params.id;

// Use async data to fetch post data during SSR
const { data: post, pending, error } = await useAsyncData('post', async () => {
  const { $firestore } = useNuxtApp();
  const postDoc = doc($firestore, 'posts', postId);
  const snapshot = await getDoc(postDoc);

  if (snapshot.exists()) {
    const postData = snapshot.data();

    return {
      id: snapshot?.id,
      title: postData?.title,
      content: postData?.content,
      image_url: postData?.image_url,
      category: postData?.category,
      createdAt: moment(postData?.createdAt.toDate()).format('MMM D, YYYY')
    };
  } else {
    return null;
  }
});

if (post.value) {
  useHead({
    title: post?.value?.title,
  });
}
</script>

<template>
  <div class="container mx-auto py-16">
    <div v-if="pending" class="text-center">
      <p>Loading post...</p>
    </div>
    <div v-else-if="post">
      <NuxtImg :src="post.image_url" alt="Post Image" class="w-full h-96 object-cover rounded-xl mb-8" loading="lazy" />
      <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
      <p class="text-gray-500 text-sm mb-2">Published: {{ post.createdAt }}</p>
      <p class="text-sm text-gray-600 bg-gray-100 inline-block py-1 rounded-md mb-6">
        Category: {{ post.category || 'Uncategorized' }}
      </p>
      <p class="text-lg leading-relaxed">{{ post.content }}</p>
    </div>
    <div v-else class="text-center">
      <p>Post not found!</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
