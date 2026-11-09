<template>
    <q-page class="q-pa-md">
       <q-list bordered separator class="rounded-borders"
       style="max-width: 600px; margin: 0 auto;">
       <q-item-label header class="text-h6">My Todo List </q-item-label>
       <q-item v-for="item in todoList" :key="item.id" clickable v-ripple
       :class="item.done ? 'bg-green-1' : 'bg-white'" @click="toggleTodo(item.id)">
        <q-item-section avatar>
            <q-icon :name="item.done ? 'check_circle' : 'radio_button_unchecked'"
            :color="item.done ? 'positive' : 'grey'" size="28px"/>
        </q-item-section>
            <q-item-section>
                <q-item-label :class="item.done ? 'text-strike text-grey-6' : 'text-dark'">
                 {{ item.title }}</q-item-label>
                <q-item-label caption lines="1">
                    Due date: {{ item.dueDate }} | {{ item.category }}
                </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-badge :color="getPriorityColor(item.priority)" 
                    :label="item.priority" />
                </q-item-section>
            </q-item>
            <q-item v-if="todoList.length === 0">
                <q-item-section class="text-center text-grey">No List</q-item-section>
            </q-item>
    </q-list>
    </q-page>
</template>
<script setup>

import { ref } from 'vue';
const todoList = ref([
    {id:1, title: 'Frontend Class', done: false,
        dueDate: '2026-09-07', category: 'Education', priority: 'High'},
    {id:2, title: 'Gaming', done: true,
        dueDate: '2026-08-20', category: 'Freetime', priority: 'low'},
    {id:3, title: 'Exercise', done: false,
        dueDate: '2026-09-07', category: 'Health', priority: 'Medium'},        
])
const getPriorityColor = (priority) => {
  const colors = {
      High: 'negative',
      Medium: 'warning',
      low: 'positive'
}
  return colors[priority] || 'grey'
}
const toggleTodo = (id) => {
const index = todoList.value.findIndex(todo => todo.id === id)
      if (index !== -1) {
      todoList.value[index].done = !todoList.value[index].done
}
}
</script>
<style scoped>
     .text-strike{
        text-decoration: line-through;
     }
</style>