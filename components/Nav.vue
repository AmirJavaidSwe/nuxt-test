<script setup>
import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

onMounted(() => {
    useFlowbite(() => {
        initFlowbite();
    })
})

const session = useAuthStore();
const authStore = useAuthStore();

const handleLogout = async () => {
    try {
        await authStore.logout();
    } catch (error) {
        console.error(error);
    }
};

</script>
<template>
  <header class="shadow-md border-b border-gray-200 relative">
    <div
      class="container mx-auto flex justify-between flex-wrap md:flex-nowrap space-y-4 sm:space-y-0 items-center px-4 py-4">
      <div class="flex items-center space-x-4">
        <NuxtLink to="/posts">
          <img src="~/assets/images/logo.png" alt="Logo" class="h-8" />
        </NuxtLink>
        <span class="ps-8 text-dark text-md">+1 (628) 587-3235</span>
      </div>
      <div class="flex items-center space-x-6">
        <p class="text-sm">Top Vendors, Apply Now!</p>
        <div class="flex justify-between items-center bg-gray-100 rounded-full">
          <button id="dropdownDefaultButton" class="flex items-center" data-dropdown-toggle="dropdown">
            <span class="px-4 py-2 text-sm">
              <img src="~/assets/images/hamburger.png" alt="" />
            </span>
            <span class="px-4 py-2 text-sm">
              <img src="~/assets/images/user-icon.png" alt="" />
            </span>

          </button>
        </div>
        <div id="dropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <NuxtLink to="/posts"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Home / Posts
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Categories
              </NuxtLink>
            </li>
            <li v-if="session.user">
              <NuxtLink to="/admin/create-post"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Create Post
              </NuxtLink>
            </li>
            <li v-if="session.user">
              <NuxtLink to="/admin/create-category"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Create Category
                </NuxtLink>
            </li>
            <li class="flex flex-col space-y-2" v-if="session.user">
              <span class="px-4 mt-4">{{ session.user.email }}</span>
              <a href="javascript:;" @click="handleLogout" class="text-red-700 font-semibold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                out</a>
            </li>
            <li v-if="!session.user">
              <NuxtLink to="/auth/login" class="text-green-700 font-semibold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Login</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>