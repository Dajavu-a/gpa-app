<template>
    <div class="q-pa-md">
        <q-btn color="primary" label="Delete" @click="confirmDialog = true" />
    </div>
    <q-dialog v-model="confirmDialog" persistent>
        <q-card style="min-width: 300px;">
            <q-card-section class="roe item-center">
                <q-icon name="warning" color="red" size="250px" class="q-mr-md"></q-icon>
                <div>
                    <div class="text-h6"> ConFirm</div>
                    <div class="text-body2">Are U sure to deletes</div>
                </div>
            </q-card-section>
            <q-card-section>
                <q-btn color="grey" label="Cancle" v-close-popup/>
                <q-btn color="red"  label="Confirm Delete" @click="deleteAction"/>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { ref } from 'vue';

const confirmDialog = ref(false)
const deleteAction = () => {
    console.log("Delete success")
    confirmDialog.value = false
}
</script>