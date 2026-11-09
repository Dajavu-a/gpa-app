<template>
   <q-page class="q-pa-md">
   <q-table title="My Records" :rows="rows" :columns="columns" row-key="id"
   :filter="filterText" :pagination="pagination" :loading="isLoading"
   selection="multiple" v-model:selected="selected" flat bordered>
   <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filterText" placeholder="Search">
    <template v-slot:append><q-icon name="search" /></template>
      </q-input>
    </template>
<template v-slot:body-cell-subjectScore="props">
        <q-td :props="props">
        <q-chip :color="props.row.score > 50 ? 'green' : 'red'" text-color="white">
        {{ props.row.score }}
     </q-chip>
     </q-td>
    </template>
    </q-table>
    <div class="q-mt-md">Selected value: {{ JSON.stringify(selected) }}</div>
</q-page>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const filterText = ref('')
const isLoading = ref(true)
const selected = ref([])
const columns = [
   { name: 'subjectName', label: 'Name', field: 'name', align: 'left', sortable: true },
   { name: 'subjectScore', label: 'Score', field: 'score', align: 'center' }
]
const rows = [
   { id: 1, name: 'Graphic', score: 80 },
   { id: 2, name: 'English', score: 75 },
   { id: 3, name: 'Front-end', score: 55 },
   { id: 4, name: 'Quick keyboard', score: 64 },
   { id: 5, name: 'Computer', score: 71 },
   { id: 6, name: 'Math', score: 45 },
   { id: 7, name: 'E-sport', score: 87 },
   { id: 8, name: 'Story Telling', score: 90 },
   { id: 9, name: 'Web Dev', score: 87 }
]
const pagination = ref({
   sortBy: 'desc',
   descending: false,
   page: 1,
   rowsPerPage: 10
})
onMounted(() => {
    setTimeout(() => { isLoading.value = false }, 3000)
})
</script>