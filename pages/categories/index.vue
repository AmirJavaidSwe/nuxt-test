<script setup>
const categories = ref('')
onMounted(() => {
  const blog = useBlogStore();
  categories.value = blog?.getCategories
})
</script>

<template>
  <div class="container mx-auto py-16">

    <h1 class="text-4xl font-bold mb-4">{{ 'Categories' }}</h1>
    <div class="text-start mt-8">
      <template v-for="cat in categories" :key="cat.id">
        <span class="mx-3 px-4 py-3 bg-gray-100 text-dark text-lg rounded-md">
          {{ cat.title }}
        </span>
      </template>
    </div>
  </div>
</template>