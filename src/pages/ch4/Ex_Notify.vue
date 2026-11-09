<template>
    <div class="q-pa-md">
        <q-btn  label="save" @click="saveNote" />
    </div>
    </template>
<script setup>
import { useQuasar } from 'quasar';

import (useQuasar)
const $q = useQuasar()
const saveNote = () => {
    $q.notify({
        type: 'positive',
        message: 'SaveCompleted',
        position: 'top-right',
        timeout: 2000,
        icon: 'print'
    })
}
</script>