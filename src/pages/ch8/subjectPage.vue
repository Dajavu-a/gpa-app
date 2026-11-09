<template>
    <q-page  class="q-pa-md">
        <div v-if="loading" class="q-pa-md">
            <q-spinner-dots color="primary" size="50px">

            </q-spinner-dots>
        </div>
        <div v-else>
                
            <q-table :columns="columns" :rows="subjects" row-key="id" :loading="loading" flat bordered>
                
            </q-table>
        </div>
    </q-page>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import { api } from '@/boot/axios'
const subjects = ref([])
const loading = ref(true)
const columns = [
    {name: 'id' , label: 'ID', field: 'id', align: 'left'},
    {name: 'code' , label: 'รหัสวิชา', field:'code' ,align:'center'},
    {name: 'name' , label: 'ชื่อวิชา', field:'name',align:'left'},
    {name: 'credit' , label: 'หน่วยกิต', field:'credit',align:'right'},
    {name: 'score' , label: 'คะแนน', field:'score',align:'right'},
]
onMounted(async()=>{
    try{
        const res = await api.get('/subjects')
        subjects.value = res.data
    }catch(err){
        console.log(err)
    }finally{
        loading.value = false
    }
})
</script>