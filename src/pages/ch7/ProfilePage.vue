<template>
    <q-page padding>
    <div class="text-h4 q-mb-lg"> My Profile</div>
    <div v-if="loading" class="row justify-center q-mt-xl">
        <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
    </div>
    <q-banner v-else-if="errorMessage" class="bg-red-1 text-negative q-mb-md" rounded>
            {{ errorMessage }}
    </q-banner>
    <q-card bordered v-else-if="profile">
            <q-card-section>
            <div>Name: {{ profile.name }}</div>
            <div>Role: {{ profile.role }}</div>
        </q-card-section>
    </q-card>
</q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getProfile } from '@/services/auth.service22'
const profile = ref(null)
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
    try {
        const res = await getProfile()
        profile.value = res.data.data
    } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Could not load your profile.'
    } finally {
        loading.value = false
    }
})
</script>