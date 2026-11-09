<template>
    <q-page padding>
        <q-btn label="กลับไปเถอะ" color="primary" text-color="black" icon="verified" unelecated/>
    <q-btn outline label="NO OB"/><br>
    <q-separator spaced size="10px" color="black" />
    <q-btn round icon="share"/>
    <q-space />
    <q-btn rounded label="ตกลง"/>
    <q-separator spaced="15px"/>
    <q-btn-group>
        <q-btn push label="Yesterday"/>
        <q-btn push label="Today"/>
        <q-btn push label="Tomorrow"/>
    </q-btn-group>
    <q-separator spaced="15px"/>
    <q-btn :loading="isSaving" color="primary" :label="isSaving ? 'Saving...': 'Savad'" @click="save"/>
    <template v-slot:loading>
        <q-spinner-dots
            color="while"
            size="3rem"
            :thickness="5"
            class="on-left"
        />Saving....
    </template>
    </q-page>
</template>
<script setup>
import { ref } from 'vue' ;
const isSaving = ref(false)
const save = async() => {
    isSaving.value = true
    try {
        await new Promise ((resolve) => setTimeout(resolve,2000))
        console.log("Data Saved!")
    } catch (error) {
        console.log("Error:",error)
    } finally {
        isSaving.value = false
    }
}
</script>