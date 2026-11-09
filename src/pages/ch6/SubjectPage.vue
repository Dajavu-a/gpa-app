<template>
    <q-page class="q-pa-md" padding>
        <q-card class="q-mt-md" v-for="item in store.subjects" :key="item.id">
            <q-card-section>
                <div class="text-h6">{{ item.code }}{{ item.name }}</div>
                <div class="text-subtitle2 "> Credit: {{ item.credit }}</div>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup>
import { useSubjectStore } from '@/stores/subject-store'
const store = useSubjectStore()
store.fechtAll()
</script>