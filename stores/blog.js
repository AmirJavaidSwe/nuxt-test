import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import moment from 'moment';
import { query, orderBy, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';


export const useBlogStore = defineStore('blog', {
    state: () => ({
        posts: [],
        categories: [],
        heroPost: null,
        otherPosts: [],
    }),

    getters: {
        getCategories(state) {
            if(state.categories.length > 0) {
                return state.categories
            } else {

                this.fetchCategories()
                return state.categories
            }
        },
        getPosts(state) {
            if(state.posts.length > 0) {
                return {
                    posts: state.posts,
                    otherPosts: state.otherPosts,
                    heroPost: state.heroPost
                }
            } else {
                this.fetchPosts()
                return {
                    posts: state.posts,
                    heroPost: state.heroPost,
                    otherPosts: state.otherPosts,
                }
            }
        },
    },

    actions: {
        async fetchPosts() {
            const { $firestore } = useNuxtApp();
            const postsCollection = collection($firestore, 'posts');
            const q = query(postsCollection, orderBy('createdAt', 'desc'));

            try {
                const querySnapshot = await getDocs(q);
                const sortedPosts = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    if (data.createdAt) {
                        data.createdAt = moment(data.createdAt.toDate()).format('MMM D, YYYY')
                    }
                    return {
                        id: doc.id,
                        ...data,
                    };
                });

                const heroIndex = sortedPosts.findIndex((post) => post.is_hero === true);
                if (heroIndex !== -1) {
                    this.heroPost = sortedPosts[heroIndex];
                    sortedPosts.splice(heroIndex, 1);
                }

                this.otherPosts = sortedPosts;
                this.posts = [...(this.heroPost ? [this.heroPost] : []), ...this.otherPosts];
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },

        async fetchCategories() {

            const { $firestore } = useNuxtApp();
            const categoriesCollection = collection($firestore, 'categories');
            try {
                const querySnapshot = await getDocs(categoriesCollection);
                this.categories = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        },
    },
});
