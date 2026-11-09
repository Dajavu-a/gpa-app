import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/boot/axios";

export const usePostStore = defineStore('posts', () => {

    const postItems = ref([])
    const isLoading = ref(false)

    async function fetchAllPosts(){
        isLoading.value = true
        try{
            const res = await api.get('/posts')

            postItems.value = res.data
            console.log('Listing All: ', res.data)
        } catch (error){
            console.error('Fetch Error: ', error)
       } finally{
            isLoading.value = false
       }
    }
//101926
    async function createNewPost(newPost){
        try{
            // const res = await api.post('/posts', newPost, {
            //     headers: {
            //         'Content-Type': 'application/json; charset=UTF-8'
            //     }
            // });
            const res = await api.post('/posts', newPost);
            console.log("Create success: ", res.data)

            postItems.value.unshift(res.data)
        } catch (error){
            console.log("Create error: ", error)
        }
    }

    async function updatePost(id, updateData){
        try {
            //  
            const res = await api.put(`/posts/${id}`, updateData);
            console.log("Update success: ", res.data)
            const index = postItems.value.findIndex(item => item.id === id)
            if (index !== -1)postItems.value[index] = res.data
            
        } catch (error) {
            console.error("Update error: ", error)
        }
    }

    async function deletePost(id){
        try {
            await api.delete(`/posts/${id}`);
            console.log("Delete success: ", id)
            postItems.value = postItems.value.filter(item => item.id !== id)
        } catch (error) {
            console.error("Delete error: ", error)
        }
    }
    async function filterPost(userId){
        isLoading.value = true
        try {
            const res = await api.get(`/posts?userId=${userId}`)
            postItems.value = res.data
            console.log(`Filter id: ${userId}, success: `, res.data)
        } catch (error) {
            console.error("Filter error: ", error)
        } finally{
            isLoading.value = false
        }
    }
    async function fetchComment(id){
        try {
            const res = await api.get(`/posts/${id}/comments`)
            console.log(`Fetch comments for postId: ${id}, success: `, res.data)
            return res.data
        } catch (error) {
            console.error("Fetch comment error: ", error)
            throw error
        }
    }



    return { postItems, isLoading, fetchAllPosts, createNewPost ,updatePost,deletePost,filterPost,fetchComment}
})