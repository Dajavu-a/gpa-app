<template>
    <q-page class="flex flex-center bg-grey-2 q-pa-md">
        <q-card class="q-pa-lg shadow-5" style="width: 100%; max-width: 400px; border-radius: 12px;">

            <div v-if="store.loading" class="q-mt-md">
                <q-spinner-dots
                    color="primary"
                    size="40px"
                ></q-spinner-dots>
            </div>
            <div v-else>

                <q-card-section class="text-center q-pb-none">
                <q-avatar size="64px" color="primary" text-color="white" icon="lock" class="q-mb-md" />
                <div class="text-h5 text-weight-bold text-grey-9">Welcome Back</div>
                <div class="text-caption text-grey-6 q-mt-xs">
                    Please sign in to continue</div>
            </q-card-section>
            <q-card-section class="q-pt-md">
                <q-input v-model="username" label="Username" outlined dense lazy-rules
                    :rules="[val => !!val || 'Please enter your username']">
                    <template v-slot:prepend>
                        <q-icon name="person" color="primary" />
                    </template>
                </q-input>
                <q-input v-model="password" type="password" label="Password" outlined dense lazy-rules
                    :rules="[val => !!val || 'Please enter your password']">
                    <template v-slot:prepend>
                        <q-icon name="lock" color="primary" />
                    </template>
                </q-input>
                <div class="q-mt-lg">
                    <q-btn type="submit" color="primary" label="Login" class="full-width text-weight-bold" size="lg"
                        unelevated @click="onLogin" 
                        :loading="store.loading" :disable="!username || !password" />
                </div>
            </q-card-section>
            <q-banner v-if="store.errmsg" class="bg-red-1 text-negative q-mb-md">
            {{ store.errmsg }}
               
            </q-banner>
            </div>
            <div></div>
            
            
            
        </q-card>
    </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

defineOptions({ name: 'LoginPage' })

const router = useRouter()
const $q = useQuasar()
const username = ref('')
const password = ref('')
const store = useAuthStore()
const errMessage = ref('')
const roleName = {
    student :"Student",
    teacher : "Teacher",
    admin : "Administrator"
}
const onLogin = async () => {
    try {
        await store.login(username.value, password.value)
        
        $q.notify({
            type : 'positive',
            icon : 'chexk_circle',
            message : `Welcome back, ${store.user.username}`,
            caption : `Role: ${roleName[store.user.role]}`


        })
        username.value = ''
        password.value = ''
        errMessage.value = ''

        // router.push('/profile')
        //ส่วนที่เพิ่มเพื้อแก้ไขโรuser
        const role = store.role
        switch(role){
            case 'student':
                router.push('/profile')
                break
            case 'teacher':
                router.push('/teacher')
                break
            case 'admin':
                router.push('/admin')
                break
            default:
                router.push('/profile')
        }
        // console.log(store.accessToken)
        // console.log(store.user)
    }
    
    catch (error) {
        console.error(error)
    }
}
</script>