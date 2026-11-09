import { defineStore } from 'pinia' 
import { ref } from 'vue'
import { api } from '@/boot/axios'

export const useAlbumStore = defineStore('album',() => {
    const album = ref([])
    const loading = ref(false)
    const errMsg = ref('')
    async function loadAlbum(){
    loading.value = true
    errMsg.value = ''
    try {
        const respon = await api.get('/albums')
        album.value = respon.data
    } catch (error) {
        if(error.response){
            errMsg.value = `server Error: (${error.response.status}) `
        }else if(error.refquest){
            errMsg.value = 'No response from server'
        }else{
            errMsg.value = error.message
        }
        console.error(error)
    } finally {
        loading.value = false
    }
    }
return {album, loading, errMsg, loadAlbum}
})
