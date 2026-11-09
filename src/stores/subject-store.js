import {defineStore} from 'pinia'
import {ref} from 'vue'
import {api} from '@/boot/axios'

export const useSubjectStore = defineStore('subjects', () => {
    const subjects =ref([])
    async function fechtAll(){
        try {
            const res= await api.get('/subjects')
            subjects.value = res.data
            console.log('Listing All: ', res.data)
        } catch (error) {
            console.error('Error fetching subjects:', error)
        }
    }
    return { subjects, fechtAll }
})