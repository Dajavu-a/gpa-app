<template>
    <q-page padding>
        <div class="text-h4">Environment Variables</div>
        <p>App Title: {{ appTitle }}</p>
        <p>API URL: {{ apiUrl }}</p>
        <p>Mode: {{ mode }}</p>
    </q-page>
</template>
<script setup>
const appTitle = import.meta.env.QCLI_APP_TITLE
const apiUrl = import.meta.env.QCLI_API_URL
const mode =import.meta.env.MODE
</script>