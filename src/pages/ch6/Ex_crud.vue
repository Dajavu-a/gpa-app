<!-- CRUD: create,read, update,delete -->
<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-5">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <div class="text-subtitle text-weight-medium">HTTP Methods</div>
          </q-card-section>
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-blue"> 1. GET: List All </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="blue"
                  label="Fetch All"
                  @click="handleFetchAll"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-green"> 2. Create: ID: 101 </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="green"
                  label="Create Post"
                  @click="handleCreate"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-pink"> 3. Update: </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="pink"
                  label="Update Post"
                  @click="handleUpdate"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-red"> 4. Delete: </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="red"
                  label="Delete Post"
                  @click="handleDelete(1)"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>
            
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-purple"> 5. Filter: </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="purple"
                  label="Filter Post"
                  @click="handleFilter(2)"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold text-cyan"> 6. Comment: </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="cyan"
                  label="Fetch Comment"
                  @click="handleComments(2)"
                  :loading="isLoading"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-12 col-md-7">
        <q-card flat bordered>
          <q-card-section class="bg-grey-9 text-white row justify-between items-center q-py-xs">
            <div class="text-subtitle2">
              <q-icon name="terminal"> </q-icon>
              Live Data
            </div>

            <div class="text-caption text-grey-4">Total:{{ postItems.length }} records</div>
          </q-card-section>
          <!-- //2 -->
          <q-card-actions v-if="isLoading" class="text-center q-pa-xl">
            <q-spinner-dots color="primary" size="3rem"></q-spinner-dots>
            <div class="q-mt-sm text-grey-6">Syncing data with server...</div>
          </q-card-actions>
          <!-- //3 -->
          <q-card-section v-else>
            <div v-if="comments.length > 0" class="q-mb-md">
              <q-banner dense class="bg-teal-1 text-teal-9 rounded-borders q-mb-sm">
                <q-icon name="comment" />
                Comment of Post ID: {{ comments[0].postId }}
                <template #action>
                  <q-btn
                    flat
                    color="teal"
                    icon="close"
                    label="Close"
                    @click="comments = []"
                  />
                </template>
              </q-banner>
              <q-list bordered separator class="bg-white rounded-borders">
                <q-item v-for="com in comments" :key="com.id">
                  <q-item-section>
                    <q-item-label class="text-weight-bold">
                      {{ com.name }} ({{ com.email }})
                    </q-item-label>
                    <q-item-label caption>{{ com.body }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            
            <div v-if="postItems.length == 0" class="text-center q-pa-xl text-grey-5">
              <q-icon name="layers_clear" size="4rem"></q-icon>
              <div class="text-h6 q-mt-sm">No Data</div>
            </div>

            <div v-else class="row q-col-gutter-sm">
              <div v-for="item in postItems.slice(0, 6)" :key="item.id" class="col-12 col-sm-6">
                <q-card flat bordered class="bg-white text-dark">
                  <q-card-section class="q-pa-sm">
                    <q-badge :color="item.id > 100 ? 'green' : 'blue'" class="q-md-xs"
                      >ID:{{ item.id }}</q-badge
                    >
                    <q-badge color="purple" class="q-ml-xs q-mb-xs">
                      User:{{ item.userId }}
                    </q-badge>
                    <div class="text-weight-bold text-subtitle2">{{ item.title }}</div>
                    <div class="text-caption text-grey-7 q-mt-xs">{{ item.body }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { usePostStore } from '@/stores/post-store'
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

const $q = useQuasar()
const store = usePostStore()
const { postItems, isLoading } = storeToRefs(store)
const comment = ref([])
const comments = ref([])

const handleFetchAll = async () => {
    comments.value = []
    comment.value = []
    await store.fetchAllPosts()
    $q.notify({
        type: 'positive',
        message: 'Data fetched success ',
        position: 'bottom-right'
    })
}
const handleCreate = async ()=>{
    const newPostData = {
        title: 'new post',
        body: 'body of new post',
        userId: 900,
    }
    await store.createNewPost(newPostData)
    $q.notify({
        type: 'positive',
        message: 'Data created success ',
        icon: 'cloud_done'
    })
}
const handleUpdate = async () => {
    const newUpdateData = {
        title: 'update post2',
        body: 'body of new post2',
        userId: 900,
    }
    await store.createNewPost(newUpdateData)
    $q.notify({
        type: 'positive',
        message: 'Data created success ',
        icon: 'sync'
    })
}

const handleDelete = async(id) => {
    await store.deletePost(id)
    $q.notify({
        type: 'negative',
        message: `Data deleted success `,
        icon: 'delete'
    })
}

const handleFilter = async(userId) =>{
    comments.value = []
    await store.filterPost(userId)
    $q.notify({
        color: 'purple',
        type: 'positive',
        message: `Filter ID: ${userId} success `,
        icon: 'filter_list'
    })
}
const handleComments = async(id) => {
    try {
      const commentList = await store.fetchComment(id)
      comments.value = commentList
      $q.notify({
        type: 'positive',
        message: `Fetch comments for post ID: ${id} success`,
        icon: 'comment'
      })
    } catch {
      $q.notify({
        type: 'negative',
        message: `Could not fetch comments for post ID: ${id}`,
        icon: 'error'
      })
    }
}
</script>