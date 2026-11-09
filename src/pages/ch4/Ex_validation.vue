<template>
    <div class="q-pa-md">
        <div class="myfont">My form</div>
        <q-form ref="myForm">
            <q-input v-model="name" type="text" label="U name" outlined 
            :rules="[val => !!val || 'Name required']"/>
            <q-input v-model="age" type="text" label="U age" outlined 
            :rules="[
                val => (val !== null && val !== '') || 'Age required',
                val => (val >=1 && val <= 120) || 'Age must be 1-120' 
            ]" hide-bottom-space/>
            <q-btn color="primary" @click="submitForm" label="ADD" class="q-pt-md"/>
        </q-form>
    </div>
</template>
<script setup>
import { ref ,nextTick} from 'vue';

const name = ref()
const age = ref(0)
const myForm = ref(null)
const submitForm = () => {
    if(myForm.value){
        myForm.value.validate().then(async(success)=>{
            if(success){
                console.log("Name: " + name.value) 
                console.log("Age: " + age.value)
                name.value = ''
                age.value = 1
                await nextTick();
                myForm.value.resetValidation()
            }else{
                console.log("Not validate")
            }
        })
        

    }  
    //     name.value = '' ,
    //     age.value = 0 
    
}
</script>