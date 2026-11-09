<template>
    <q-page padding>
        <q-btn label="save me" color="primary" text-color="black" icon="pets" unelevated/><br>
        <br>
        <q-btn outline label="NO BG"/>
        <q-separator spaced size="16px" color="cyan" />
        <q-btn round icon="share" />
        <q-space />
        <q-btn rounded label="confirm"/>
        <q-separator spaced="16px"  />
        <q-btn-group push/>
            <q-btn push label="Tidus" />
            <q-btn push label="Primmie" />
            <q-btn push label="Cloud" />
        <q-separator spaced="16px"/>
        <q-btn :loading="isSaving" color="primary" 
        :label="isSaving ? 'Saving...': 'Saved'"
        @click="save"/>
        <template v-slot:loading>
            <q-spinner-dots
                color="white"
                size="3rem"
                :thickness="5"
                class="on-left"
            />Saving...
        </template>
    </q-page>
</template>
<script setup>
import { ref } from 'vue';
const isSaving = ref(false)
const save = async() => {
    isSaving.value = true
    try{
       await new Promise((resolve) => setTimeout(resolve,2000)) 
    } catch(error){
        console.log("Data Saved")
        console.log("Error: ",error)

    } finally{
        isSaving.value = false
    }
}
</script>