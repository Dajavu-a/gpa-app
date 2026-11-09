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
<div class="q-mt-md">Selected rows: {{ JSON.stringify(selected) }}</div>
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
{ id: 1, name: 'Math', score: 80 },
{ id: 2, name: 'DE', score: 55 },
{ id: 3, name: 'Math2', score: 65 },
{ id: 4, name: 'AISE', score: 44 },
{ id: 5, name: 'Comp', score: 33 },
{ id: 6, name: 'Coding', score: 72 },
{ id: 7, name: 'Eng1', score: 63 },
{ id: 8, name: 'Eng2', score: 56 },
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