<template>
    <div class="q-pa-md">
        <q-btn label="Load" @click="loadData" />
    </div>
</template>
<script setup>
import { useQuasar ,} from 'quasar';
const $q = useQuasar()
const loadData = ()=> {
    $q.loading.show()
    // $q.loading.show({
    //     spinner: null,
    //     message: `<div class='text-center'>
    //         <img src='https://media.tenor.com/d-HSksPE2dMAAAAi/cat-dance-happy-dance-cat.gif' 
    //         style='width: 150px; height:150; border-radius: 8px'>
    //         <div class='q-mt-md text-h6'>แมวดหลดให้อยู่นะ.....</div>
    //         </div>`,
    //     html: true,
    //     backgroundColor: 'dark',
    //     messageColor: 'white'
    // })
    // $q.loading.show({
    //     message: 'Loading nong Plueam...',
    //     spinner: QSpinnerFacebook,
    //     spinnerColor: 'pink',
    //     spinnerSize: 200,
    //     backgroundColor: 'red-5',
    //     messageColor: 'dark'
    // })
    setTimeout(() => {
        $q.loading.hide()
        $q.notify({ 
            type: 'positive',
            message: ' Load Data success'
        })
    }, 5000);
}
</script>