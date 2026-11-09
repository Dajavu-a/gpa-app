<template>
    <q-page psdding>
        <q-btn color="primary" icon="load" label="Load Album" @click="albumStore.loadAlbum()" />
        <!-- Loading Spinner -->
         <div v-if="albumStore.loading" class="q-mt-md"> 
      <q-spinner-dots color="primary" size="40px" /> 
    </div>
         <!-- error---->
        <q-banner v-if="albumStore.errMsg" class="q-mt-md" color="red-4" text-color="white">
            
            <template #avatar>
            <q-icon name="error" color="negative" />
        </template>
        {{ albumStore.errMsg }} 
        </q-banner>
        
        <!-- api-->
        <q-list v-else bordered separator class="q-mt-md">
            <q-item v-for="item in albumStore.album" :key="item.id">
                <q-item-section>
                    <q-item-label>{{ item.title }}</q-item-label>
                    <q-item-label caption>Album ID: {{ item.id }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>
<script setup>
import { useAlbumStore } from '@/stores/album-store'
const albumStore = useAlbumStore()  
</script>